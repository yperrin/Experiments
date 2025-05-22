import { Component } from '@angular/core';
import { EnvironmentService } from '../shared/environment.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public environment$: Observable<string>;

  constructor(private environmentService: EnvironmentService) {
    this.environment$ = environmentService.environment$;
  }

  onEnvironmentChange(env: string) {
    this.environmentService.setEnvironment(env);
  }
}
