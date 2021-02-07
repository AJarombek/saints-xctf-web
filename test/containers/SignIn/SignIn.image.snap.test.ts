/**
 * Image snapshot test for the sign in page.
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

describe('Snapshot Image tests for the sign in page.', () => {
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  const signInPageScreen = async (setScreenSize: (page: puppeteer.Page) => void): Promise<void> => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8090/signin');
    await setScreenSize(page);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  };

  it('displays the sign in page correctly (mobile small)', async () => {
    await signInPageScreen(mobileSmall);
  });

  it('displays the sign in page correctly (mobile medium)', async () => {
    await signInPageScreen(mobileMedium);
  });

  it('displays the sign in page correctly (mobile large)', async () => {
    await signInPageScreen(mobileLarge);
  });

  it('displays the sign in page correctly (tablet)', async () => {
    await signInPageScreen(tablet);
  });

  it('displays the sign in page correctly (desktop small)', async () => {
    await signInPageScreen(desktopSmall);
  });

  it('displays the sign in page correctly (desktop medium)', async () => {
    await signInPageScreen(desktopMedium);
  });

  it('displays the sign in page correctly (desktop large)', async () => {
    await signInPageScreen(desktopLarge);
  });

  afterAll(async () => {
    await browser.close();
  });
});
