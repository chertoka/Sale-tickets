import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)',
    //'(document:click)': 'initKeyUp($event)'
      },
  exportAs: 'blockStyle'
})

export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Output() renderComplete = new EventEmitter();
  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number;

  constructor(private el: ElementRef) { }

  ngOnInit():void { }

  ngAfterViewInit() {
    this.activeElementIndex = 0;

    if(this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if(this.initFirst) {
        if(this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }
    } else {console.error('Не передан селектор')}

    setTimeout(() => {
      this.renderComplete.emit(true);

    })
  }

  ngOnChanges(data: SimpleChanges) {
  }

  initKeyUp(ev: KeyboardEvent): void | boolean {
    //удаляет текущий стиль
    if(ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

    if(ev.key === 'ArrowRight') {
      this.index++;
      if(this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
      }
    } else if (ev.key === 'ArrowLeft') {
      if(this.index === 0) {
        return false;
      }
      this.index--;
      if(this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
      }
    }
    this.activeElementIndex = this.index
  }

  initStyle(index: number) {
    this.index = index;
    if(this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
    }
  }

  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }

  }
