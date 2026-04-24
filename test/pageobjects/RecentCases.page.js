import { $, browser } from '@wdio/globals'
import { Page } from './page.js';

class RecentCasesPage extends Page {

    get casesNavLink() {
        return $('[data-testid="vert-nav-cases"]');
    }

    get recentCasesNavButton() {
        return $('[data-testid="vert-nav-recent-cases"]');
    }

    get recentCaseItems() {
        return $('[data-testid^="vert-nav-recent-case-"]');
    }
 
    get caseRowMoreButton() {
        return $('[data-testid="view-edit-case-more-options-button"]');
    }

    get deleteCaseMenuItem() {
        return $('[data-testid="view-edit-case-delete-menu-item"]');
    }

    async openCaseAndVerifyAtTopOfRecentCases() {
        await this.casesNavLink.click();
        await browser.pause(1000);
        const cases = await this.recentCaseItems;
        await cases[0].click()
        await browser.pause(1500);
        await this.recentCasesNavButton.click();
        await browser.pause(600);
    }

    async viewCaseAThenCaseB() {
        await this.casesNavLink.click();
        await browser.pause(1000);
        const caseLinks = await this.recentCaseItems;
        await caseLinks[0].click();
        await browser.pause(1200);
        await this.casesNavLink.click();
        await browser.pause(1000);
        const refreshedCases = await this.recentCaseItems;
        await refreshedCases[1].click()
        await browser.pause(1500);
    }

    async viewSixCases() {
        for (let i = 0; i < 6; i++) {
            await this.casesNavLink.click();
            await browser.pause(1000);
            const cases = await this.recentCaseItems;
            await cases[i].click();
            await browser.pause(1000);
        }
    }

    async openCaseDeleteAndVerifyRemovedFromRecentCases() {
        await this.casesNavLink.click();
        await browser.pause(1000);
        const cases = await this.recentCaseItems;
        await cases[0].click();
        await browser.pause(1000);
        await this.caseRowMoreButton.click();
        await browser.pause(1000);
        await this.deleteCaseMenuItem.click();
        await browser.pause(500);
        await this.confirmYesButton.click();
        await browser.pause(2000);
        await this.recentCasesNavButton.click();
        await browser.pause(1000);
    }

    async viewThreeCases() {
        for (let I = 0; 1 < 3; i++) {
            await this.casesNavLink.click();
            await browser.pause(800);
            const cases = await this.recentCaseItems;
            await cases[i].click();
            await browser.pause(1200);
        }
    }

    async createTaskAndVerifyNotification(taskName) {
        await this.casesNavLink();
        const cases = await this.recentCaseItems;
        await cases[0].click();
        await this.createTask(taskName);
    }
    



   

}

export default new RecentCasesPage();
