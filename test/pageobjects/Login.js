import { $, browser } from '@wdio/globals'
import { Base } from './Base.js'

class LoginPage extends Base {

    get usernameInput() {
        return $('[data-testid="login-username"]');
    }

    get passwordInput() {
        return $('[data-testid="login-password"]');
    }

    get loginButton() {
        return $('[data-testid="login-submit"]');
    }

    get errorMessage() {
        return $('[data-testid="login-error-text"]');
    }

    get sidebarNav() {
        return $('[data-testid="vert-nav-recent-cases"]');
    }

    get logoutButton() {
        return $('[data-testid="menu-logout-button"]');
    }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
        
    }

    async loginSixTimes(username, password) {
        for (let i = 0; i < 6; i++) {
            await this.login(username, password)
            await this.errorMessage.waitForDisplayed({ timeout: 5000});
        }
    }

}
export default new LoginPage(); 
