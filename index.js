const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')({sigint: true});

console.log(`
╭━━━╮╱╭╮╭━┳━━━┳━━━┳╮╱╭┳━━━━┳╮╱╭┳━━━┳━━━┳━╮╱╭╮╱╱╭━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━╮
┃╭━━╯╱┃┃┃╭┫╭━━┫╭━╮┃┃╱┃┃╭╮╭╮┃┃╱┃┃╭━╮┃╭━╮┃┃╰╮┃┃╱╱┃╭━╮┃╭━╮┃╭━╮┃╭━╮┃╭━╮┃╭━━┫╭━╮┃
┃╰━━╮╱┃╰╯╯┃╰━━┫╰━╯┃┃╱┃┣╯┃┃╰┫┃╱┃┃╰━━┫┃╱┃┃╭╮╰╯┃╱╱┃╰━━┫┃╱╰┫╰━╯┃┃╱┃┃╰━╯┃╰━━┫╰━╯┃
┃╭━┳┻━┫╭╮┃┃╭━━┫╭━━┫┃╱┃┃╱┃┃╱┃┃╱┃┣━━╮┃╰━╯┃┃╰╮┃┣━━╋━━╮┃┃╱╭┫╭╮╭┫╰━╯┃╭━━┫╭━━┫╭╮╭╯
┃╰━┻┳━┫┃┃╰┫╰━━┫┃╱╱┃╰━╯┃╱┃┃╱┃╰━╯┃╰━╯┃╭━╮┃┃╱┃┃┣━━┫╰━╯┃╰━╯┃┃┃╰┫╭━╮┃┃╱╱┃╰━━┫┃┃╰╮
╰━━━╯╱╰╯╰━┻━━━┻╯╱╱╰━━━╯╱╰╯╱╰━━━┻━━━┻╯╱╰┻╯╱╰━╯╱╱╰━━━┻━━━┻╯╰━┻╯╱╰┻╯╱╱╰━━━┻╯╰━╯\nThis tool helps you to download all of your examination results from the official e-keputusan site.\nNo data is shared with any other parties. Please provide us your College ID and IC number to continue.\nWe'll use this data to log-in as you and fetch all the results.`)

const NOMAKTAB = prompt('College ID: (NG190001) ');
const IC = prompt('IC Number: (010203160085) ');

console.log("Login details received, starting to fetch exam results from server...");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 720, height: 960 });

    await page.goto('https://mrsmgemencheh.edu.my/e-keputusan/Login.asp');

    // Type into search box.
    await page.type('#txtId', String(NOMAKTAB));

    await page.type('#txtPassword', String(IC))

    await page.click('#frmLogin > table > tbody > tr:nth-child(2) > td:nth-child(3) > input[type=submit]')

    await page.waitForSelector('body > p:nth-child(1) > a')

    const kunci = 'fb67ff080ff0792c51b5f3fcf4536402acc5bf43'

    // Function parameters:
    // fetchExamResult(page, NOMAKTAB, kunci, tingkatan, tahun, semester, ujian)

    // Tingkatan 1
    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 1, 2019, 2, 1)

    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 1, 2019, 2, 2)

    // Tingkatan 2
    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 2, 2020, 1, 1)

    // await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 2, 2020, 1, 2) // Data unavailable

    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 2, 2020, 2, 1)

    // await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 2, 2020, 2, 2) // Data unavailable

    // Tingkatan 3
    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 3, 2021, 1, 1)

    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 3, 2021, 1, 2)

    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 3, 2021, 2, 1)

    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 3, 2021, 2, 2)

    // Tingkatan 4
    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 4, 2022, 1, 1)

    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 4, 2022, 1, 2)

    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 4, 2022, 2, 1)

    await fetchStandardizedExamResult(page, NOMAKTAB, kunci, 4, 2022, 2, 2)

    await browser.close();
})();


examinationsResultsData = {
    tingkatan1 : {
        semester1 : {
            us1 : {
                bm: [81, 'A+'],

            },
            us2 : {},
            final : {}
        }, 
        semester2 : {} 
    },


}


async function fetchStandardizedExamResult(page, NOMAKTAB, kunci, tingkatan, tahun, semester, ujian) {

    let fetchURL = `https://mrsmgemencheh.edu.my/e-keputusan/EbvS4f3wequm4w19g4us7RT4VWE4tsT3t9uT4jK3xpv9t3t7ja7RT4VHtYI5T3t9uEbvS44yuwsum4w17RT4VHtYI5Vp3Y22yThVHtYI5T3t9uEbvS4ae42xt58wzQy8e7ui5b37.asp?idsort=&acx=66&nmk=${NOMAKTAB},&sem=${semester}&ting=${tingkatan}&thn=${tahun}&uji=${ujian}&tjk=Ujian%20Formatif%20${ujian}&nomaktab2=${kunci}`

    if(tingkatan == 2 && ujian == 2) {
        let fetchURL = `https://mrsmgemencheh.edu.my/ePelajar/EbvS4f3wequm4w19g4us7RT4VWE4tsT3t9uT4jK3xpv9t3t7ja7RT4VHtYI5T3t9uEbvS44yuwsum4w17RT4VHtYI5Vp3Y22yThVHtYI5T3t9uEbvS4ae42xt58wzQy8e7ui5b37.asp?idsort=&acx=66&nmk=${NOMAKTAB},&sem=${semester}&ting=${tingkatan}&thn=${tahun}&uji=${ujian}&tjk=Ujian%20Formatif%20${ujian}&nomaktab2=${kunci}`
    }

    console.log("Fetching link: " + fetchURL)

    try {
        await page.goto(fetchURL);

        await page.waitForSelector('body > div > table:nth-child(5) > tbody > tr > td > font:nth-child(1) > b')
    
        await page.screenshot({
            path: `./result/${"tingkatan-" + String(tingkatan) + "-tahun-" + String(tahun) + "-semester-" + String(semester) + "-us-" + String(ujian)}.png`
        });

        console.log(`Saving screenshot to ./result/${"tingkatan-" + String(tingkatan) + "-tahun-" + String(tahun) + "-semester-" + String(semester) + "-us-" + String(ujian)}.png`)
    } catch {
        console.warn("Error fetching page, skipping...")
    }
    
}