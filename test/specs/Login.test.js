import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/Login.page.js'
import Page from '../pageobjects/page.js';
import SensitiveInfo from '../pageobjects/sensitiveInfo.js';


describe('Login Feature', () => {

    beforeEach(async () => {
        await Page.openUp();
        await browser.pause(5000);
        const isLoggedIn = await LoginPage.logoutButton.isDisplayed().catch(() => false);
        if (isLoggedIn) {
            await LoginPage.logoutButton.click();
            await browser.pause(2000);
        }
    })

    it('TC-Login-01: Login with valid credentials-Positive', async () => {
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await browser.pause(2000);
        await expect(browser).not.toHaveUrl(/login/);
        
    })

    it('TC-Login-02: Login with invalid password-Negative', async () => {
        await LoginPage.login(SensitiveInfo.username, 'WrongPassword999!');
        await browser.pause(2000);
        await expect(LoginPage.errorMessage).toBeDisplayed();
        
    })

    it('TC-Login-03: Login with non-existing username-Negative', async () => {
        await LoginPage.login('fake.user999@notreal.com', SensitiveInfo.password);
        await browser.pause(2000);
        await expect(LoginPage.errorMessage).toBeDisplayed();
    })

    it('TC-Login-04: Login with empty username and password fields-Negative', async () => {
        await Page.openUp();
        await browser.pause(1000);
        await LoginPage.login('', '');
        await browser.pause(1000);
        await expect(browser).toHaveUrl('https://app.thecasework.com/');
    })

    it('TC-Login-05: Login with SQl injection in both fields-Security', async () => {
        await LoginPage.login("' OR '1'='1", "' OR '1'='1");
        await browser.pause(2000);
        await expect(LoginPage.errorMessage).toBeDisplayed();
    })

    it('TC-Login-06: Login 6 times with invalid password-Negative', async () => {
        await LoginPage.loginSixTimes(SensitiveInfo.username, 'WrongPassword999!');
             await browser.pause(800);
            await expect(LoginPage.errorMessage).toBeDisplayed();
        
            
    })

    it('TC-Login-O7: Login and refresh the page- user remains logged in-Functional/Reliability', async () => {
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await browser.refresh();
        await browser.pause(1500);
        await expect(browser).not.toHaveUrl(/login/);
    })

    it('TC-Login-08: Logout works correctly-Positive', async () => {
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await browser.pause(2000);
        await LoginPage.logoutButton.click();
        await browser.pause(1000);
        await expect(LoginPage.usernameInput).toBeDisplayed();
    })

    it('TC-Login-09: Login with valid username and extremely long password-Boundary/Negative', async () => {
        await LoginPage.login(SensitiveInfo.username, 'A'.repeat(500) + '1!');
        await browser.pause(800);
        await expect(LoginPage.errorMessage).toBeDisplayed();
    })

    



});

