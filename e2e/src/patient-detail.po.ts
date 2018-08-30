import { browser, by, element } from 'protractor';

export class PatientDetailPage {
  async navigateTo(id) {
    return browser.get(`/patients/${id}`);
  }

  async getTitleText() {
    return await element(by.css('drp-patient-detail .title')).getText();
  }

  async scheduleAppointment() {
    return await element(by.linkText('Schedule Appointment')).click();
  }
}
