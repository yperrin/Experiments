import { Component, OnInit } from '@angular/core';
import { HeroService } from '../shared/hero.service';
import { Hero } from '../shared/hero.model';

@Component({
  selector: 'app-hero-dashboard',
  templateUrl: './hero-dashboard.component.html',
  styleUrls: ['./hero-dashboard.component.css']
})
export class HeroDashboardComponent implements OnInit {
  public heroes: Hero[];
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes()
    .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
