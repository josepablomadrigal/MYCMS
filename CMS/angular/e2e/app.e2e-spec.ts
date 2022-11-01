import { MyCMSTemplatePage } from './app.po';

describe('MyCMS App', function() {
  let page: MyCMSTemplatePage;

  beforeEach(() => {
    page = new MyCMSTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
