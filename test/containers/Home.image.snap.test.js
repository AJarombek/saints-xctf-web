/**
 * Image snapshot test for the home page.
 * @author Andrew Jarombek
 * @since 1/31/2021
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
} from "../test-utils/pageSizes";

describe('Snapshot Image tests for the home page.', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  const homePageDefaultScreen = async (setScreenSize) => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8090');
    await setScreenSize(page);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  };

  it('displays the page correctly (mobile small)', async () => {
    await homePageDefaultScreen(mobileSmall);
  });

  it('displays the page correctly (mobile medium)', async () => {
    await homePageDefaultScreen(mobileMedium);
  });

  it('displays the page correctly (mobile large)', async () => {
    await homePageDefaultScreen(mobileLarge);
  });

  it('displays the page correctly (tablet)', async () => {
    await homePageDefaultScreen(tablet);
  });

  it('displays the page correctly (desktop small)', async () => {
    await homePageDefaultScreen(desktopSmall);
  });

  it('displays the page correctly (desktop medium)', async () => {
    await homePageDefaultScreen(desktopMedium);
  });

  it('displays the page correctly (desktop large)', async () => {
    await homePageDefaultScreen(desktopLarge);
  });

  afterAll(async () => {
    await browser.close();
  });
});
