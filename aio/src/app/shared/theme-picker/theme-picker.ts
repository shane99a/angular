import {
    ChangeDetectionStrategy,
    Component,
    NgModule,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
  } from '@angular/core';
  import {DocsSiteTheme, ThemeStorage} from './theme-storage/theme-storage';
  import {MatButtonModule} from '@angular/material/button';
  import {MatIconModule} from '@angular/material/icon';
  import {MatMenuModule} from '@angular/material/menu';
  import {MatTooltipModule} from '@angular/material/tooltip';
  import {CommonModule} from '@angular/common';

  @Component({
    selector: 'theme-picker',
    templateUrl: 'theme-picker.html',
    styleUrls: ['theme-picker.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
  })
  export class ThemePicker implements OnInit, OnDestroy {
    currentTheme: DocsSiteTheme;

    // The below colors need to align with the themes defined in theme-picker.scss
    themes: DocsSiteTheme[] = [
      {
        primary: '#1976d2',
        accent: '#e91e63',
        displayName: 'Light Theme',
        background: '#ffffff',
        name: 'ng-io-theme',
        icon: 'light_mode'
      },
      {
        primary: '#673AB7',
        accent: '#FFC107',
        background: '#000000',
        displayName: 'Night Theme',
        name: 'night-theme',
        icon: 'dark_mode'
      },
    ];

    defaultTheme: DocsSiteTheme = this.themes[0];

    constructor(
                private themeStorage: ThemeStorage) {
      const themeName = this.themeStorage.getStoredThemeName();
      if (themeName) {
        this.selectTheme(themeName);
      }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    selectTheme(themeName: string) {
      const theme = this.themes.find(currentTheme => currentTheme.name === themeName);
      this.currentTheme = theme || this.defaultTheme;
      if (this.currentTheme.name === this.defaultTheme.name) {
        document.body.classList.value = '';
      } else {
        document.body.classList.value = this.currentTheme.name;
      }
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }

  @NgModule({
    imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatTooltipModule,
    ],
    exports: [ThemePicker],
    declarations: [ThemePicker],
    providers: [ThemeStorage],
  })
  export class ThemePickerModule { }
