const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
 

describe("Login and Add User Belajar Bareng", function () {
    let driver;
    before(async function () {
        driver = await new Builder()
            .forBrowser("chrome")
            .build();
        await driver.get("https://belajar-bareng.onrender.com");
    });
    

    it("Should Login Successfully", async function () {
        let usernameInput = await driver.findElement(By.xpath("//*[@data-testid='username-input']"));
        let passwordInput = await driver.findElement(By.xpath("//*[@data-testid='password-input']"));
        let loginButton = await driver.findElement(By.xpath("//*[@data-testid='login-button']"));

        await usernameInput.sendKeys("admin");
        await passwordInput.sendKeys("admin");
        await loginButton.click();
        //redirect
        await driver.wait(until.urlContains("/users"),5000);
        //assert redirect
        const currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes("/users"),
            "User should be redirected to List Users"
        );        
    });

    it("Should Add User Successfully", async function () {
        await driver.findElement(By.xpath("//*[@data-testid='add-button']"))
            .click();
        let usernameInput = await driver.findElement(By.xpath("//*[@data-testid='username-input']"));
        let ageInput = await driver.findElement(By.xpath("//*[@data-testid='age-input']"));
        let loginButton = await driver.findElement(By.xpath("//*[@data-testid='submit-button']"));

        await usernameInput.sendKeys("seonhokim");
        await ageInput.sendKeys("32");
        await loginButton.click();

        //assert message
        const toast = await driver.wait(
        until.elementLocated(
        By.xpath("//*[@data-testid='toast-content']")),
        5000
        );

        await driver.wait(
        until.elementTextContains(toast,"User successfully added"),
        5000
        );

        const actual = await toast.getText();
        const expected = "User successfully added, Hi seonhokim!";
        assert.strictEqual(actual, expected);

        await driver.quit();
    });

});