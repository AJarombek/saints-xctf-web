/**
 * Image snapshot test for the home page.
 * @author Andrew Jarombek
 * @since 1/31/2021
 */

import puppeteer from 'puppeteer';

describe('Snapshot Image tests for the home page.', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('displays the page correctly', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8090');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
