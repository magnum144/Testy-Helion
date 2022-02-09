import { deleteAlert, deleteInfobox, searchPhrase } from "../../config/data";
import { helionHomeUrl, searchProductUrl, cartUrl } from "../../config/pagesUrl";
import cartPage from "../../pages/components/cartPage";
import productPage from "../../pages/components/productPage";
import searchbarPage from "../../pages/components/searchbarPage";
import SearchResultPage from "../../pages/SearchResultPage";

describe("E2E - Products", async () => {
 let productTitle: string = "";
 let price: string = "";

 before(() => {
  browser.url(helionHomeUrl);
 })

 it("Should type search phrase and click search icon", async () => {
  await searchbarPage.typeSearchPhrase(searchPhrase);
  await searchbarPage.clickOnSearchIcon();
  await expect(browser).toHaveUrl(searchProductUrl);
 })

 it("Should click on first book", async () => {
  await SearchResultPage.clickOnFirstBookItem();
  await productPage.productTitleIsVisible();
  await productPage.addToCartBtnIsVisible();
  productTitle = await productPage.getProductTitleValue();
  price = await productPage.getProductPrice();

 })

 it("Should click on add to cart button", async () => {
  await productPage.clickOnAddToCartBtn();
  await expect(browser).toHaveUrlContaining(cartUrl);
  await expect(await cartPage.getSuccessAlertValue()).toContain(productTitle);
  await expect(await cartPage.getTotalPriceValue()).toContain(price);
 })

 it("Should delete product from cart", async () => {
  await cartPage.clickOnCheckbox();
  await cartPage.clickOnDeleteSelectedLabel();
  //@ts-ignore
  await expect(await browser.getAlertText()).toContain(deleteAlert);
  await cartPage.acceptDeleteAlert();
  await expect(await cartPage.getDeleteInfoboxText()).toContain(deleteInfobox);
 })
})