import { browser, $ as wdio$, $$ as wdio$$ } from "@wdio/globals";
import { expect as expectChai } from "chai";

export const WDIOBrowser = browser;
export const $ = wdio$;
export const $$ = wdio$$;

export const expect = expectChai;
