import { WDIOBrowser } from "../wdio";
import path from "path";

class BrowserAdapter {

  public async goTo(path: string) {
    return WDIOBrowser.url(path);
  }

  public async getCurrentUrl() {
    return WDIOBrowser.getUrl();
  }

  public async maximizeWindow() {
    return WDIOBrowser.maximizeWindow()
  }

  public async sleep(timeout: number) {
    return WDIOBrowser.pause(timeout);
  }

  public async screenshot(imageName: string) {
    const pathToScreenshot = path.resolve(process.cwd(), `./screenshots/${imageName}.png`);
    return WDIOBrowser.saveScreenshot(pathToScreenshot)
  }

  public async getLocalStorage() {
    return WDIOBrowser.getCookies()
  }

  public async close() {
    return WDIOBrowser.closeWindow()
  }
}

export const browser = new BrowserAdapter();
