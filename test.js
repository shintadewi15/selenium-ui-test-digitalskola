const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");
async function exampleTest() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // 1. Buka website SauceDemo
        await driver.get("https://www.saucedemo.com");

        // 2. Login
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver.findElement(By.id("password")).sendKeys("secret_sauce", Key.RETURN);

        // 3. Tunggu hingga halaman dashboard terlihat
        await driver.wait(until.elementLocated(By.className("title")), 5000);
        let dashboardTitle = await driver.findElement(By.className("title")).getText();
        console.log("Dashboard Title: ", dashboardTitle);
        if (dashboardTitle !== "Products") {
            throw new Error("Login gagal! Tidak berada di dashboard.");
        }

        // 4. Tambah item ke cart
        await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();

        // 5. Buka cart dan validasi item berhasil ditambahkan
        await driver.findElement(By.className("shopping_cart_link")).click();
        await driver.wait(until.elementLocated(By.className("cart_item")), 5000);

        let cartItem = await driver.findElement(By.className("inventory_item_name")).getText();
        console.log("Item in Cart: ", cartItem);

        if (cartItem !== "Sauce Labs Backpack") {
            throw new Error("Item tidak berhasil ditambahkan ke cart.");
        }

        console.log("✅ Test Berhasil! Item berhasil ditambahkan ke cart.");

    } catch (error) {
        console.error("❌ Test Gagal: ", error);
    } finally {
        // 6. Tutup browser setelah selesai
        await driver.quit();
    }
}

sauceDemoTest();
