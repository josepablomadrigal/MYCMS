import {Component, Injector, OnInit} from '@angular/core';
import {CmsServiceProxy, ContentManagementSystemDto} from '@shared/service-proxies/service-proxies';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {ActivatedRoute} from '@angular/router';
import {AppComponentBase} from '@shared/app-component-base';

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

    pageId: number;
    currentCMS: ContentManagementSystemDto = new ContentManagementSystemDto();
    pageName = 'Content Management System';
    pageContent = '<h1>You can edit this page</h1><p>To display your content</p>';
    isLoading: boolean;

    constructor(injector: Injector, private route: ActivatedRoute, private _cmsServiceProxy: CmsServiceProxy) {
        super(injector);
        this.isLoading = true;
        this.pageId = Number(this.route.snapshot.paramMap.get('pageId'));
    }

    ngOnInit(): void {
        this.getCurrentContentPage();
    }

    private getCurrentContentPage() {
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
