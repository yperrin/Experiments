import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewBaseComponent } from '../preview-base.component';
import { DirectConnectService } from '../services/direct-connect.service';
import { SupplierConfig } from '../models/config/supplierConfig.model';
import { InventoryListComponent } from './inventory-list/inventory-list.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent extends PreviewBaseComponent implements OnInit, OnDestroy {
  productJson: string;
  inventoryOutput: any;
  @ViewChild('inventoryList') inventoryList: InventoryListComponent;

  constructor(protected directConnectService: DirectConnectService, protected route: ActivatedRoute, protected router: Router) {
    super(directConnectService, route, router);
   }

  ngOnInit() {
    super.ngOnInit();
  }

  onConfigLoaded() {
    super.onConfigLoaded();
    this.productJson = InventoryComponent.getProduct(this.supplierConfig.id);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  callInventory() {
    this.inventoryList.loadData();
  }

  private static getProduct(companyId: number): string {
    switch (companyId) {
      case 9207: //ASI
        return '{"Number":"Anything"}';
      case 9529: //ASI
        return '{"Number":"Anything"}';
      case 733729: //135Promos.com
        return '{"Number":"1090"}';
      case 103: //AAA Innovations
        return '{"Number":"720"}';
      case 143: //Aakron
        return '{"Number":"55122"}';
      case 635921: //AJMInternational
        return '{"Number":"1A260"}';
      case 264: //Alexander Mfg Co
        return '{"Number":"1914"}';
      case 276: //All In One
        return '{"Number":"AiO-SHARK"}';
      case 6280009: //Alphabroder
        return '{"Number":"G200","SKU":[{"SKU":"B11107006"}]}';
      case 1325366: //Alphabroder canada
        return '{"Number":"G200","SKU":[{"SKU":"B11107006"}]}';
      case 294: //Alpha Shirt Co
        return '{"Number":"G200","SKU":[{"SKU":"B11107006"}]}';
      case 296: //Alpi
        return '{"Number":"26633"}';
      case 307: //American Ad Bag
        return '{"Number":"WG131015"}';
      case 347: //AmericannaCo
        return '{"Number":"CS-46R"}';
      case 7496: //A P Specialties
        return '{"Number":"CPP-3145"}';
      case 7758901: //Ariel Premium Supply CA  
        return '{"Number":"LED-MH19"}';
      case 397: //Ariel Premium Supply
        return '{"Number":"EOS-LT15"}';
      case 424: //Ash City USA
        return '{"Number":"G200","SKU":[{"SKU":"B11107006"}]}';
      case 134: //A Z X Sport America
      case 944054: //A Z X Sport Canada
        return '{"Number":"BGFDS1618-SG"}';
      case 512: //Bag Makers
        return '{"Number":"341618"}';
      case 548: //Bay State Specialty Co
        return '{"Number":"J130SK"}';
      case 8450: //Beacon Promotions
        return '{"Number":"J601"}';
      case 593: //Bic
        return '{"Number":"TS"}';
      case 948817: //Bic Norwood
        return '{"Number":"TS"}';
      case 2483057: //Bic Canada
        return '{"Number":"TS"}';
      case 2483033: //Bic Norwood Canada
        return '{"Number":"TS"}';
      case 690: //Budgetcard Inc
        return '{"Number":"CCB-301"}';
      case 3615: //Bic Triumph
        return '{"Number":"6201"}';
      case 633: //Bodek and Rhodes
        return '{"Number":"G200","SKU":[{"SKU":"B11107006"}]}';
      case 679: //Broder Bros Co
        return '{"Number":"G200","SKU":[{"SKU":"B11107006"}]}';
      case 780: //Cap America
        return '{"Number":"i5020"}';
      case 843: //Chameleon Like Inc
        return '{"Number":"KCVR-IP"}';
      case 850: //Charles River Apparel
        return '{"Number":"9278"}';
      case 975: //Continental Plastic Card Co
        return '{"Number":"CM1201"}';
      case 730: //Custom Plastic Specialties 
        return '{"Number":"0663"}';
      case 898597: //Custom Plastic Specialties CA
        return '{"Number":"0658"}';
      case 1060: //Crown Products
        return '{"Number":"QUASAR"}';
      case 7649: //Cutter & Buck
        return '{"Number":"BCW02056"}';
      case 6680651: //Cutter & Buck CA
        return '{"Number":"BCS01432"}';
      case 8581: //Debco US
        return '{"Number":"F5784"}';
      case 785433: //Debco Canada
        return '{"Number":"DA4739"}';
      case 515983: //Dollar Days
        return '{\"SKU\":[{\"SKU\":\"662979\"}]}';
      case 1300: //Edwards Garments
        return '{"Number":"1978"}';
      case 1451729: //ESP Promo Canada
        return '{"Number":"PGG219"}';
      case 1362: //Etching Industries
        return '{"Number":"OPS992-G"}';
      case 6989411: //Etching Wines US
        return '{"Number":"EWS7501"}';
      case 7005810: //Etching Wines Canada
        return '{"Number":"EWS7550"}';
      case 1371: //Evans Manufacturing
        return '{"Number":"7105"}';
      case 5090947: //Evans Manufacturing Canada
        return '{"Number":"7105"}';
      case 1265: //ETS Express
        return '{"Number":"588"}';
      case 1440: //Fey Promo
        return '{"Number":"8095"}';
      case 6257822: //Fey Mi Line
        return '{"Number":"Mi8819"}';
      case 3019: //Fey Reflectix
        return '{"Number":"RF723"}';
      case 2304: //Magna-Tel Inc(Fey)
        return '{"Number":"MAGNET-22113"}';
      case 1409: //FIEL-Fairdeal
        return '{"Number":"BLCL308"}';
      case 1536: //Galaxy Balloons Inc
        return '{"Number":"FMM-TTB"}';
      case 1551: //Garyline
        return '{"Number":"MXB25H"}';
      case 1531: //Gempire
        return '{"SKU":[{"SKU":"COIN-STAND-Antique_brass"}]}';
      case 1560: //Gemline
        return '{"Number":"1241"}';
      case 818287: //GemLine Canada
        return '{"Number":"1241"}';
      case 1584: //Gill Line
        return '{"Number":"CPN-7011809"}';
      case 9902: //GMG Pen
        return '{"Number":"7826"}';
      case 1608: //Gold Bond
        return '{"Number":"CCHEV-FD"}';
      case 2504: //Goldstar 
        return '{"Number":"10585A"}';
      case 4782086: //Goldstar Canada
        return '{"Number":"PHG"}';
      case 1633: //Gordon Sinclair 
        return '{"Number":"BGL40"}';
      case 7787837: //Gordon Sinclair Canada
        return '{"Number":"BOX3VS24L"}';
      case 317: //HandStands
        return '{"Number":"03213"}';
      case 1755: //Heritage
        return '{"SKU":[{"SKU":"00821780003735"}]}';
      case 746: //High caliber
        return '{"Number":"A4060"}';
      case 1780: //hit promo
        return '{"Number":"3126"}';
      case 7762366: //hit promo
        return '{"Number":"3126"}';
      case 1808: //Hub Pen Co
        return '{"Number":"412"}';
      case 5582954: //Hub Pen Canada
        return '{"Number":"412"}';
      case 8339: //iClick Inc
        return '{"Number":"Kona-4GB","SKU":[{"SKU":"Kona-4GB"}]}';
      case 1843: //Illini
        return '{"Number":"5400"}';
      case 1868: //Imprints Wholesale Inc
        return '{"Number":"G200","SKU":[{"SKU":"B11107006"}]}';
      case 1892: //Innovation Line
        return '{"Number":"7603-1"}';
      case 7951189: //Innovation Line CA
        return '{"Number":"1220"}';
      case 1564: //Jetline
        return '{"Number":"LB301"}';
      case 8015831: //Jetline CA
        return '{"Number":"P363"}';
      case 2018: //K & R New York US
        return '{"Number":"L838BK"}';
      case 2140: //Lanco
        return '{"Number":"TAG1300-E"}';
      case 2144: //Larlu
        return '{"Number":"86549471"}';
      case 2180: //Leeds(PNCA)
        return '{"Number":"1624-59"}';
      case 601203: //Leeds CA (PNCA)
        return '{"Number":"1624-59"}';
      case 3402: //Leeds(Bullet)
        return '{"Number":"SM-9983"}';
      case 5804464: //Leeds(Bullet CA)
        return '{"Number":"SM-9983"}';
      case 6266925: //Leeds(Trimark)
        return '{"Number":"TM99540"}';
      case 9908: //Leeds(Trimark CA)
        return '{"Number":"TM99540"}';
      case 2240: //Logomark
        return '{"Number":"GR4700"}';
      case 491276: //magnet
        return '{"Number":"CL02"}';
      case 6209398: //magnet CA
        return '{"Number":"CL02"}';
      case 2726: //magnet perfect line
        return '{"Number":"CL02"}';
      case 814: //magnet Castelli
        return '{"Number":"CL02"}';
      case 2325: //MapleRidgeFarmsInc
        return '{"Number":"W2107"}';
      case 2349: //Martin Company 
        return '{"Number":"AWS6823"}';
      case 8832: //Mi Pen US
        return '{"Number":"PF1682-B"}';
      case 4782034: //Mi Pen Canada
        return '{"Number":"P175 B"}';
      case 2458: //Moderne Glass
        return '{"Number":"1356E"}';
      case 2491: //NES Clothing Co
        return '{"Number":"G200","SKU":[{"SKU":"B11107006"}]}';
      case 10441: //NuPromoInc
        return '{"Number":"BH0201"}';
      case 8980: //Omni Apparel Inc.
        return '{"Number":"Z6525"}';
      case 811196: //OrigAudio
        return '{"Number":"PIELADIUM"}';
      case 2624: //Otto Intl Inc
        return '{"Number":"803-401"}';
      case 2699: //Peerless Umbrella
        return '{"Number":"2359"}';
      case 10218: //Perry Ellis
        return '{"Number":"CGH145"}';
      case 1208: //Pictureframes.net US
        return '{"Number":"PFN2901"}';
      case 6205430: //Pictureframes.net Canada
        return '{"Number":"PFN4711"}';
      case 3039107: //Prestige Glass US
        return '{"Number":"AQS5432-A"}';
      case 2856: //Prestige Glass Canada
        return '{"Number":"AQS5433-A"}';
      case 2866: //Prime Line (R) (USA)
        return '{"Number":"PL-8807"}';
      case 633244: //Prime Line (R) (Canada)
        return '{"Number":"PL-1281"}';
      case 2941: //Quake City Caps
        return '{"Number":"1100"}';
      case 2957: //Quikey Manufacturing
        return '{"Number":"9040-2"}';
      case 3061: //Ritter Pen US
        return '{"Number":"RTR02250"}';
      case 6416778: //Ritter Pen Canada
        return '{"Number":"RTR08603"}';
      case 2632: //RS Owens US
        return '{"Number":"3834.39"}';
      case 6004250: //RS Owens Canada
        return '{"Number":"8328.19"}';
      case 3141: //SanMar
        return '{"Number":"K420", "Attributes":{"Colors":{"Values":[{"Code":"BLK","Name":"Black-IronGray-White","VendorCode":"Black"}]}, "Sizes":{"Values":[{"Code":"S","Name":"S","VendorCode":"S"}]}},"SKU": [{"SKU": "29223" }, {"SKU": "29223", "Values": [{"Code": "SIZE", "Name": "S" },{"Code": "PRCL","Name": "Black-IronGray-White","VendorCode":"Black"} ]}],}';
      case 3264: //Snugz
        return '{"Number":"ZAV10O"}';
      case 3201: //Seville Gear
        return '{"Number":"EP-310"}';
      case 3290: //SouthernPlus
        return '{"Number":"7014"}';
      case 3315: //Spector & Co.
        return '{"Number":"G801"}';
      case 749158: //Spector & Co. CA
        return '{"Number":"G8117"}';
      case 3351: //Starline
        return '{"Number":"EL66"}';
      case 562670: //Starline CA
        return '{"Number":"EL66"}';
      case 6681060: //StormCreek
        return '{"Number":"6565"}';
      case 3112: //SSActivewear
        return '{"SKU":[{"SKU":"B00760004"}]}';
      case 7730: //St Regis Crystal
        return '{"Number":"OPT103"}';
      case 11243: //St Regis Crystal Canada
        return '{"Number":"OPS993-S"}';
      case 3426: //Sweda Company LLC
        return '{"Number":"MP3555"}';
      case 8988: //Tekweld
        return '{"Number":"MEL-000"}';
      case 3589: //Tradenet Publishing
        return '{"Number":"4303P"}';
      case 3608: //Tri-Mountain
        return '{"Number":"770"}';
      case 3716: //Vantage Apparel
        return '{"Number":"WNS3K445"}';
      case 904639: //Vantage Apparel CA
        return '{"Number":"WNS3K445"}';
      case 3747: //Vitronic Promotional Group
        return '{"Number":"F702"}';
      case 4782010: //Waterleaf Studios US
        return '{"Number":"WLC-21M-S1"}';
      case 4782025: //Waterleaf Studios Canada
        return '{"Number":"WLC-21M-S1"}';
      case 2323: //WOWLine
        return '{"Number":"S70784X"}';
      case 8775: //Zipline
        return '{"Number":"ZIP1424"}';
    }
    return '';
  }
}
