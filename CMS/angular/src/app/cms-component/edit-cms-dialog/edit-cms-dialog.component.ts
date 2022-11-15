import { Component, OnInit } from '@angular/core';
import { EventEmitter, Injector, Output } from '@node_modules/@angular/core';
import { CmsServiceProxy, ContentManagementSystemDto, UpsertContentManagementSystemDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalRef } from '@node_modules/ngx-bootstrap/modal';

@Component({
    selector: 'app-edit-cms-dialog',
    templateUrl: './edit-cms-dialog.component.html',
    styleUrls: ['./edit-cms-dialog.component.css']
})
export class EditCmsDialogComponent extends AppComponentBase implements OnInit {
    @Output() onSave = new EventEmitter<any>();
    saving = false;
    currentCms: ContentManagementSystemDto;
    cmsDto = new ContentManagementSystemDto();

    constructor(injector: Injector,
                private _cmsServiceProxy: CmsServiceProxy,
                public bsModalRef: BsModalRef) {
        super(injector);
    }

    ngOnInit(): void {
        this.cmsDto = this.currentCms;
    }

    edit() {
        const upsertCMS = new UpsertContentManagementSystemDto();
        upsertCMS.init(this.cmsDto);
        this._cmsServiceProxy.upsert(upsertCMS).subscribe(() => {
                this.notify.info(this.l('Saved Successfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            },
            () => {
                this.saving = false;
            }
        );
    }
}
