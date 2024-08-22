import { MainPage } from "../framework";
import { browser, expect, it } from "../lib";

before(async () => {
  await browser.goTo("");
  await browser.maximizeWindow();
});

after(async () => {
  await browser.close();
});

describe("Testing task", () => {
  it("Find movie to watch", async () => {
    const movieName = "THE RISE AND FALL OF THE MAYA";

    await MainPage.verifyThatMovieExist(movieName);
    await MainPage.selectMovieToWatch(movieName);

    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).to.equal('https://www.natgeotv.com/')
  });
});
