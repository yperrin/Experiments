import { Pipe, PipeTransform } from '@angular/core';
/*
 * Create a short name for a barista plugin
 * 
 * Usage:
 *   value | baristaShortName
 * Example:
 *   {{ ASI.Barista.Plugins.Excit.InventoryReport.Plugin | baristaShortName }}
 *   formats to: InventoryReport
*/
@Pipe({name: 'baristaShortName'})
export class BaristaShortNamePipe implements PipeTransform {
  transform(pluginName: string): string {
    let shortName = pluginName;
    if (pluginName && pluginName.indexOf('.') > 0) {
      const parts = pluginName.split('.');
      shortName = parts[parts.length - 2];
    }
    return shortName;
  }
}