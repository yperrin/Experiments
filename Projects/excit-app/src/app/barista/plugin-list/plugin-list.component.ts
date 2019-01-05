import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription, Observable } from 'rxjs';

import { PluginNodeModel } from '../models/plugin-node.model';

@Component({
  selector: 'plugin-list',
  templateUrl: './plugin-list.component.html',
  styleUrls: ['./plugin-list.component.css']
})
export class PluginListComponent implements OnDestroy {
  subscription: Subscription;
  pluginsDataSource = new MatTableDataSource();
  
  constructor() { }

  setData(data: Observable<PluginNodeModel[]>) {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = data.subscribe(plugins => {
      //go through the data and remove nodeCount except for first record
      let data = plugins;
      data.forEach((value, index) => {
        if (index > 0 && value.name == plugins[index-1].name) value.nodeCount = 0;
      });
      this.pluginsDataSource.data = plugins;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
