import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayService } from './services/play.service';
import { Observable, Subscription } from 'rxjs';
import { PlayViewModel } from './models/playViewModel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {
  vm$: Observable<PlayViewModel>;
  form: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private playService: PlayService, private fb: FormBuilder) {
    this.vm$ = playService.vm$;

    this.form = this.fb.group({
      first: [null],
      second: ['', [Validators.required]],
    });
    this.subscriptions.push(this.vm$.subscribe(playModel => {
      this.form.reset(playModel.form);
    }));
  }

  ngOnInit() {
    this.playService.init$().subscribe(value => {
      console.log('Component subscribe');
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
