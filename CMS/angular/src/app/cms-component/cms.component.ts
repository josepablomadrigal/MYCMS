import { Component, Injector, OnInit } from '@angular/core';
import { CmsServiceProxy, ContentManagementSystemDto } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalService } from '@node_modules/ngx-bootstrap/modal';
import { CreateCmsDialogComponent } from '@app/cms-component/create-cms-dialog/create-cms-dialog.component';
import { EditCmsDialogComponent } from '@app/cms-component/edit-cms-dialog/edit-cms-dialog.component';

@Component({
    selector: 'app-cms-component',
    templateUrl: './cms.component.html',
    styleUrls: ['./cms.component.css'],
    animations: [appModuleAnimation()],
    providers: [
        {provide: Number, useValue: 1}
    ]
})
export class CmsComponent extends AppComponentBase implements OnInit {

    pageId?: number;
    currentCMS: ContentManagementSystemDto = new ContentManagementSystemDto();
    pageName = 'Content Management System';
    pageContent = '<h1>You can edit this page</h1><p>To display your content</p>';
    isLoading: boolean;

    constructor(injector: Injector,
                private route: ActivatedRoute,
                private _cmsServiceProxy: CmsServiceProxy,
                private _modalService: BsModalService) {
        super(injector);
        this.isLoading = true;
        this.pageId = Number(this.route.snapshot.paramMap.get('pageId'));
    }

    ngOnInit(): void {
        this.getCurrentContentPage();
    }

    showCreateOrEditCMSDialog(id?: number) {
        if (!id) {
            this._modalService.show(
                CreateCmsDialogComponent,
                {
                    class: 'modal-lg',
                }
            );
        } else {
            this._modalService.show(
                EditCmsDialogComponent,
                {
                    class: 'modal-lg',
                    initialState: {
                        id: id
                    }
                }
            );
        }
    }

    private getCurrentContentPage() {
        if (this.pageId) {
            this._cmsServiceProxy
                .get(this.pageId)
                .subscribe((result: ContentManagementSystemDto) => {
                    this.currentCMS = result;
                    this.pageName = this.currentCMS.pageName;
                    this.pageContent = this.currentCMS.pageContent;
                    this.isLoading = false;
                });
        }
    }
}
