import { test, expect } from '@playwright/test';
import MadeIt from './csv-test.js';

//! Content
let users = []
let pass = []
let link = []
let comment = []


//! CSV PARSER

let route = './data/Pruebas.csv'

MadeIt(users, pass, link, comment, route)
console.log(users)
console.log(pass)
console.log(link)
console.log(comment)


const Link = 'https://facebook.com/share/p/15euxqxeb8/';
const Comment = "Holaa";

let GotoPage = async (page) => {
    await page.goto('https://facebook.com/');
    // await expect(page).toHaveTitle('Facebook');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="pass"]')).toBeVisible();
}

let FillFields = async (page) => {
    await page.fill('input[name="email"]', 'enquetepuedoayudar12@gmail.com');
    await page.fill('input[name="pass"]', 'vapeador12');
    await page.click('button[type="submit"]');
}

let Surfing = async (page, link, comment) => {
    await page.goto(link);
    //await page.click("div[@aria-label='Escribe un comentario…']/p");
    await page.type('//div[@contenteditable="true" and @role="textbox"]', comment);

    //await page.fill("form[@role='presentation']", comment);
    //await page.click("//div[@aria-label='comentar']")
    await page.locator('//div[@aria-label="Comentar" and @role="button"]').click();
}


let Execute = async (page) => {
    await GotoPage(page)
    console.log("In Page")

    await FillFields(page)
    console.log("Fields Filled")

    await page.waitForTimeout(40000)
    console.log("Just Waiting")


    // await page.goto('https://facebook.com/share/p/15euxqxeb8/');
    await Surfing(page, Link, Comment)
    console.log('Awesomeeee')
    await page.waitForTimeout(30000)
}

test('Navegate', async ({ page }) => {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        
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


    // await page.goto('https://facebook.com/share/p/15euxqxeb8/');
    await Surfing(page, Link, Comment)
    console.log('Awesomeeee')
    await page.waitForTimeout(30000)
})
*/




// try {
//     goto();

//     console.log("In Page")
// }
// catch(error) {
//     console.log(error.message);
// }