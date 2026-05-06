import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/Login.js'
import Base from '../pageobjects/BasePage.js';
import SensitiveInfo from '../pageobjects/sensitiveInfo.js';
import Login from '../pageobjects/Login.js';


describe('Login Feature', () => {

    beforeEach(async () => {
        await Base.openUp();
        const isLoggedIn = await LoginPage.logoutButton.isDisplayed().catch(() => false);
        if (isLoggedIn) {
            await LoginPage.logoutButton.click();
            await LoginPage.usernameInput.waitForDisplayed({ timeout: 10000});
            await Base.openUp();
        }
        await LoginPage.usernameInput.waitForDisplayed({ timeout: 10000});
        await browser.keys(['Escape']);
    })

    it('MTQA-5307: Login with valid credentials-Positive', async () => {
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await LoginPage.sidebarNav.waitForDisplayed({ timeout: 10000});
        await expect(browser).not.toHaveUrl(/login/);
        
    })

    it('MTQA-5310: Login with empty username and password fields-Negative', async () => {
        await Base.openUp();
        await LoginPage.loginButton.waitForDisplayed({ timeout: 5000});
        await LoginPage.login('', '');
        await LoginPage.loginButton.waitForDisplayed({ timeout: 5000});
        await expect(browser).toHaveUrl('https://app.thecasework.com/');
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

    const negativeLoginScenarios = [
        {id: 'MTQA-5308', desc: 'invalid password', user: SensitiveInfo.username, pass: 'WrongPassword999!' },
        {id: 'MTQA-5309', desc: 'non-existing username', user: 'fake.user999@notreal.com', pass: SensitiveInfo.password },
        {id: 'MTQA-5311', desc: 'SQl injection in both fields', user: "' OR '1'='1", pass: "' OR '1'='1" },
        {id: 'MTQA-5501', desc: '6 times with invalid password', user: SensitiveInfo.username, pass: 'WrongPassword999!', bruteForce: true },
        {id: 'MTQA-5552', desc: 'valid username and extremely long password', user: SensitiveInfo.username, pass: 'A'.repeat(500) + '1!' }
    ];

    negativeLoginScenarios.forEach(({ id, desc, user, pass, bruteForce }) => {
        it(`${id}: Login with ${desc}-Negative/Security`, async () => {
            if (bruteForce) {
                await LoginPage.loginSixTimes(user, pass);
            } else {
                await LoginPage.login(user, pass);
            }
            await LoginPage.errorMessage.waitForDisplayed({ timeout: 8000});
            await expect(LoginPage.errorMessage).toBeDisplayed();
        });
    });

    



});

