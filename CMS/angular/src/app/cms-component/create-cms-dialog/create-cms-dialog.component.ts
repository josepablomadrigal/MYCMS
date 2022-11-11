import { Component, OnInit } from '@angular/core';
import { EventEmitter, Injector, Output } from '@node_modules/@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CmsServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from '@node_modules/ngx-bootstrap/modal';

@Component({
    selector: 'app-create-cms-dialog',
    templateUrl: './create-cms-dialog.component.html',
    styleUrls: ['./create-cms-dialog.component.css']
})
export class CreateCmsDialogComponent extends AppComponentBase implements OnInit {

    @Output() onSave = new EventEmitter<any>();

    constructor(injector: Injector,
                private _cmsServiceProxy: CmsServiceProxy,
                public bsModalRef: BsModalRef) {
        super(injector);
    }


    ngOnInit(): void {
    }

}
