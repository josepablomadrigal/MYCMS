import { browser, element, by } from 'protractor';

export class CmsPage {
    navigateTo() {
        return browser.get('/app/cms/1');
    }

    getCreateCMSButton() {
        return element(by.css('a[data-testid="createBtn"]'));
    }

    getEditCMSButton() {
        return element(by.css('a[data-testid="editBtn"]'));
    }

    getPageNameInput() {
        return element(by.css('input[data-testid="pageName"]'));
    }

    getContentPageInput() {
        //#pageContent > div > div > div
        return element(by.css('#pageContent > div > div > div'));
    }

    getModalSubmitButton() {
        return element(by.css('button[type="submit"]'));
    }

    getPageContent() {
        return element(by.css('div[data-testid="pageContent"]'));
    }

    getPageNameLabel() {
        return element(by.css('h1[data-testid="pageNameLabel"]'));
    }
}
