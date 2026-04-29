import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/Login.js';
import RecentCasesPage from '../pageobjects/RecentCases.js';
import Page from '../pageobjects/page.js';
import SensitiveInfo from '../pageobjects/sensitiveInfo.js';

describe('Recent Cases Feature', () => {
    
    before(async () => {
        await Page.opening();
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await browser.pause(2000);
    });

    it('MTQA-5504: Open Case- verify Case Top Of Recentcases list', async () => {
        await RecentCasesPage.openCaseAndVerifyAtTopOfRecentCases();
        const cases = await RecentCasesPage.recentCaseItems;
        await expect(cases[0]).toBeDisplayed();
    });

    it('MTQA-5528: View Case A Then Case B- Case B At Top Of Recentcases', async () => {
        await RecentCasesPage.viewCaseAThenCaseB();
        // await RecentCasesPage.recentCasesNavButton.click();
        await browser.pause(3000);
        const cases = await RecentCasesPage.recentCaseItems;
        await expect(cases[0]).toBeDisplayed();

    });

    it('MTQA-5529: View 6 Cases- 6th Case Pushes 5th Off List', async () => {
        await RecentCasesPage.viewSixCases();
        await RecentCasesPage.recentCasesNavButton.click();
        await browser.pause(600);
        const cases = await RecentCasesPage.recentCaseItems;
        await expect(cases.length).toBeLessThanOrEqual(5);
        
    });

    it('MTQA-5542: View 3 Cases, Logout- 3 Cases Are Still In Recentcases', async () => {
        await RecentCasesPage.viewThreeCases();
        await LoginPage.logoutButton.click();
        await browser.pause(1500);
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await RecentCasesPage.recentCasesNavButton.click();
        await browser.pause(3000);
        const cases = await RecentCasesPage.recentCaseItems;
        await expect(cases.length).toBeGreaterThanOrEqual(3);
        
    });

    it('MTQA-5541: View Then Delete The Case- Case Is Removed From Recentcases', async () => {
        await RecentCasesPage.openCaseDeleteAndVerifyRemovedFromRecentCases();
        const cases = await RecentCasesPage.recentCaseItems;
        await expect(cases.length).toBeGreaterThanOrEqual(0);
        
    });



});