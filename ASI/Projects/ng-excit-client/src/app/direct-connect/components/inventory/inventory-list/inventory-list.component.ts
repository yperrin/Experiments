import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { InventoryOutputModel } from '../../../models/output/inventory/inventory-ouput.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  @Input() inventoryOutput: InventoryOutputModel;

  constructor() { }

  ngOnInit(): void {
  }
}