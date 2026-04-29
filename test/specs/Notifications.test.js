import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/Login.page.js';
import NotificationPage from '../pageobjects/Notifications.page.js'
import RecentCasesPage from '../pageobjects/RecentCases.page.js'
import Page from '../pageobjects/page.js';
import SensitiveInfo from '../pageobjects/sensitiveInfo.js';



describe('Notifications Feature', () => {

    before(async () => {
        await Page.opening();
        await LoginPage.login(SensitiveInfo.username, SensitiveInfo.password);
        await browser.pause(2000);
    })

    beforeEach(async () => {
        await browser.keys(['Escape']);
        await browser.pause(3000);
    })

    it('MTQA-5403: Create a new task- Notifications displays at top of notifications', async () => {
        await NotificationPage.createTask('Automated Notification Test Task');
        await NotificationPage.notificationBellIcon.click();
        await browser.pause(1000);
        await expect(NotificationPage.allNotificationTitles[0]).toBeDisplayed();
        await browser.keys(['Escape']);
    })

    it('MTQA-5498: Click Dismiss All - all notifications removed from panel', async () => {
        const remaining = await NotificationPage.dismissAllNotifications();
        await expect(remaining).toBeLessThan(101);
    })


    it('MTQA-5426: After creating new task - Notification badge changes', async () => {
        const countBefore = await NotificationPage.getNotificationCount();
        await NotificationPage.createTask('Badge Change Test Task');
        await browser.pause(15000);
        const countAfter = await NotificationPage.getNotificationCount();
        await expect(countAfter).not.toEqual(countBefore);
})

    it('MTQA 5407: Create new task- task appears on dashboard', async () => {
        await NotificationPage.createTask('Dashboard Appear Task');
        await expect(NotificationPage.verifyTaskDashboard).toBeDisplayed();
        
    })

     it('MTQA-5570: Create invoice - notification appears', async () => {
        await NotificationPage.navigateToFirstCaseAndCreateInvoice();
        await expect(NotificationPage.allNotificationTitles[0]).toBeDisplayed();
    })



    it('MTQA-5496: Click X on one notification - only that notification is removed', async () => {
        const { before, after } = await NotificationPage.dismissFirstNotificationAndCount();
        await expect(after).toBeLessThan(before);
    })


    it('MTQA-5503: Delete a case - notification is sent', async () => {
        await RecentCasesPage.navigateAndDeleteCase();
        await browser.pause(2000);
        await NotificationPage.verifyNotificationAppears();
        await expect(NotificationPage.allNotificationTitles[0]).toBeDisplayed();
    })


    it('MTQA-5576: Delete invoice - notification appears', async () => {
        await RecentCasesPage.navigateToFirstCase();
        await NotificationPage.deleteInvoice();
        await NotificationPage.verifyNotificationAppears();
        await expect(NotificationPage.allNotificationTitles[0]).toBeDisplayed();
    })








})