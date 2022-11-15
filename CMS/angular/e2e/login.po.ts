import { browser, element, by } from 'protractor';

export class MyCMSLoginPage {
    navigateTo() {
        return browser.get('/');
    }

    getLoginButton() {
        return element(by.css('button[type="submit"]'));
    }

    getUserNameInput() {
        return element(by.css('input[name="userNameOrEmailAddress"]'));
    }

    getPasswordInput() {
        return element(by.css('input[name="password"]'));
    }
}
