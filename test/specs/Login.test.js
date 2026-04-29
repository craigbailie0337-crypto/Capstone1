import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/Login.js'
import Page from '../pageobjects/page.js';
import SensitiveInfo from '../pageobjects/sensitiveInfo.js';
import Login from '../pageobjects/Login.js';


describe('Login Feature', () => {

    beforeEach(async () => {
        await Page.openUp();
        const isLoggedIn = await LoginPage.logoutButton.isDisplayed().catch(() => false);
        if (isLoggedIn) {
            await LoginPage.logoutButton.click();
            await LoginPage.usernameInput.waitForDisplayed({ timeout: 8000});
            await Page.openUp();
        }
        await LoginPage.usernameInput.waitForDisplayed({ timeout: 8000});
        await browser.keys(['Escape']);
    })

    it('MTQA-5307: Login with valid credentials-Positive', async () => {
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await LoginPage.sidebarNav.waitForDisplayed({ timeout: 5000});
        await expect(browser).not.toHaveUrl(/login/);
        
    })

    it('MTQA-5308: Login with invalid password-Negative', async () => {
        await LoginPage.login(SensitiveInfo.username, 'WrongPassword999!');
        await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000});
        await expect(LoginPage.errorMessage).toBeDisplayed();
        
    })

    it('MTQA-5309: Login with non-existing username-Negative', async () => {
        await LoginPage.login('fake.user999@notreal.com', SensitiveInfo.password);
        await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000});
        await expect(LoginPage.errorMessage).toBeDisplayed();
    })

    it('MTQA-5310: Login with empty username and password fields-Negative', async () => {
        await Page.openUp();
        await LoginPage.loginButton.waitForDisplayed({ timeout: 5000});
        await LoginPage.login('', '');
        await LoginPage.loginButton.waitForDisplayed({ timeout: 5000});
        await expect(browser).toHaveUrl('https://app.thecasework.com/');
    })

    it('MTQA-5311: Login with SQl injection in both fields-Security', async () => {
        await LoginPage.login("' OR '1'='1", "' OR '1'='1");
        await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000});
        await expect(LoginPage.errorMessage).toBeDisplayed();
    })

    it('MTQA-5501: Login 6 times with invalid password-Negative', async () => {
        await LoginPage.loginSixTimes(SensitiveInfo.username, 'WrongPassword999!');
        await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000});
        await expect(LoginPage.errorMessage).toBeDisplayed();
        
            
    })

    it('MTQA-5551: Login and refresh the page- user remains logged in-Functional/Reliability', async () => {
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await LoginPage.sidebarNav.waitForDisplayed({ timeout: 5000});
        await browser.refresh();
        await LoginPage.sidebarNav.waitForDisplayed({ timeout: 8000});
        await expect(browser).not.toHaveUrl(/login/);
    })

    it('MTQA-5361: Logout works correctly-Positive', async () => {
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await LoginPage.sidebarNav.waitForDisplayed({ timeout: 5000});
        await LoginPage.logoutButton.waitForClickable({ timeout: 5000});
        await LoginPage.logoutButton.click();
        await LoginPage.usernameInput.waitForDisplayed({ timeout: 8000});
        await expect(LoginPage.usernameInput).toBeDisplayed();
    })

    it('MTQA-5552: Login with valid username and extremely long password-Boundary/Negative', async () => {
        await LoginPage.login(SensitiveInfo.username, 'A'.repeat(500) + '1!');
        await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000});
        await expect(LoginPage.errorMessage).toBeDisplayed();
    })

    



});

