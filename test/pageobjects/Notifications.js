import { $, $$, browser } from '@wdio/globals';
import { Base } from './BasePage.js'


class NotificationPage extends Base {
    open () {
         return super.open
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

     get firstNotificationXButton() { 
        return $('button[data-testid*="notification-dismiss-button"]');
     }

     get allNotificationTitles() {
         return $$('button[data-testid*="notification-dismiss-button"]');
      //   return $$('//span[contains(text(),"Invoice") or contains(text(),"Task") or contains(text(),"Case created")]');
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
         return $('div[id^="fluent-option"]');
     }

     get createInvoiceSubmitButton() {
        return $('[data-testid="create-invoice-submit-button"]');
     }

     get invoiceRowMoreIcon() {
         return $('button[aria-label="More items"]')
     }

     get deleteInvoiceMenuItem() {
        return $('[data-testid="custom-data-table-context-menu-item-Delete"]');
     }

     get markPaidMenuItem() {
        return $('[data-testid="custom-data-table-context-menu-item-Mark Paid"]');
     }

     get verifyTaskDashboard() {
         return $('//span[contains(text(),"Dashboard Appear Task")]');
     }

     get caseDropDownTask() {
         return $('button[data-testid="case-filter-menu"]');
     }

     get milestoneDropDownTask() {
         return $('button[data-testid="milestone-dropdown-menu"]');
     }

     get assignToTask() {
         return $('button[data-testid="user-filter-menu"]');
     }

     get firstCaseOption() {
         return $('[data-testid*="case-control-"]');
     }

     get firstMilestoneOption() {
         return $('div[data-testid*="milestone-dropdown-menu-"]');
     }

     get firstAssignToOption() {
         // return $('[data-testid^="user-filter-menu-"][data-testid$="-option"]');
         return $('[data-testid="user-filter-menu-92fd9617-adfc-4664-bb84-a2b177df8432-option"]');
     }

     get toastMessage() {
         return $('//div[contains(@class,"fui-ToastTitle")]');
     }



     async createTask(taskText) {
      await this.addTaskButton.waitForClickable({ timeout: 10000 });
      await this.addTaskButton.click();
      await this.caseDropDownTask.waitForDisplayed({ timeout: 8000});
      await this.caseDropDownTask.click();
      await this.firstCaseOption.waitForExist({ timeout: 8000});
      await this.firstCaseOption.click();
      await this.milestoneDropDownTask.waitForStable({ timeout: 15000});
      await this.assignToTask.waitForClickable({ timeout: 8000});
      await this.assignToTask.click();
      await this.firstAssignToOption.waitForDisplayed({ timeout: 8000});
      await this.firstAssignToOption.click();
      await this.taskTextarea.waitForDisplayed({ timeout: 5000});
      await this.taskTextarea.click();
      await this.taskTextarea.setValue(taskText);
      await this.milestoneDropDownTask.waitForClickable({ timeout: 15000});
      await this.milestoneDropDownTask.click();
      await this.firstMilestoneOption.waitForExist({ timeout: 15000});
      await this.firstMilestoneOption.click();
      await this.saveTaskButton.waitForStable({ timeout: 5000});
      await this.saveTaskButton.waitForClickable({ timeout: 12000});
      await this.saveTaskButton.click();
      await this.saveTaskButton.waitForDisplayed({ timeout: 8000, reverse: true });
      await browser.keys(['Escape']);
     }

     async getNotificationCount() {
      await this.notificationBellIcon.click();
      await this.allNotificationTitles[0].waitForExist({ timeout: 5000});
      const count = (await this.allNotificationTitles).length;
      await browser.keys(['Escape']);
      return count
     }

     async dismissFirstNotificationAndCount() {
      await this.notificationBellIcon.click();
      const titles = await this.allNotificationTitles
      if (titles.length === 0) {
         await browser.keys(['Escape'])
         return { before: 0, after: 0 }
      }
      await this.firstNotificationXButton.waitForDisplayed({ timeout: 15000 })
      const before = (await this.allNotificationTitles).length;
      await this.firstNotificationXButton.click();
      await browser.waitUntil(async () => {
        const current = (await this.allNotificationTitles).length;
        return current < before
    }, {
        timeout: 10000,
        timeoutMsg: 'Notification was not removed after clicking X'
    })
      const after = (await this.allNotificationTitles).length;
      await browser.keys(['Escape']);
      return { before, after };
}

     async dismissAllNotifications() {
      await this.notificationBellIcon.click();
      await this.dismissAllButton.waitForDisplayed({ timeout: 10000});
      await this.dismissAllButton.click();
      await this.dismissAllButton.waitForDisplayed({ timeout: 15000, reverse: true });
      const remaining = (await this.allNotificationTitles).length
      await browser.keys(['Escape']);
      return remaining;
     }

     async createInvoice() {
      await this.invoicesTab.click();
      await this.createInvoiceTab.waitForClickable({ timeout: 5000});
      await this.createInvoiceTab.click();
      await this.billingPeriodDropdown.waitForClickable({ timeout: 5000});
      await this.billingPeriodDropdown.click();
      await this.firstBillingPeriodOption.waitForDisplayed({ timeout: 8000});
      await this.firstBillingPeriodOption.click();
      await this.createInvoiceSubmitButton.waitForClickable({ timeout: 5000});
      await this.createInvoiceSubmitButton.click();
      await this.invoiceListTab.waitForDisplayed({ timeout: 8000});
     }

     async deleteInvoice() {
      await this.invoicesTab.click();
      await this.invoiceListTab.waitForClickable({ timeout: 5000});
      await this.invoiceListTab.click();
      await this.invoiceListTab.waitForDisplayed({ timeout: 5000});
      await this.invoiceRowMoreIcon.waitForClickable({ timeout: 10000});
      await this.invoiceRowMoreIcon.click();
      await this.deleteInvoiceMenuItem.waitForDisplayed({ timeout: 10000});
      await this.deleteInvoiceMenuItem.click();
      await this.confirmYesButton.waitForClickable({ timeout: 10000});
      await this.confirmYesButton.click();
      await this.deleteInvoiceMenuItem.waitForDisplayed({ timeout: 5000, reverse: true });
     }

     async verifyNotificationAppears() {
      await this.notificationBellIcon.click();
      await this.allNotificationTitles[0].waitForDisplayed({ timeout: 5000});
      await browser.keys(['Escape'])
     }

     async navigateToCaseAndCreateTask(taskName) {
      await this.createTask(taskName); 
     }

     async navigateToFirstCaseAndCreateInvoice() {
      await this.casesNavLink.click();
      await this.firstCaseRow.waitForDisplayed({ timeout: 5000});
      await this.firstCaseRow.click();
      await this.invoicesTab.waitForDisplayed({ timeout: 5000});
      await this.createInvoice();
      // await this.verifyNotificationAppears();
}

     async navigateAndDeleteCase() {
      await this.casesNavLink.click();
      await this.firstCaseRow.waitForDisplayed({ timeout: 5000});
      await this.firstCaseRow.click();
      await this.caseRowMoreButton.waitForClickable({ timeout: 5000});
      await this.caseRowMoreButton.click();
      await this.deleteCaseMenuItem.waitForDisplayed({ timeout: 5000});
      await this.deleteCaseMenuItem.click();
      await this.confirmYesButton.waitForClickable({ timeout: 5000});
      await this.confirmYesButton.click();
      await this.confirmYesButton.waitForDisplayed({ timeout: 5000, reverse: true });
     }


     async navigateToFirstCase() {
      await this.casesNavLink.waitForClickable({ timeout: 5000});
      await this.casesNavLink.click();
      await this.firstCaseRow.waitForDisplayed({ timeout: 5000});
      await this.firstCaseRow.click();
      await this.invoicesTab.waitForDisplayed({ timeout: 5000});
}

    


}

export default new NotificationPage();