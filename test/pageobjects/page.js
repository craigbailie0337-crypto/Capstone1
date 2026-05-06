import { $, $$, browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    opening () {
        return browser.url(`https://app.thecasework.com`)
    }

    openUp() {
        return browser.url('https://app.thecasework.com');
        
    }

    getCaseRow(index) {
        return $(`(//button/span[contains(@class, "fui-Text")])[${index}]`);
     }

     get confirmYesButton() {
        return $('[data-testid="confirmation-dialog-confirm-button"]')
     }

     get casesNavLink() {
             return $('[data-testid="vert-nav-cases"]');
         }

          get recentCaseItems() {
        return $$('[data-testid^="vert-nav-recent-case-"]');
    }

        get firstCaseRow() {
        return $('(//button/span[contains(@class, "fui-Text")])[1]');
    }

     get invoicesTab() {
        return $('[data-testid="view-edit-case-tab-invoices"]');
     }

     get dashboardNavLink() {
    return $('[data-testid="vert-nav-dashboard"]');
}

    
     


     



}
export default new Page();
