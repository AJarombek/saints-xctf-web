/**
 * Image snapshot test for the forgot password reset page.
 * @author Andrew Jarombek
 * @since 2/9/2021
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

describe('Snapshot Image tests for the forgot password reset page.', () => {
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  const forgotPasswordResetPageScreen = async (setScreenSize: (page: puppeteer.Page) => void): Promise<void> => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8090/forgotpassword/reset');
    await setScreenSize(page);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  };

  it('displays the forgot password reset page correctly (mobile small)', async () => {
    await forgotPasswordResetPageScreen(mobileSmall);
  });

  it('displays the forgot password reset page correctly (mobile medium)', async () => {
    await forgotPasswordResetPageScreen(mobileMedium);
  });

  it('displays the forgot password reset page correctly (mobile large)', async () => {
    await forgotPasswordResetPageScreen(mobileLarge);
  });

  it('displays the forgot password reset page correctly (tablet)', async () => {
    await forgotPasswordResetPageScreen(tablet);
  });

  it('displays the forgot password reset page correctly (desktop small)', async () => {
    await forgotPasswordResetPageScreen(desktopSmall);
  });

  it('displays the forgot password reset page correctly (desktop medium)', async () => {
    await forgotPasswordResetPageScreen(desktopMedium);
  });

  it('displays the forgot password reset page correctly (desktop large)', async () => {
    await forgotPasswordResetPageScreen(desktopLarge);
  });
});
