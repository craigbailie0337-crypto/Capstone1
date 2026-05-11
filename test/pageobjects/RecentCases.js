import { $, browser } from '@wdio/globals';
import { Base } from './Base.js'

class RecentCasesPage extends Base {

    get recentCasesNavButton() {
        return $('[data-testid="vert-nav-recent-cases"]');
    }

    get firstCaseRow() {
    return $('(//button/span[contains(@class, "fui-Text")])[1]')
}
 
    get caseRowMoreButton() {
        return $('[data-testid="view-edit-case-more-options-button"]');
    }

    get deleteCaseMenuItem() {
        return $('[data-testid="view-edit-case-delete-menu-item"]');
    }

    async openCaseAndVerifyAtTopOfRecentCases() {
        await this.casesNavLink.click();
        await this.firstCaseRow.waitForDisplayed({ timeout: 5000});
        await this.firstCaseRow.click();
        await this.recentCasesNavButton.waitForDisplayed({ timeout: 5000});
        await this.recentCasesNavButton.click();
        await this.recentCaseItems[0].waitForDisplayed({ timeout: 5000});
    }

    async viewCaseAThenCaseB() {
        await this.casesNavLink.click();
        await this.getCaseRow(1).waitForDisplayed({ timeout: 5000});
        await this.getCaseRow(1).click();
        await this.casesNavLink.waitForClickable({ timeout: 5000});
        await this.casesNavLink.click();
        await this.getCaseRow(2).waitForDisplayed({ timeout: 5000});
        await this.getCaseRow(2).click();
        await this.recentCasesNavButton.waitForDisplayed({ timeout: 5000});
    }

    async viewSixCases() {
        for (let i = 1; i < 6; i++) {
            await this.casesNavLink.click();
            await this.getCaseRow(i).waitForDisplayed({ timeout: 5000});
            await this.getCaseRow(i).click();
            await this.recentCasesNavButton.waitForDisplayed({ timeout: 5000});
        }
    }

    async openCaseDeleteAndVerifyRemovedFromRecentCases() {
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
        await this.recentCasesNavButton.waitForClickable({ timeout: 5000});
        await this.recentCasesNavButton.click();
        await this.recentCasesNavButton.waitForStable({ timeout: 5000});
    }

    async viewThreeCases() {
        for (let i = 1; i <= 3; i++) {
            await this.casesNavLink.click();
            await this.getCaseRow(i).waitForDisplayed({ timeout: 5000});
            await this.getCaseRow(i).click();
            await this.recentCasesNavButton.waitForDisplayed({ timeout: 5000});
            
        }
    }

    async createTaskAndVerifyNotification(taskName) {
        await this.casesNavLink();
        const cases = await this.recentCaseItems;
        await cases[0].click();
        await this.createTask(taskName);
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
        await this.casesNavLink.click();
        await this.firstCaseRow.waitForDisplayed({ timeout: 5000});
        await this.firstCaseRow.click();
        await this.invoicesTab.waitForDisplayed({ timeout: 5000});
         
    }
    



   

}

export default new RecentCasesPage();
