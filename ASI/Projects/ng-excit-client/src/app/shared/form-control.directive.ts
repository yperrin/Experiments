import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControl]'
})
export class FormControlDirective implements OnInit {
  constructor(private el: ElementRef, private control: NgControl) { }

  ngOnInit(): void {
    (this.control.control as any).nativeElement = this.el.nativeElement;
  }
}
