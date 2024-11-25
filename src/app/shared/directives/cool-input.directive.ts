import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[coolInput]'
})
export class CoolInputDirective implements OnInit {
  @Input() coolInputDefaultBgColor:string = 'white';
  @Input() coolInputFocusBgColor:string = 'orange';
  constructor(private el: ElementRef,
              private rend: Renderer2) {
  }

  private _bgColor:string = '';
  @HostBinding('style.background-color')
  get getBgColor() {
    return this._bgColor;
  }

  private _isOnFocus:boolean = false;
  @HostBinding('class.isOnFocus')
  get getIsOnFocus() {
    return this._isOnFocus;
  }

  @HostListener('focus')
  onFocus() {
    this.changeElementBgColor(this.coolInputFocusBgColor);
    this._isOnFocus = true;
  }
  @HostListener('blur')
  onBlur() {
    this.changeElementBgColor(this.coolInputDefaultBgColor);
    this._isOnFocus = false;
  }

  @HostListener('click', ['$event', '$event.target'])
  onClick(event:Event, target: HTMLElement) {

  }

  ngOnInit() {
    this.changeElementBgColor(this.coolInputDefaultBgColor);
    this.rend.setAttribute(this.el.nativeElement, 'placeholder',
      this.el.nativeElement.getAttribute('placeholder') + '*');

  }

  changeElementBgColor(color:string) {
    this._bgColor = color;
    // this.rend.setStyle(this.el.nativeElement, 'background-color', color);
  }

}
