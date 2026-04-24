import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/Login.page.js';
import NotificationPage from '../pageobjects/Notifications.page.js'
import RecentCasesPage from '../pageobjects/RecentCases.page.js'
import Page from '../pageobjects/page.js';




describe('Notifications Feature', () => {

    before(async () => {
        await Page.opening();
        await LoginPage.login('Craig.Bailie0337@stu.mtec.edu', 'Cra!g9822');
        await browser.pause(2000);
    })

    it('MTQA-5403: Create a new task- Notifications displays at top of notifications', async () => {
        await NotificationPage.navigateToCaseAndCreateTask('Automated Notification Test Task');
        await NotificationPage.notificationBellIcon.click();
        await browser.pause(1000);
        await expect(NotificationPage.allNotificationTitles).toBeDisplayed();
        await browser.keys(['Escape']);
    })

    it('MTQA-5426: After creating new task - Notification badge changes', async () => {
        await NotificationPage.navigateToCaseAndCreateTask('Automated Notification Test Task');
        const countBefore = await NotificationPage.getNotificationCount();
        await NotificationPage.createTask('Badge Change Test Task');
        const countAfter = await NotificationPage.getNotificaitonCount();
        await expect(countAfter).not.toEqaul(countBefore);
    })

    it('MTQA 5407: Create new task- task appears on dashboard', async () => {
        await NotificationPage.navigateToCaseAndCreateTask('Automated Notification Test Task');
        await RecentCasesPage.casesNavLink.click();
        await browser.pause(1000);
        await expect(NotificationPage.verifyTaskDashboard).toBeDisplayed();
    })

    it('MTQA-5496: Click X on one notification - only that notification is removed', async () => {
        const { before, after } = await NotificationPage.dismissFirstNotificationAndCount();
        await expect(after).toEqual(before - 1);
    })

     it('MTQA-5498: Click Dismiss All - all notifications removed from panel', async () => {
        const remaining = await NotificationPage.dismissAllNotifications();
        await expect(remaining).toEqual(0);
    })

    it('MTQA-5503: Delete a case - notification is sent', async () => {
        await RecentCasesPage.navigateAndDeleteCase();
        await browser.pause(2000);
        await NotificationPage.verifyNotificationAppears();
        await expect(NotificationPage.allNotificationTitles).toBeDisplayed();
    })

    it('MTQA-5570: Create invoice - notification appears', async () => {
        await NotificationPage.navigateToFirstCaseAndCreateInvoice();
        await expect(NotificationPage.allNotificationTitles).toBeDisplayed();
    })

    it('MTQA-5576: Delete invoice - notification appears', async () => {
        await RecentCasesPage.navigateToFirstCase();
        // await RecentCasesPage.casesNavLink.click();
        // await browser.pause(1000);
        // const cases = await RecentCasesPage.recentCaseItems;
        // await cases[0].click();
        // await browser.pause(1000);
        await NotificationPage.deletInvoice();
        await NotificationPage.verifyNotificationAppears();
        await expect(NotificationPage.allNotificationTitles).toBeDisplayed();
    })








})