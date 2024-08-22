import { compareImages, downloadImage, expect, logging, stringToLink } from "../../../lib";
import { mainPage } from "./main.page";
import type { MainPageType } from "./main.page";

@logging((name: string) => `${name} element execute: `)
class MainPageActions {
  private page: MainPageType = mainPage;

  public async verifyThatMovieExist(movieName: string) {
    const {movies} = await this.page.getData({ movies: movieName });
    const [movie] = movies;

    const imageName = `${stringToLink(movieName)}.jpg`;
    
    let diff;

    if (movie.moviePosterLink !== null) {
      const pathToActualImage = await downloadImage(movie.moviePosterLink, imageName);
      diff = await compareImages(pathToActualImage, `test.data\\expected.images\\${imageName}`);
    } else {
      throw new Error(`There is no link for movie poster for: ${movieName}`)
    }

    expect(diff).to.equal(0);
  }

  public async selectMovieToWatch(movieName: string) {
    await this.page.clickOn({movies: movieName});
  }

}

export const MainPage = new MainPageActions();
