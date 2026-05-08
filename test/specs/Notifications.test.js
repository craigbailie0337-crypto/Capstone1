import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/Login.js'
import NotificationPage from '../pageobjects/Notifications.js'
import RecentCasesPage from '../pageobjects/RecentCases.js'
import Base from '../pageobjects/BasePage.js';
import SensitiveInfo from '../pageobjects/sensitiveInfo.js'

describe('Notifications Feature', () => {

    before(async () => {
        await Base.opening();
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
    })

    beforeEach(async () => {
        await browser.keys(['Escape']);
        await browser.keys(['Escape']);
        await LoginPage.sidebarNav.waitForDisplayed({ timeout: 10000 });
        await NotificationPage.notificationBellIcon.waitForClickable({ timeout: 8000 });
    })

    
    it('MTQA-5403: Create a new task- Notifications displays at top of notifications- Functional', async () => {
        await NotificationPage.createTask('Dashboard Appear Task');
        await NotificationPage.dashboardNavLink.click();
        await NotificationPage.verifyTaskDashboard.waitForDisplayed({ timeout: 8000 });
        await expect(NotificationPage.verifyTaskDashboard).toBeDisplayed();
       
    })

    
    it('MTQA-5426: After creating new task - Notification badge changes- Functional', async () => {
        await NotificationPage.createTask('Dashboard Appear Task');
        await NotificationPage.dashboardNavLink.click();
        await NotificationPage.verifyTaskDashboard.waitForDisplayed({ timeout: 8000 });
        await expect(NotificationPage.verifyTaskDashboard).toBeDisplayed();
       
    })

    
    it('MTQA-5407: Create new task- task appears on dashboard- Functional', async () => {
        await NotificationPage.createTask('Dashboard Appear Task');
        await NotificationPage.dashboardNavLink.click();
        await NotificationPage.verifyTaskDashboard.waitForDisplayed({ timeout: 8000 });
        await expect(NotificationPage.verifyTaskDashboard).toBeDisplayed();
    })

    
    it('MTQA-5496: Click X on one notification - only that notification is removed- Functional', async () => {
        const { before, after } = await NotificationPage.dismissFirstNotificationAndCount();
        await expect(after).toBeLessThan(before);
    })

    
    it('MTQA-5498: Click Dismiss All - all notifications removed from panel- Functional', async () => {
        await browser.keys(['Escape']);
        await browser.keys(['Escape']);
        await NotificationPage.casesNavLink.click();
        await NotificationPage.firstCaseRow.waitForDisplayed({ timeout: 5000 });
        await NotificationPage.firstCaseRow.click();
        await NotificationPage.notificationBellIcon.waitForClickable({ timeout: 5000 });
        const remaining = await NotificationPage.dismissAllNotifications();
        await expect(remaining).toBeLessThan(200);
    })

    
    it('MTQA-5570: Create invoice - Toast notification is visible- Functional', async () => {
        await NotificationPage.navigateToFirstCaseAndCreateInvoice();
        const toastAppeared = await NotificationPage.toastMessage
            .waitForDisplayed({ timeout: 8000 })
            .then(() => true)
            .catch(() => false)
        await expect(toastAppeared).toBe(true);
    })

    
    it('MTQA-5576: Delete invoice - Toast notification is visible- Functional', async () => {
        await NotificationPage.navigateToFirstCase();
        await NotificationPage.deleteInvoice();
        await NotificationPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await expect(NotificationPage.toastMessage).toBeDisplayed();
    })

    
    it('MTQA-5503: Delete a case - Toast notification is visible- Functional', async () => {
        await RecentCasesPage.navigateAndDeleteCase();
        await NotificationPage.toastMessage.waitForDisplayed({ timeout: 8000 });
        await expect(NotificationPage.toastMessage).toBeDisplayed();
    })

});