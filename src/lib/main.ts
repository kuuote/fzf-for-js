import { AsyncFinder, SyncFinder } from "./finders.ts";
import type {
  ArrayElement,
  AsyncOptionsTuple,
  AsyncOptsToUse,
  SyncOptionsTuple,
  SyncOptsToUse,
} from "./finders.ts";
import type { AsyncOptions, SyncOptions } from "./types.ts";

export type { FzfResultItem, Selector, Tiebreaker } from "./types.ts";
export * from "./matchers.ts";
export * from "./tiebreakers.ts";

export type FzfOptions<U = string> = U extends string ? SyncOptsToUse<U>
  : SyncOptsToUse<U> & { selector: SyncOptions<U>["selector"] };

export class Fzf<L extends ReadonlyArray<any>> {
  private finder: SyncFinder<L>;
  find: SyncFinder<L>["find"];

  constructor(list: L, ...optionsTuple: SyncOptionsTuple<ArrayElement<L>>) {
    this.finder = new SyncFinder(list, ...optionsTuple);
    this.find = this.finder.find.bind(this.finder);
  }
}

export type AsyncFzfOptions<U = string> = U extends string ? AsyncOptsToUse<U>
  : AsyncOptsToUse<U> & { selector: AsyncOptions<U>["selector"] };

export class AsyncFzf<L extends ReadonlyArray<any>> {
  private finder: AsyncFinder<L>;
  find: AsyncFinder<L>["find"];

  constructor(list: L, ...optionsTuple: AsyncOptionsTuple<ArrayElement<L>>) {
    this.finder = new AsyncFinder(list, ...optionsTuple);
    this.find = this.finder.find.bind(this.finder);
  }
}
