import { BaseElement } from "../base";
import { browser } from "../browser";
import { stringToLink } from "../helpers";
import { logging } from "../reporter";

const TILE_CARD_SELECTOR = "div.TileStackCarousel__Card";
const MOVIE_LINK_SELECTOR = "a.AnchorLink";
const POSTER_LINK_SELECTOR = "span[class$=--visible]";
const WATCH_NOW_BUTTON_SELECTOR = 'a.Button--anchorLink.fitt-tracker';
const RIGHT_ARROW_BUTTON_SELECTOR = 'button.Swiper__Button--next';

const POSTER_LINK_REGEXP = /(?<=url\(")(.*)(?="\);)/g;

export type TileType = { movieLink: string, moviePosterLink: string | null };

export type SwiperElementType = {
  getData: (movieName: string | "All") => Promise<TileType[]>;
  clickOn: (movieName: string) => Promise<void>;
};

@logging((name: string) => `${name} element execute:`)
export class SwiperElement extends BaseElement implements SwiperElementType {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  public async getData(movieName: string) {
    await this.currentElement.scrollIntoView();

    if (movieName !== 'All') {
      return this.privateGetDataForSpecificMovie(movieName)
    } else {
      return this.privateGetDataForAllMovies();
    }
  }

  public async clickOn(movieName: string) {
    const linkyfiedName = stringToLink(movieName);

    await this.currentElement.scrollIntoView();

    let counter = 0;

    while (counter !== await this.tileElements.length) {
      const activeTile = this.currentElement.$('div.SwiperSlide--active');
      const activeTileLinkElem = activeTile.$(MOVIE_LINK_SELECTOR);
      const activeTileLinkText = await activeTileLinkElem.getAttribute("href");
      const isNeededMovie = activeTileLinkText.includes(linkyfiedName);

      if (isNeededMovie) {
        await activeTile.$(WATCH_NOW_BUTTON_SELECTOR).click();
        counter = 0;
        return;
      } else {
        await this.rightArrowButton.click();
        counter++
      }
    }

    throw new Error(`Can't find the movie: "${movieName}"`);
  }

  /**
   *
   * @private_service_methods
   */ 

  private get tileElements() {
    return this.currentElement.$$(TILE_CARD_SELECTOR);
  }

  private get rightArrowButton() {
    return this.currentElement.$(RIGHT_ARROW_BUTTON_SELECTOR);
  }

  private async privateGetDataForSpecificMovie(movieName: string) {
    const linkyfiedName = stringToLink(movieName);
    const tiles: TileType[] = [];

    let counter = 0;

    while (counter !== await this.tileElements.length) {
      const activeTile = this.currentElement.$('div.SwiperSlide--active');

      const activeTileLinkElem = activeTile.$(MOVIE_LINK_SELECTOR);
      const movieLink = await activeTileLinkElem.getAttribute("href");

      const isNeededMovie = movieLink.includes(linkyfiedName);

      if (!isNeededMovie) {
        await this.rightArrowButton.click();
        counter++
      } else {
        const moviePosterStyles = await activeTile.$(POSTER_LINK_SELECTOR).getAttribute("style");
        const moviePosterLink = moviePosterStyles.match(POSTER_LINK_REGEXP)![0];

        tiles.push({ movieLink, moviePosterLink });
        
        counter = 0;
        return tiles;
      }
    }

    throw new Error(`Can't find the movie: "${movieName}"`);
  }

  private async privateGetDataForAllMovies() {
    const tiles: TileType[] = [];

    let counter = 0;

    while (counter !== await this.tileElements.length) {
      const activeTile = this.currentElement.$('div.SwiperSlide--active');

      const activeTileLinkElem = activeTile.$(MOVIE_LINK_SELECTOR);
      const movieLink = await activeTileLinkElem.getAttribute("href");

      const moviePosterStyles = await activeTile.$(POSTER_LINK_SELECTOR).getAttribute("style");
      const moviePosterLink = moviePosterStyles.match(POSTER_LINK_REGEXP)![0];

      if (tiles[0]?.movieLink === movieLink) {
        counter = 0;
        break;
      } else {
        tiles.push({ movieLink, moviePosterLink });
        counter++
        await this.rightArrowButton.click();
      }
    }

    return tiles;
  }
}
