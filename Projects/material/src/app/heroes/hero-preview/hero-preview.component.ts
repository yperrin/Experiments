import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../shared/hero.model';

@Component({
  selector: 'app-hero-preview',
  templateUrl: './hero-preview.component.html',
  styleUrls: ['./hero-preview.component.css']
})
export class HeroPreviewComponent implements OnInit {
  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
  }
}
