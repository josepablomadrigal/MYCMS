import { MyCMSLoginPage } from './login.po';
import { browser } from 'protractor';
import { CmsPage } from './cms.po';

describe('MyCMS App', function () {
    let loginPage: MyCMSLoginPage;
    let cmsPage: CmsPage;

    beforeEach(() => {
        loginPage = new MyCMSLoginPage();
        cmsPage = new CmsPage();
    });

    it('should display the login page', async () => {
        loginPage.navigateTo();
        const loginButton = await loginPage.getLoginButton();
        const userNameInput = await loginPage.getUserNameInput();
        const passwordInput = await loginPage.getPasswordInput();

        expect(userNameInput).toBeDefined();
        expect(passwordInput).toBeDefined();
        expect(loginButton).toBeDefined();
    });

    it('should login with admin account', async () => {
        const loginButton = await loginPage.getLoginButton();
        const userNameInput = await loginPage.getUserNameInput();
        const passwordInput = await loginPage.getPasswordInput();
        userNameInput.sendKeys('admin');
        passwordInput.sendKeys('123qwe');
        loginButton.click();
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain('/app/about');
    });

    it('should go to content management page', async () => {
        cmsPage.navigateTo();
        const createCMSButton = await cmsPage.getCreateCMSButton();
        const editCMSButton = await cmsPage.getEditCMSButton();

        expect(createCMSButton).toBeDefined();
        expect(editCMSButton).toBeDefined();
    });

    it('should create a new content page', async () => {
        const createCMSButton = await cmsPage.getCreateCMSButton();
        const pageNameInput = await cmsPage.getPageNameInput();
        const contentPageInput = await cmsPage.getContentPageInput();
        const modalSubmitButton = await cmsPage.getModalSubmitButton();

        createCMSButton.click();
        browser.sleep(1000);

        await pageNameInput.clear().sendKeys('Test Page');
        await contentPageInput.clear().sendKeys('<h1>Test Content</h1>');


        modalSubmitButton.click();

        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain('/app/cms/1');
    });

    it('should edit content page', async () => {
        const editCMSButton = await cmsPage.getEditCMSButton();
        const pageNameInput = await cmsPage.getPageNameInput();
        const contentPageInput = await cmsPage.getContentPageInput();
        const modalSubmitButton = await cmsPage.getModalSubmitButton();
        const pageNameLabel = await cmsPage.getPageNameLabel();
        const pageContent = await cmsPage.getPageContent();
        const pageName = 'Test Page'

        editCMSButton.click();
        browser.sleep(1000);
        expect(pageNameInput).toBeDefined();
        await pageNameInput.clear().sendKeys(pageName);
        await contentPageInput.clear().sendKeys('**Test Content**');

        modalSubmitButton.click();

        browser.sleep(1000);
        expect(pageNameLabel.getText()).toContain(pageName);
        expect(pageContent.getText()).toContain('Test Content');
    });


});
