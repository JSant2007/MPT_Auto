import { test, expect } from '@playwright/test';
import csv from 'csv-parser';
import fs from 'fs';
import fsPromises from 'fs/promises';
import dotenv from 'dotenv';
import { getChatResponse } from './deepseek';

dotenv.config();

//! Content
let users = []
let pass = []
let prompt = []

const link = 'https://www.facebook.com/share/p/1GATATVqDp/'

//! CSV PARSER

let route1 = './data/Users.csv'
let route2 = './data/prompts.csv'

let MadeIt = (users, pass, myRoute) => {
    fs.createReadStream(myRoute) // Lee el archivo CSV
  .pipe(csv()) // Pasa el flujo al parser CSV
  .on('data', (row) => {
    users.push(row.users);
    pass.push(row.pass);
  })
  .on('end', () => {
    console.log('Archivo CSV procesado con éxito');
  });
}

let MadeIt2 = (prompt, myRoute) => {
    fs.createReadStream(myRoute) // Lee el archivo CSV
  .pipe(csv()) // Pasa el flujo al parser CSV
  .on('data', (row) => {
    prompt.push(row.prompt);
  })
  .on('end', () => {
    console.log('Archivo CSV procesado con éxito');
  });
}

MadeIt(users, pass, route1)
MadeIt2(prompt, route2)

// const Link = 'https://facebook.com/share/p/15euxqxeb8/';
// const Comment = "Holaa";

let GotoPage = async (page) => {
    await page.goto('https://facebook.com/');
    // await expect(page).toHaveTitle('Facebook');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="pass"]')).toBeVisible();
}

/**
 * Rellena los campos de correo electrónico y contraseña en la página dada y envía el formulario.
 *
 * @param {object} page - El objeto de página de Playwright.
 * @param {string} userlInput - El correo electrónico a rellenar.
 * @param {string} passInput - La contraseña a rellenar.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se envía el formulario.
 */
let FillFields = async (page, userlInput, passInput) => {
    await page.fill('input[name="email"]', userlInput);
    await page.fill('input[name="pass"]', passInput);
    await page.click('button[type="submit"]');
}

/**
 * Navega a un enlace dado, escribe un comentario y lo envía.
 *
 * @param {object} page - El objeto de página de Puppeteer para interactuar.
 * @param {string} linkInput - La URL a la que navegar.
 * @param {string} commentInput - El texto del comentario a escribir y enviar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando las acciones se completan.
*/

let CopyPostText = async (page) => {
  const postText = await page.innerText('//div[@data-ad-comet-preview="message"]//span[@dir="auto"]');
  return postText;
}

let CommentOut = async (page, link, promptInput, user) => {
  await page.goto(link);

  const postText = await CopyPostText(page);

  const prompt = await getChatResponse('solo dame la respuesta sin mas de ' + promptInput + ' leyendo el post ' + postText);
  
  await page.type('//div[@contenteditable="true" and @role="textbox"]', prompt);
  await page.locator('//div[@aria-label="Comentar" and @role="button"]').click();

  const fecha = new Date().toLocaleString();

  await fsPromises.appendFile('./data/logs/Informe.txt', `
    Usuario -> ${user} \n
    Enlace -> ${link} \n
    Respuesta -> ${prompt} \n
    Fecha ->  ${fecha} \n
    ------------------------------------ \n
  `);
};

test('Navegate', async ({ context }) => {
    for (const [i, user] of users.entries()) { 
        const page = await context.newPage(); 
        await GotoPage(page);
        console.log("In Page");

        await FillFields(page, user, pass[i]);
        console.log("Fields Filled");

        await page.waitForTimeout(20000);
        console.log("Just Waiting");

        // await page.goto('https://facebook.com/share/p/15euxqxeb8/');
        await CommentOut(page, link, prompt[i], user);
        //prompt
        console.log('Awesomeeee');

        await page.waitForTimeout(20000);
        await page.close();

        await context.clearCookies();


    }
})

/*
test('Navegate', async ({ page }) => {

    await GotoPage(page)
    console.log("In Page")

    await FillFields(page)
    console.log("Fields Filled")

    await page.waitForTimeout(40000)
    console.log("Just Waiting")

    await Surfing(page, Link, Comment)
    console.log('Awesomeeee')
    await page.waitForTimeout(30000)
})
*/