import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../shared/hero.model';
import { HeroService } from '../shared/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  public heroes: Hero[];
  public selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes()
    .then(
      heroes => this.heroes = heroes
    );
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
