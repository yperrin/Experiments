import { Component, OnInit } from '@angular/core';
import { Supplier } from './supplier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Direct Connect Application';
  suppliers:Supplier[];
  columnsToDisplay: string[] = ["name"]

  ngOnInit() {
    this.suppliers = [ 
      { id : 1780, name : "Hit", hasInventory : false, hasLogin : false, hasOrderCreation : false, hasProductUpdate : false },
      { id : 1781, name : "Hit Again", hasInventory : false, hasLogin : false, hasOrderCreation : false, hasProductUpdate : false }
    ];
  
  }
}
