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
} from '../test-utils/pageSizes';

describe('Snapshot Image tests for the home page.', () => {
  let browser: puppeteer.Browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  const homePageScreen = async (setScreenSize: (page: puppeteer.Page) => void, path = ''): Promise<void> => {
    const page = await browser.newPage();
    await page.goto(`http://localhost:8090/${path}`);
    await setScreenSize(page);
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  };

  it('displays the home page correctly (mobile small)', async () => {
    await homePageScreen(mobileSmall);
  });

  it('displays the home page correctly (mobile medium)', async () => {
    await homePageScreen(mobileMedium);
  });

  it('displays the home page correctly (mobile large)', async () => {
    await homePageScreen(mobileLarge);
  });

  it('displays the home page correctly (tablet)', async () => {
    await homePageScreen(tablet);
  });

  it('displays the home page correctly (desktop small)', async () => {
    await homePageScreen(desktopSmall);
  });

  it('displays the home page correctly (desktop medium)', async () => {
    await homePageScreen(desktopMedium);
  });

  it('displays the home page correctly (desktop large)', async () => {
    await homePageScreen(desktopLarge);
  });

  it('displays description on the home page correctly (mobile small)', async () => {
    await homePageScreen(mobileSmall, '#about');
  });

  it('displays description on the home page correctly (mobile medium)', async () => {
    await homePageScreen(mobileMedium, '#about');
  });

  it('displays description on the home page correctly (mobile large)', async () => {
    await homePageScreen(mobileLarge, '#about');
  });

  it('displays description on the home page correctly (tablet)', async () => {
    await homePageScreen(tablet, '#about');
  });

  it('displays description on the home page correctly (desktop small)', async () => {
    await homePageScreen(desktopSmall, '#about');
  });

  it('displays description on the home page correctly (desktop medium)', async () => {
    await homePageScreen(desktopMedium, '#about');
  });

  it('displays description on the home page correctly (desktop large)', async () => {
    await homePageScreen(desktopLarge, '#about');
  });

  it('displays testimonials on the home page correctly (mobile small)', async () => {
    await homePageScreen(mobileSmall, '#testimonials');
  });

  it('displays testimonials on the home page correctly (mobile medium)', async () => {
    await homePageScreen(mobileMedium, '#testimonials');
  });

  it('displays testimonials on the home page correctly (mobile large)', async () => {
    await homePageScreen(mobileLarge, '#testimonials');
  });

  it('displays testimonials on the home page correctly (tablet)', async () => {
    await homePageScreen(tablet, '#testimonials');
  });

  it('displays testimonials on the home page correctly (desktop small)', async () => {
    await homePageScreen(desktopSmall, '#testimonials');
  });

  it('displays testimonials on the home page correctly (desktop medium)', async () => {
    await homePageScreen(desktopMedium, '#testimonials');
  });

  it('displays testimonials on the home page correctly (desktop large)', async () => {
    await homePageScreen(desktopLarge, '#testimonials');
  });

  afterAll(async () => {
    await browser.close();
  });
});
