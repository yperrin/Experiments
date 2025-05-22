import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectConnectService } from '../services/direct-connect.service';
import { Observable } from 'rxjs';
import { SupplierConfigModel } from '../models/config/supplierConfig.model';
import { switchMap } from 'rxjs/operators';

export class BaseDetailComponent implements OnInit {
    supplierConfig$: Observable<SupplierConfigModel>;

    constructor(
        protected directConnectService: DirectConnectService,
        protected route: ActivatedRoute,
        protected router: Router) { }

    ngOnInit() {
        this.supplierConfig$ = this.route.params.pipe(
            switchMap(params => {
                const id = +params['id']; // (+) converts string 'id' to a number
                const name = params['name'];
                return this.directConnectService.getConfig$(id, name);
            })
        );
    }

    close() {
        this.router.navigate(['']);
    }
}
