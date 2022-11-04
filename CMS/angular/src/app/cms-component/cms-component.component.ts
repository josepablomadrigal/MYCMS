import { Component, OnInit } from '@angular/core';
import {CmsServiceProxy, ContentManagementSystemDto} from '../../shared/service-proxies/service-proxies';

@Component({
  selector: 'app-cms-component',
  templateUrl: './cms-component.component.html',
  styleUrls: ['./cms-component.component.css']
})
export class CmsComponentComponent implements OnInit {

    currentCMS: ContentManagementSystemDto;

  constructor( private _cmsServiceProxy: CmsServiceProxy) { }

  ngOnInit(): void {
      this._cmsServiceProxy.get(1).pipe().subscribe((result: ContentManagementSystemDto) => {
          this.currentCMS = result;
          console.log(this.currentCMS);
      });
  }

}
