import {async, TestBed} from '@angular/core/testing';
import {ThemePickerModule} from './theme-picker';


describe('ThemePicker', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ThemePickerModule],
    }).compileComponents();
  }));

  it('should install theme based on name', () => {
    // const fixture = TestBed.createComponent(ThemePicker);
    // const component = fixture.componentInstance;
    // const name = 'pink-bluegrey';
    // spyOn(component.styleManager, 'setStyle');
    // component.selectTheme(name);
    // expect(component.styleManager.setStyle).toHaveBeenCalled();
    // expect(component.styleManager.setStyle).toHaveBeenCalledWith('theme', `assets/${name}.css`);
  });
});