import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription, Observable } from 'rxjs';

import { PluginNodeModel } from '../models/plugin-node.model';
import { BaristaService } from '../services/barista.services';

@Component({
  selector: 'plugin-list',
  templateUrl: './plugin-list.component.html',
  styleUrls: ['./plugin-list.component.css']
})
export class PluginListComponent implements OnDestroy {
  subscription: Subscription;
  pluginsDataSource = new MatTableDataSource();

  constructor(private baristaService: BaristaService) { }

  setData(data: Observable<PluginNodeModel[]>) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (data) {
      this.pluginsDataSource.data = [];
      this.subscription = data.subscribe(plugins => {
        // go through the data and remove nodeCount except for first record
        const newData = plugins;
        newData.forEach((value, index) => {
          if (index > 0 && value.name === plugins[index - 1].name) {
            value.nodeCount = 0;
          }
        });
        this.pluginsDataSource.data = newData;
      });
    } else {
      this.pluginsDataSource.data = [];
    }
  }

  triggerSchedule(plugin: PluginNodeModel, scheduleName: string) {
    if (plugin && scheduleName) {
      this.baristaService.triggerSchedule(plugin, scheduleName);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
