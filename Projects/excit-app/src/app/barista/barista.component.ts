import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BaristaService } from './services/barista.services';
import { PluginListComponent } from './plugin-list/plugin-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barista',
  templateUrl: './barista.component.html',
  styleUrls: ['./barista.component.css']
})
export class BaristaComponent implements OnInit, OnDestroy {
  environment = 'Production';
  subscription: Subscription;
  @ViewChild('pluginList') pluginList: PluginListComponent;

  constructor(private baristaService: BaristaService) { }

  onEnvironmentChange(environment: string): void {
    this.baristaService.setEnvironment(environment);
    this.pluginList.setData(this.baristaService.getPlugins());
  }

  ngOnInit() {
    this.pluginList.setData(this.baristaService.getPlugins());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}