import { $, $$, browser } from '@wdio/globals';
import { Page } from './page.js';


class NotificationPage extends Page {
    open () {
         return super.open
    }  

    get firstCaseRow() {
        return $('button[class*="fui-Link"]');
}

     get addTaskButton() {
        return $('button[data-testid="link-button-Add Task"]');
     }

     get taskTextarea() {
        return $('[data-testid="task-dialog-textarea"]');
     }

     get saveTaskButton() {
        return $('[data-testid="task-dialog-save-button"]');
     }
    
     get notificationBellIcon() {
        return $('[data-testid="menu-notifications-button"]');
     }

     get dismissAllButton() {
        return $('[data-testid="link-button-Dismiss all"]');
     }

     get firstNotificationXButton() { //Clicking on the X of the first notification//
        return $('button[data-testid*="notification-dismiss-button"]');
     }

     get allNotificationTitles() {
        return $$('//span[contains(text(),"Invoice")]');
     }

     get invoicesTab() {
        return $('[data-testid="view-edit-case-tab-invoices"]');
     }

     get createInvoiceTab() {
        return $('[data-testid="case-invoices-create-invoice-tab"]');
     }

     get invoiceListTab() {
        return $('[data-testid="case-invoices-invoice-list-tab"]');
     }

     get billingPeriodDropdown() {
        return $('[data-testid="create-invoice-billing-period-dropdown"]');
     }

     get firstBillingPeriodOption() {
        return $('[data-testid="create-invoice-billing-period-option-Wed Oct 01 2025"]');
     }

     get createInvoiceSubmitButton() {
        return $('[data-testid="create-invoice-submit-button"]');
     }

     get invoiceRowMoreIcon() {
        return $('(//input[@type="checkbox"])[2]');
     }

     get deleteInvoiceMenuItem() {
        return $('[data-testid="custom-data-table-context-menu-item-Delete"]');
     }

     get markPaidMenuItem() {
        return $('[data-testid="custom-data-table-context-menu-item-Mark Paid"]')
     }

     get verifyTaskDashboard() {
         return $('//span[contains(text(),"Dashboard Appear Task")]');
     }



     async createTask(taskText) {
      // await this.addTaskButton.waitForClickable();
      // await this.addTaskButton.click();
      // await this.taskTextarea.waitForDisplayed();
      // await this.taskTextarea.setValue(taskText);
      // await this.saveTaskButton.waitForClickable();
      // await this.saveTaskButton.click();
      // await this.notificationBellIcon.waitForDisplayed();
      await this.addTaskButton.click();
      await browser.pause(1000);
      await this.taskTextarea.setValue(taskText);
      await browser.pause(1000);
      await this.saveTaskButton.click();
      await browser.pause(2000);
      await browser.keys(['Escape']);
      await browser.pause(1000);
     }

     async getNotificationCount() {
      await this.notificationBellIcon.click();
      await browser.pause(1000);
      const count = (await this.allNotificationTitles).length
      await browser.keys(['Escape']);
      await browser.pause(300);
      return count
     }

     async dismissFirstNotificationAndCount() {
      await this.notificationBellIcon.click();
      await browser.pause(1000);
      const before = (await this.allNotificationTitles).length
      await this.firstNotificationXButton.click();
      await browser.pause(1000);
      const after = (await this.allNotificationTitles).length
      await browser.keys(['Escape']);
      return {before, after}
     }

     async dismissAllNotifications() {
      await this.notificationBellIcon.click();
      await browser.pause(1000);
      await this.dismissAllButton.click();
      await browser.pause(1500);
      const remaining = (await this.allNotificationTitles).length
      await browser.keys(['Escape']);
      return remaining;
     }

     async createInvoice() {
      await this.invoicesTab.click();
      await browser.pause(1000);
      await this.createInvoiceTab.click();
      await browser.pause(1000);
      await this.billingPeriodDropdown.click();
      await browser.pause(800);
      await this.firstBillingPeriodOption.click();
      await this.createInvoiceSubmitButton.click();
      await browser.pause(2000);
     }

     async deleteInvoice() {
      await this.invoicesTab.click();
      await browser.pause(1000);
      await this.invoiceListTab.click();
      await browser.pause(1000);
      await this.invoiceRowMoreIcon.click();
      await browser.pause(500);
      await this.deleteInvoiceMenuItem.click();
      await browser.pause(500);
      await this.confirmYesButton.click();
      await browser.pause(2000);
     }

     async verifyNotificationAppears() {
      await this.notificationBellIcon.click();
      await browser.pause(800);
      await browser.keys(['Escape'])
     }

     async navigateToCaseAndCreateTask(taskName) {
      await this.createTask(taskName); 
      //   await this.casesNavLink.click();
      //   await browser.pause(3000);
      //   const cases = await this.recentCasesItems
      //   await cases[0].click();
      //   await browser.pause(1000);
      //   await this.createTask(taskName);

     }

     async navigateToFirstCaseAndCreateInvoice() {
    await this.casesNavLink.click();
    await browser.pause(3000);
    await this.firstCaseRow.click();
    await browser.pause(1000);
    await this.createInvoice();
    await this.verifyNotificationAppears();
}

async navigateAndDeleteCase() {
    await this.casesNavLink.click();
    await browser.pause(3000);
    await this.caseRowMoreButton.click();
    await browser.pause(1000);
    await this.deleteCaseMenuItem.click();
    await browser.pause(1000);
    await this.confirmYesButton.click();
}

async navigateToFirstCase() {
    await this.casesNavLink.click();
    await browser.pause(3000);
    const cases = await this.recentCaseItems;
    await cases[0].click();
    await browser.pause(1000);
}

    


}

export default new NotificationPage();