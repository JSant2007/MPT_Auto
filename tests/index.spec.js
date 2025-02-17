import { test, expect } from '@playwright/test';

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


test('Navegate', async ({ page }) => {
    await GotoPage(page)
    console.log("In Page")
    await FillFields(page)
    console.log("Fields Filled")
    await page.waitForTimeout(40000)
    console.log("Just Waiting")

    await page.waitForTimeout(40000)
})





// try {
//     goto();

//     console.log("In Page")
// }
// catch(error) {
//     console.log(error.message);
// }