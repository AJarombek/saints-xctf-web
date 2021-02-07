/**
 * Image snapshot test for the register page.
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

describe('Snapshot Image tests for the register page.', () => {
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  const registerPageScreen = async (setScreenSize: (page: puppeteer.Page) => void): Promise<void> => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8090/register');
    await setScreenSize(page);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  };

  it('displays the register page correctly (mobile small)', async () => {
    await registerPageScreen(mobileSmall);
  });

  it('displays the register page correctly (mobile medium)', async () => {
    await registerPageScreen(mobileMedium);
  });

  it('displays the register page correctly (mobile large)', async () => {
    await registerPageScreen(mobileLarge);
  });

  it('displays the register page correctly (tablet)', async () => {
    await registerPageScreen(tablet);
  });

  it('displays the register page correctly (desktop small)', async () => {
    await registerPageScreen(desktopSmall);
  });

  it('displays the register page correctly (desktop medium)', async () => {
    await registerPageScreen(desktopMedium);
  });

  it('displays the register page correctly (desktop large)', async () => {
    await registerPageScreen(desktopLarge);
  });

  const registerPageFormFilledScreen = async (setScreenSize: (page: puppeteer.Page) => void): Promise<void> => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8090/register');
    await setScreenSize(page);

    await page.type('input[name=firstName]', 'Andrew');
    await page.type('input[name=lastName]', 'Jarombek');
    await page.type('input[name=email]', 'andrew@jarombek.com');

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  };

  it('displays the register page with the form entered correctly (mobile small)', async () => {
    await registerPageFormFilledScreen(mobileSmall);
  });

  it('displays the register page with the form entered correctly (mobile medium)', async () => {
    await registerPageFormFilledScreen(mobileMedium);
  });

  it('displays the register page with the form entered correctly (mobile large)', async () => {
    await registerPageFormFilledScreen(mobileLarge);
  });

  it('displays the register page with the form entered correctly (tablet)', async () => {
    await registerPageFormFilledScreen(tablet);
  });

  it('displays the register page with the form entered correctly (desktop small)', async () => {
    await registerPageFormFilledScreen(desktopSmall);
  });

  it('displays the register page with the form entered correctly (desktop medium)', async () => {
    await registerPageFormFilledScreen(desktopMedium);
  });

  it('displays the register page with the form entered correctly (desktop large)', async () => {
    await registerPageFormFilledScreen(desktopLarge);
  });

  afterAll(async () => {
    await browser.close();
  });
});
