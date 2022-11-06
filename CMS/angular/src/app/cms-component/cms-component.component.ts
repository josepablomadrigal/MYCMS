import {Component, Injector, OnInit} from '@angular/core';
import {CmsServiceProxy, ContentManagementSystemDto} from '@shared/service-proxies/service-proxies';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {ActivatedRoute} from '@angular/router';
import {AppComponentBase} from '@shared/app-component-base';

@Component({
    selector: 'app-cms-component',
    templateUrl: './cms-component.component.html',
    styleUrls: ['./cms-component.component.css'],
    animations: [appModuleAnimation()],
    providers: [
        {provide: Number, useValue: 1}
    ]
})
export class CmsComponentComponent extends AppComponentBase implements OnInit {

    pageId: number;
    currentCMS: ContentManagementSystemDto = new ContentManagementSystemDto();
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
                this.isLoading = false;
            });
    }
}
