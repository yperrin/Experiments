import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewBaseComponent } from '../preview-base.component';
import { DirectConnectService } from '../services/direct-connect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends PreviewBaseComponent implements OnInit, OnDestroy {
  constructor(protected directConnectService: DirectConnectService, protected route: ActivatedRoute, protected router: Router) {
    super(directConnectService, route, router);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
