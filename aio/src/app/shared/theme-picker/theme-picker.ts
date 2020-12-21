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
  import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
  import {MatMenuModule} from '@angular/material/menu';
  import {MatTooltipModule} from '@angular/material/tooltip';
  import {CommonModule} from '@angular/common';
  import {DomSanitizer} from '@angular/platform-browser';

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
        displayName: 'Default',
        name: 'ng-io-theme',
        isDark: false,
      },
      {
        primary: '#673AB7',
        accent: '#FFC107',
        displayName: 'Deep Purple & Amber',
        name: 'deeppurple-amber',
        isDark: false,
      },
      {
        primary: '#3F51B5',
        accent: '#E91E63',
        displayName: 'Indigo & Pink',
        name: 'indigo-pink',
        isDark: false,
      },
      {
        primary: '#E91E63',
        accent: '#607D8B',
        displayName: 'Pink & Blue-grey',
        name: 'pink-bluegrey',
        isDark: true,
      },
      {
        primary: '#9C27B0',
        accent: '#4CAF50',
        displayName: 'Purple & Green',
        name: 'purple-green',
        isDark: true,
      },
    ];

    defaultTheme: DocsSiteTheme = this.themes[0];

    constructor(
                private themeStorage: ThemeStorage,
                private iconRegistry: MatIconRegistry,
                sanitizer: DomSanitizer) {
      this.iconRegistry.addSvgIcon('theme-example',
                              sanitizer.bypassSecurityTrustResourceUrl(
                                  'assets/images/theme/theme-demo-icon.svg'));
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
