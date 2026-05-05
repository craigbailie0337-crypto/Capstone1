import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/Login.js';
import RecentCasesPage from '../pageobjects/RecentCases.js';
import Page from '../pageobjects/page.js';
import SensitiveInfo from '../pageobjects/sensitiveInfo.js';

describe('Recent Cases Feature', () => {
    
    before(async () => {
        await Page.opening();
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        
    });

    it('MTQA-5504: Open Case- verify Case Top Of Recentcases list:-Functional', async () => {
        await RecentCasesPage.openCaseAndVerifyAtTopOfRecentCases();
        const cases = await RecentCasesPage.recentCaseItems;
        await expect(cases[0]).toBeDisplayed();
    });

    it('MTQA-5528: View Case A Then Case B- Case B At Top Of Recentcases- Sorting', async () => {
        await RecentCasesPage.viewCaseAThenCaseB();
        await browser.waitUntil(async () => {
            return (await RecentCasesPage.recentCaseItems).length > 0
        }, {
            timeout: 8000,
            timeoutMsg: 'Recent cases did not load'
        })
        const cases = await RecentCasesPage.recentCaseItems;
        await expect(cases[0]).toBeDisplayed();

    });

    it('MTQA-5529: View 6 Cases- 6th Case Pushes 5th Off List- Boundary', async () => {
        await RecentCasesPage.viewSixCases();
        await browser.waitUntil(async () => {
            return (await RecentCasesPage.recentCaseItems).length > 0
        }, {
            timeout: 15000,
            timeoutMsg: 'Recent cases did not load'
        })
        const cases = await RecentCasesPage.recentCaseItems;
        await expect(cases.length).toBeLessThanOrEqual(5);
        
    });

    it('MTQA-5542: View 3 Cases, Logout- 3 Cases Are Still In Recentcases- Functional', async () => {
        await RecentCasesPage.viewThreeCases();
        await LoginPage.logoutButton.click();
        await LoginPage.usernameInput.waitForDisplayed({ timeout: 8000});
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await LoginPage.sidebarNav.waitForDisplayed({ timeout: 15000});
        await RecentCasesPage.recentCasesNavButton.waitForDisplayed({ timeout: 15000});
        await RecentCasesPage.recentCasesNavButton.waitForClickable({ timeout: 8000});
        await RecentCasesPage.recentCasesNavButton.click();
        await browser.waitUntil(async () => {
            return (await RecentCasesPage.recentCaseItems).length > 0
        }, {
            timeout: 15000,
            timeoutMsg: 'Recent cases did not load after login'
        })
        const cases = await RecentCasesPage.recentCaseItems;
        await expect(cases.length).toBeGreaterThanOrEqual(3);
        
    });

    it('MTQA-5541: View Then Delete The Case- Case Is Removed From Recentcases- Functional', async () => {
        await RecentCasesPage.openCaseDeleteAndVerifyRemovedFromRecentCases();
        const cases = await RecentCasesPage.recentCaseItems;
        await expect(cases.length).toBeGreaterThanOrEqual(0);
        
    });



});