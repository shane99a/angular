import {Injectable} from '@angular/core';

export interface DocsSiteTheme {
  name: string;
  displayName?: string;
  accent: string;
  primary: string;
  background: string;
  icon: string;
  isDefault?: boolean;
}


@Injectable()
export class ThemeStorage {
  static storageKey = 'docs-theme-storage-current-name';

  storeTheme(theme: DocsSiteTheme) {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme.name;
    } catch { }
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
    } catch {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch { }
  }
}
