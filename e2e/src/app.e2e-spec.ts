import { AppPage } from './app.po';
import * as moment from 'moment';
import { CreatePatientPage } from './create-patient.po';
import { PatientListPage } from './patient-list.po';
import { PatientDetailPage } from './patient-detail.po';
import { CreateAppointmentPage } from './create-appointment.po';

describe('Payne Dentistry App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it(`should start by displaying today's schedule`, () => {
    page.navigateTo();

    const paragraphText = page.getParagraphText();
    expect(paragraphText).toContain('Schedule');
    expect(paragraphText).toContain(moment().format('LL'));
  });
});

describe('Patient management', () => {
  const firstName = 'Jeremy';
  const lastName = 'Burnett';

  let createPage: CreatePatientPage;
  let listPage: PatientListPage;
  let detailPage: PatientDetailPage;

  beforeEach(() => {
    createPage = new CreatePatientPage();
    listPage = new PatientListPage();
    detailPage = new PatientDetailPage();
  });

  it('should create a new patient', async () => {
    await createPage.navigateTo();

    await createPage.setFirstName(firstName);
    await createPage.setLastName(lastName);
    await createPage.setBirthDate('1996-04-07');
    await createPage.submitForm();
  });

  it('should list the newly created patient', async () => {
    await listPage.navigateTo();

    await listPage.selectPatientByName(firstName, lastName);
  });

  it('should show details of clicked patient', async () => {
    const patientName = await detailPage.getTitleText();

    expect(patientName).toBe(`${lastName}, ${firstName}`);
  });
});

describe('Appointment management', () => {
  const firstName = 'Neel';
  const lastName = 'Kamal';
  const appointmentStartEndTime = '12:00 AM - 12:30 AM';

  let createPatientPage: CreatePatientPage;
  let listPage: PatientListPage;
  let detailPage: PatientDetailPage;
  let createAppointmentPage: CreateAppointmentPage;
  let page: AppPage;
  beforeEach(() => {
    createPatientPage = new CreatePatientPage();
    listPage = new PatientListPage();
    detailPage = new PatientDetailPage();
    createAppointmentPage = new CreateAppointmentPage();
    page = new AppPage();
  });

  it('should create a new appointment', async () => {
    await createPatientPage.navigateTo();
    await createPatientPage.setFirstName(firstName);
    await createPatientPage.setLastName(lastName);
    await createPatientPage.setBirthDate('1996-04-07');
    await createPatientPage.submitForm();

    await listPage.navigateTo();
    await listPage.selectPatientByName(firstName, lastName);
    await detailPage.scheduleAppointment();

    await createAppointmentPage.submitForm();

    const paragraphText = page.getParagraphText();
    expect(paragraphText).toContain('Schedule');
    expect(paragraphText).toContain(moment().format('LL'));

    const appointmentTimeText = await page.getAppointmentText();
    expect(appointmentTimeText).toContain(appointmentStartEndTime);
    expect(appointmentTimeText).toContain(lastName);
    expect(appointmentTimeText).toContain(firstName);
  });

});
