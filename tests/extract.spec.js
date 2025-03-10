import { chromium } from 'playwright';
import dotenv from 'dotenv';
import { getChatResponse } from './deepseek.js';

import fs from 'fs';
import csv from 'csv-parser';
dotenv.config();

let prompts = [];

const ExtractPrompts = () => {
return new Promise((resolve, reject) => {
fs.createReadStream('./data/prompts.csv')
    .pipe(csv())
    .on('data', (row) => {
        prompts.push(row.prompt);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
resolve();
      })
      .on('error', reject);
    });
}

let link = 'https://www.facebook.com/MunicipalidadProvincialDeTacna/posts/pfbid02LxvwczBMsasxBABvjQvpLQRL9ByE2Qbjs4Jd3PtoQLL5R6AN9BQwBZu6erLwi7Tul';

let InPage = async (page) => {
    await page.goto(link);
}

const CopyPostText = async (page) => {
    const postText = await page.innerText('//div[@data-ad-comet-preview="message"]//span[@dir="auto"]');
    return postText;
};


// Llamada directa a la función sin usar `test`
(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await ExtractPrompts(); // Espera a que los prompts se carguen
    console.log("Iniciando la prueba");

    
    await InPage(page);
   // console.log("In Page")

    const postText = await CopyPostText(page);
    //console.log(postText);

    for (let i = 0; i < prompts.length; i++) {
    const response = await getChatResponse('solo dame la respuesta sin mas de ' + prompts[i] + ' leyendo el post ' + postText);
    
    console.log(response);
    }

    await page.close();
    await browser.close();
})();