import globalPage from "../../pages/globalPage";
import searchbarPage from "../../pages/components/searchbarPage";
import SearchResultPage from "../../pages/SearchResultPage";
import { helionHomeUrl, notFoundUrl, searchPageUrl } from "../../config/pagesUrl";
import { incorrectSearchPhrase, notFoundMessage, searchPhrase, searchResultTitle } from "../../config/data";

describe("E2E - Searchbar", async () => {
 it("Should open Helion home page and verify url and visible searchbar", async () => {
  await globalPage.openPage(helionHomeUrl, helionHomeUrl);
  await searchbarPage.searchbarIsVisible();
 })

 it("Should click on search icon and verify url", async () => {
  await searchbarPage.clickOnSearchIcon();
  await expect(browser).toHaveUrl(helionHomeUrl);
 })

 it("Should type search value and verify visible popup", async () => {
  await searchbarPage.typeSearchPhrase(searchPhrase);
  await searchbarPage.suggestPopupIsVisible();

 })

 it("Should click on see all books button", async () => {
  await searchbarPage.clickOnSeeAllBooksBtn();
  await expect(browser).toHaveUrl(searchPageUrl);
 })

 it("Should verify visible correctly title and number of books", async () => {
  const title: string = await SearchResultPage.getPageTitle();
  const numberOfBooks: number = await SearchResultPage.getNumberOfBooks();
  await expect(title).toContain(searchResultTitle);
  await expect(numberOfBooks).toEqual(20);
 })

 it("Should clear input value", async () => {
  await searchbarPage.clearSearchBar();
  await expect(await searchbarPage.getInputValue()).toContain("");
 })

 it("Should type incorrect book name and verify alert", async () => {
  await searchbarPage.typeSearchPhrase(incorrectSearchPhrase);
  await searchbarPage.clickOnSearchIcon();
  await expect(await searchbarPage.getNotFoudAlertText()).toContain(notFoundMessage);
 })

 it("Should clear input value and click on search icon", async () => {
  await searchbarPage.clearSearchBar();
  await searchbarPage.clickOnSearchIcon();
  await expect(browser).toHaveUrl(notFoundUrl);
  await expect(await searchbarPage.getInputValue()).toContain(incorrectSearchPhrase);
 })
})
