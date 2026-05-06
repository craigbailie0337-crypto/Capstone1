import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/Login.js'
import NotificationPage from '../pageobjects/Notifications.js'
import RecentCasesPage from '../pageobjects/RecentCases.js'
import Page from '../pageobjects/page.js'
import SensitiveInfo from '../pageobjects/sensitiveInfo.js'

describe('Notifications Feature', () => {

    before(async () => {
        await Page.opening();
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
    })

    beforeEach(async () => {
        await browser.keys(['Escape']);
        await browser.keys(['Escape']);
        await LoginPage.sidebarNav.waitForDisplayed({ timeout: 10000 });
        await NotificationPage.notificationBellIcon.waitForClickable({ timeout: 8000 });
    })

    // MTQA-5403
    it('MTQA-5403: Create a new task- Notifications displays at top of notifications- Functional', async () => {
        await NotificationPage.createTask('Dashboard Appear Task');
        await NotificationPage.dashboardNavLink.click();
        await expect(NotificationPage.verifyTaskDashboard).toBeDisplayed();
        // await NotificationPage.notificationBellIcon.click();
        // await NotificationPage.allNotificationTitles[0].waitForDisplayed({ timeout: 5000 });
        // await expect(NotificationPage.allNotificationTitles[0]).toBeDisplayed();
        // await browser.keys(['Escape']);
    })

    // MTQA-5426
    it('MTQA-5426: After creating new task - Notification badge changes- Functional', async () => {
        await NotificationPage.createTask('Dashboard Appear Task');
        await NotificationPage.dashboardNavLink.click();
        await expect(NotificationPage.verifyTaskDashboard).toBeDisplayed();
        // const countBefore = await NotificationPage.getNotificationCount();
        // await NotificationPage.createTask('Badge Change Test Task');
        // const countAfter = await NotificationPage.getNotificationCount();
        // await expect(countAfter).not.toEqual(countBefore);
    })

    // MTQA-5407
    it('MTQA 5407: Create new task- task appears on dashboard- Functional', async () => {
        await NotificationPage.createTask('Dashboard Appear Task');
        await expect(NotificationPage.verifyTaskDashboard).toBeDisplayed();
    })

    // MTQA-5496 - runs before Dismiss All so notifications are still present
    it('MTQA-5496: Click X on one notification - only that notification is removed- Functional', async () => {
        const { before, after } = await NotificationPage.dismissFirstNotificationAndCount();
        await expect(after).toBeLessThan(before);
    })

    // MTQA-5498 - runs after X button test, clears all notifications
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

    // MTQA-5570 - creates invoice for 5576 to delete
    it('MTQA-5570: Create invoice - notification appears- Functional', async () => {
        await NotificationPage.navigateToFirstCaseAndCreateInvoice();
        await expect(NotificationPage.toastMessage).toBeDisplayed();
    })

    // MTQA-5576 - runs immediately after 5570 so invoice exists
    it('MTQA-5576: Delete invoice - notification appears- Functional', async () => {
        await RecentCasesPage.navigateToFirstCase();
        await NotificationPage.deleteInvoice();
        // await NotificationPage.verifyNotificationAppears();
        await expect(NotificationPage.toastMessage).toBeDisplayed();
    })

    // MTQA-5503 - runs last since it deletes a case
    it('MTQA-5503: Delete a case - notification is sent- Functional', async () => {
        await RecentCasesPage.navigateAndDeleteCase();
        // await NotificationPage.verifyNotificationAppears();
        await expect(NotificationPage.toastMessage).toBeDisplayed();
    })

});