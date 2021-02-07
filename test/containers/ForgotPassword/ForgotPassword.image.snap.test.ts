/**
 * Image snapshot test for the forgot password page.
 * @author Andrew Jarombek
 * @since 2/6/2021
 */

import puppeteer from 'puppeteer';
import {
  desktopLarge,
  desktopMedium,
  desktopSmall,
  mobileLarge,
  mobileMedium,
  mobileSmall,
  tablet
} from '../../test-utils/pageSizes';

describe('Snapshot Image tests for the forgot password page.', () => {
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  const forgotPasswordPageScreen = async (setScreenSize: (page: puppeteer.Page) => void): Promise<void> => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8090/forgotpassword');
    await setScreenSize(page);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  };

  it('displays the forgot password page correctly (mobile small)', async () => {
    await forgotPasswordPageScreen(mobileSmall);
  });

  it('displays the forgot password page correctly (mobile medium)', async () => {
    await forgotPasswordPageScreen(mobileMedium);
  });

  it('displays the forgot password page correctly (mobile large)', async () => {
    await forgotPasswordPageScreen(mobileLarge);
  });

  it('displays the forgot password page correctly (tablet)', async () => {
    await forgotPasswordPageScreen(tablet);
  });

  it('displays the forgot password page correctly (desktop small)', async () => {
    await forgotPasswordPageScreen(desktopSmall);
  });

  it('displays the forgot password page correctly (desktop medium)', async () => {
    await forgotPasswordPageScreen(desktopMedium);
  });

  it('displays the forgot password page correctly (desktop large)', async () => {
    await forgotPasswordPageScreen(desktopLarge);
  });

  const forgotPasswordPageFormFilledScreen = async (setScreenSize: (page: puppeteer.Page) => void): Promise<void> => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8090/forgotpassword');
    await setScreenSize(page);

    await page.type('input[name=email]', 'andrew@jarombek.com');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  };

  it('displays the forgot password page with an email entered correctly (mobile small)', async () => {
    await forgotPasswordPageFormFilledScreen(mobileSmall);
  });

  it('displays the forgot password page with an email entered correctly (mobile medium)', async () => {
    await forgotPasswordPageFormFilledScreen(mobileMedium);
  });

  it('displays the forgot password page with an email entered correctly (mobile large)', async () => {
    await forgotPasswordPageFormFilledScreen(mobileLarge);
  });

  it('displays the forgot password page with an email entered correctly (tablet)', async () => {
    await forgotPasswordPageFormFilledScreen(tablet);
  });

  it('displays the forgot password page with an email entered correctly (desktop small)', async () => {
    await forgotPasswordPageFormFilledScreen(desktopSmall);
  });

  it('displays the forgot password page with an email entered correctly (desktop medium)', async () => {
    await forgotPasswordPageFormFilledScreen(desktopMedium);
  });

  it('displays the forgot password page with an email entered correctly (desktop large)', async () => {
    await forgotPasswordPageFormFilledScreen(desktopLarge);
  });

  const forgotPasswordPageSuccessScreen = async (setScreenSize: (page: puppeteer.Page) => void): Promise<void> => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8090/forgotpassword');
    await setScreenSize(page);

    await page.type('input[name=email]', 'andrew@jarombek.com');
    await page.click('.form-buttons button');
    //await page.waitForSelector('[data-puppeteer="checkedIcon"]');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  };

  it('displays the forgot password page after sending the email correctly (mobile small)', async () => {
    await forgotPasswordPageSuccessScreen(mobileSmall);
  });

  it('displays the forgot password page after sending the email correctly (mobile medium)', async () => {
    await forgotPasswordPageSuccessScreen(mobileMedium);
  });

  it('displays the forgot password page after sending the email correctly (mobile large)', async () => {
    await forgotPasswordPageSuccessScreen(mobileLarge);
  });

  it('displays the forgot password page after sending the email correctly (tablet)', async () => {
    await forgotPasswordPageSuccessScreen(tablet);
  });

  it('displays the forgot password page after sending the email correctly (desktop small)', async () => {
    await forgotPasswordPageSuccessScreen(desktopSmall);
  });

  it('displays the forgot password page after sending the email correctly (desktop medium)', async () => {
    await forgotPasswordPageSuccessScreen(desktopMedium);
  });

  it('displays the forgot password page after sending the email correctly (desktop large)', async () => {
    await forgotPasswordPageSuccessScreen(desktopLarge);
  });

  const forgotPasswordPageErrorScreen = async (setScreenSize: (page: puppeteer.Page) => void): Promise<void> => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8090/forgotpassword');
    await setScreenSize(page);

    await page.type('input[name=email]', 'a@jar.com');
    await page.click('.form-buttons button');
    await page.waitForSelector('[data-puppeteer="errorStatus"]');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  };

  it('displays the forgot password page with an invalid email correctly (mobile small)', async () => {
    await forgotPasswordPageErrorScreen(mobileSmall);
  });

  it('displays the forgot password page with an invalid email correctly (mobile medium)', async () => {
    await forgotPasswordPageErrorScreen(mobileMedium);
  });

  it('displays the forgot password page with an invalid email correctly (mobile large)', async () => {
    await forgotPasswordPageErrorScreen(mobileLarge);
  });

  it('displays the forgot password page with an invalid email correctly (tablet)', async () => {
    await forgotPasswordPageErrorScreen(tablet);
  });

  it('displays the forgot password page with an invalid email correctly (desktop small)', async () => {
    await forgotPasswordPageErrorScreen(desktopSmall);
  });

  it('displays the forgot password page with an invalid email correctly (desktop medium)', async () => {
    await forgotPasswordPageErrorScreen(desktopMedium);
  });

  it('displays the forgot password page with an invalid email correctly (desktop large)', async () => {
    await forgotPasswordPageErrorScreen(desktopLarge);
  });

  afterAll(async () => {
    await browser.close();
  });
});
