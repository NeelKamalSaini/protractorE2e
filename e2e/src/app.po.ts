import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('drp-schedule-day .title')).getText();
  }

  getAppointmentText() {
    return element(by.css('.col-12.col-md-9')).getText();
  }

}
