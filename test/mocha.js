const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");

describe("Saucedemo Login Test", function () {
  it("should login and validate page title", async function () {
    // Menambahkan timeout 10 detik untuk pengujian ini
    this.timeout(10000); // 10000ms = 10 detik

    // Membuat koneksi dengan WebDriver untuk Chrome
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      // Buka URL di browser
      await driver.get("https://saucedemo.com");

      // Input username dan password
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver.findElement(By.id("password")).sendKeys("secret_sauce");
      await driver.findElement(By.name("login-button")).click();

      // Assertion untuk memverifikasi halaman
      let titleText = await driver.findElement(By.css(".app_logo")).getText();
      assert.strictEqual(
        titleText.includes("Swag Lab"),
        true,
        "Title does not include 'Swag Labs'"
      );
    } finally {
      // Menutup browser setelah pengujian selesai
      await driver.quit();
    }
  });
});
