import next from 'next';
import nc from 'next-connect';
const puppeteer = require('puppeteer');
const url = 'https://www.thebakedpotato.com/events-calendar/';

const handler = nc()
  .use(async (req, res, next) => {
    next();
  })
  .get(async (req, res) => {
    // Initialize Browser instance
    const browser = await puppeteer.launch({});
    // Initialize Page variable
    const page = await browser.newPage();
    await page.goto('https://www.thebakedpotato.com/events-calendar/');
    let cal = await page.evaluate(() => {
      let artists = Array.from(
        document.querySelectorAll('.event > div >h1')
      ).map((title) => title.textContent);
      let dates = Array.from(document.querySelectorAll('.date')).map(
        (date) => date.textContent
      );
      let anchors = Array.from(
        document.querySelectorAll('.event > .title > a')
      ).map((anchor) => anchor.href);
      let imgs = Array.from(
        document.querySelectorAll('.event > div > img')
      ).map((img) => img.src);
      return { artists, dates, anchors, imgs };
    });
    res.status(200).json(cal);
  });

export default handler;
