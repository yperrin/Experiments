import { Component, OnInit, Input } from '@angular/core';
import { PluginNodeModel } from '../../models/plugin-node.model';
import { BaristaService } from '../../services/barista.services';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-plugin-list',
  templateUrl: './plugin-list.component.html',
  styleUrls: ['./plugin-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PluginListComponent {
  @Input() pluginList: PluginNodeModel[];

  constructor(private baristaService: BaristaService) { }

  getPluginInfo(plugin: PluginNodeModel): void {
    if ((plugin.config != null) || (plugin.info != null)) {
      plugin.showDetails = !plugin.showDetails;
    } else {
      this.baristaService.retrievePluginDetails$(plugin).subscribe();
    }
  }

  getMonitorUrl(plugin: string | PluginNodeModel) {
    return this.baristaService.getMonitorUrl(plugin);
  }

  switchPluginStatus(plugin: PluginNodeModel) {
    this.baristaService.switchPluginStatus(plugin);
  }

  triggerSchedule(scheduleName: string) {
    if (scheduleName) {
      this.baristaService.triggerSchedule(scheduleName);
    }
  }
}
