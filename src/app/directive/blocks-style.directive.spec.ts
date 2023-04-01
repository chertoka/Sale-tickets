import { BlocksStyleDirective } from './blocks-style.directive';
import {ElementRef} from "@angular/core";

describe('BlocksStyleDirective', () => {
  it('should create an instance', () => {
    let el: ElementRef | any = 'string';
    const directive = new BlocksStyleDirective(el);
    expect(directive).toBeTruthy();
  });
});
