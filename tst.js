const { Builder, By, Key, until } = require("selenium-webdriver");

async function exampleTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
    
        await driver.get("https://www.saucedemo.com");


    } finally {

        await driver.quit();
    }
}

exampleTest();
