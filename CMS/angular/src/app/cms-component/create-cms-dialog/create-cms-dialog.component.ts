import { Component } from '@angular/core';
import { EventEmitter, Injector, Output } from '@node_modules/@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CmsServiceProxy, ContentManagementSystemDto, UpsertContentManagementSystemDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from '@node_modules/ngx-bootstrap/modal';

@Component({
    selector: 'app-create-cms-dialog',
    templateUrl: './create-cms-dialog.component.html',
    styleUrls: ['./create-cms-dialog.component.css']
})
export class CreateCmsDialogComponent extends AppComponentBase  {
    @Output() onSave = new EventEmitter<any>();
    saving = false;
    cmsDto = new ContentManagementSystemDto();

    constructor(injector: Injector,
                private _cmsServiceProxy: CmsServiceProxy,
                public bsModalRef: BsModalRef) {
        super(injector);
    }

    save() {
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
