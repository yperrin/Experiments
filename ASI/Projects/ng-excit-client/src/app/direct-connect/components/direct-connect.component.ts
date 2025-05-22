import { Component, OnInit, OnDestroy } from '@angular/core';
import { DirectConnectService } from '../services/direct-connect.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { Action } from '../models/action.model';

@Component({
  selector: 'app-direct-connect',
  templateUrl: './direct-connect.component.html',
  styleUrls: ['./direct-connect.component.css']
})
export class DirectConnectComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  suppliers$ = this.directConnectService.supplierList$;
  searchText$: Observable<string>;
  search = new FormControl('');
  detailsVisible = false;

  constructor(private directConnectService: DirectConnectService, private router: Router) {
  }

  ngOnInit() {
    this.directConnectService.init();
    this.searchText$ = this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );
    this.subscriptions.push(this.suppliers$.subscribe(() => {
      if ((this.search as any).nativeElement) {
        (this.search as any).nativeElement.focus();
      }
    }));
    this.subscriptions.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
      )
        .subscribe((event: NavigationStart) => {
          if (event.url === '/') {
            this.detailsVisible = false;
          }
        }
        )
    );
  }

  showPreview(action: Action) {
    this.router.navigate([action.type, action.companyId, action.companyName]);
    this.detailsVisible = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(substriction => substriction.unsubscribe());
  }
}
