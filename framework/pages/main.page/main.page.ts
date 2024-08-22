import { BasePage, SwiperElement } from "../../../lib";
import type { SwiperElementType, TileType } from "../../../lib";

type MainPageClickOnType = {
  movies: string;
};

type MainPageSendKeysType = {};

type MainPageGetDataType = {
  movies: string | "All";
};

type MainPageGetDataResultsType = {
  movies: TileType[];
};

type MainPageIsVisibleType = {};

type MainPageIsVisibleResultsType = {};

type MainPageWaitForPageStateType = {};

export type MainPageType = {
  sendKeys(data: Partial<MainPageSendKeysType>): Promise<void>;
  clickOn(data: Partial<MainPageClickOnType>): Promise<void>;
  getData(data: Partial<MainPageGetDataType>): Promise<MainPageGetDataResultsType>;
  isVisible(data: Partial<MainPageIsVisibleType> | null): Promise<MainPageIsVisibleResultsType | boolean>;
  waitForPageState(data: Partial<MainPageWaitForPageStateType>): Promise<void>;
};

export class MainPage extends BasePage implements MainPageType {
  private movies: SwiperElementType;

  constructor(selector: string, name: string) {
    super(selector, name);

    this.movies = this.initChild(SwiperElement, "div.TileStackCarousel__Container", "Movie Tiles Swiper");
  }
}

export const mainPage = new MainPage("div#natgeo", "Main Page");
