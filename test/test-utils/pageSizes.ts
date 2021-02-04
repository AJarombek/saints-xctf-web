/**
 * Reusable functions to change the page sizes for image snapshot tests.
 * @author Andrew Jarombek
 * @since 2/3/2021
 */

import puppeteer from 'puppeteer';

export const mobileSmall = async (page: puppeteer.Page): Promise<void> => {
  await page.setViewport({
    width: 320,
    height: 900
  });
};

export const mobileMedium = async (page: puppeteer.Page): Promise<void> => {
  await page.setViewport({
    width: 375,
    height: 900
  });
};

export const mobileLarge = async (page: puppeteer.Page): Promise<void> => {
  await page.setViewport({
    width: 410,
    height: 900
  });
};

export const tablet = async (page: puppeteer.Page): Promise<void> => {
  await page.setViewport({
    width: 750,
    height: 900
  });
};

export const desktopSmall = async (page: puppeteer.Page): Promise<void> => {
  await page.setViewport({
    width: 900,
    height: 900
  });
};

export const desktopMedium = async (page: puppeteer.Page): Promise<void> => {
  await page.setViewport({
    width: 1200,
    height: 900
  });
};

export const desktopLarge = async (page: puppeteer.Page): Promise<void> => {
  await page.setViewport({
    width: 1600,
    height: 1200
  });
};
