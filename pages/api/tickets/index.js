import nc from 'next-connect';
const chromium = require('chrome-aws-lambda');
const url = 'https://www.thebakedpotato.com/events-calendar/';

const handler = nc()
  //  Retrieves upcoming 3 shows
  .get(async (req, res) => {
    // Initialize Browser instance
    // const browser = await puppeteer.launch({});
    const browser = await chromium.puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
    });
    // Initialize Page variable
    const page = await browser.newPage();
    await page.goto(url);
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
    let resArr = [];
    // res.status(200).json(cal);
    for (let i = 0; i < 3; i++) {
      let artist = cal.artists[i];
      let date = cal.dates[i];
      let href = cal.anchors[i];
      // console.log(cal.anchors.length, cal.artists.length, cal.dates.length)
      await page.goto(href);
      // await page.goto(href); // wait for the page to load

      var resMap = await page.evaluate(() => {
        // get ticket group elements
        const resultMap = {
          artist: '',
          date: '',
        };
        const PATIO_COUNT = 26;
        const INSIDE_COUNT = 65;
        let ticketCount = 0;
        const elements = Array.from(
          document.querySelectorAll('.tribe-tickets__item')
        );
        // check if sold out
        const availablitiy = elements.map((item) =>
          item.getAttribute('data-available')
        );
        availablitiy.forEach((available, idx) => {
          const isPatio = elements[idx]
            .querySelector('.tribe-tickets__item__content__title')
            .textContent.includes('Patio');
          if (available) {
            // compute amount of tickets available
            for (let i = 0; i < 70; i++) {
              elements[idx]
                .querySelector('.tribe-tickets__item__quantity__add')
                .click();
            }
            const tixAvailable = parseInt(
              elements[idx].querySelector('input').value
            );
            if (isPatio) {
              const count = PATIO_COUNT - tixAvailable;
              ticketCount += count;
              resultMap['patio'] = count;
            } else {
              const count = INSIDE_COUNT - tixAvailable;
              ticketCount += count;
              // refactor this
              if ('set1' in resultMap) {
                resultMap['set2'] = count;
              } else {
                resultMap['set1'] = count;
              }
            }
          } else {
            //it's sold out, add to ticketCount
            if (isPatio) {
              ticketCount += PATIO_COUNT;
              resultMap['patio'] = PATIO_COUNT;
            } else {
              ticketCount += INSIDE_COUNT;
              // refactor this
              if ('set1' in resultMap) {
                resultMap['set2'] = INSIDE_COUNT;
              } else if (idx == 1) {
                resultMap['set1'] = INSIDE_COUNT;
              }
            }
          }
        });
        resultMap['ticketCount'] = ticketCount;
        resultMap['occupancyRate'] = ticketCount / 156;
        return resultMap;
      });
      // artist = artist.replaceAll('\n', ' ');
      artist = artist.split('\n').join(' ');
      resMap['artist'] = artist;
      resMap['date'] = date;
      resMap['href'] = href;
      resMap['src'] = cal.imgs[i];
      resArr.push(resMap);
    }
    res.status(200).json(resArr);
  });

export default handler;
