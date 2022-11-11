import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCmsDialogComponent } from './create-cms-dialog.component';
import { CmsServiceProxy } from '@shared/service-proxies/service-proxies';
import { HttpClientTestingModule, HttpTestingController } from '@node_modules/@angular/common/http/testing';
import { BsModalRef } from '@node_modules/ngx-bootstrap/modal';
import { AppSessionService } from '@shared/session/app-session.service';

describe('CreateCmsDialogComponent', () => {
    let component: CreateCmsDialogComponent;
    let fixture: ComponentFixture<CreateCmsDialogComponent>;
    let httpController: HttpTestingController;
    let cmsService: CmsServiceProxy;
    let bsModalSpy: jasmine.SpyObj<BsModalRef>;

    beforeEach(async () => {
        const bsModalServiceSpy = jasmine.createSpyObj('BsModalService', ['hide']);
        await TestBed.configureTestingModule({
            declarations: [CreateCmsDialogComponent],
            imports: [HttpClientTestingModule],
            providers: [
                CmsServiceProxy,
                {
                    provide: AppSessionService,
                    useValue: {
                        application: {
                            version: '',
                            releaseDate: {
                                format: function () {
                                    return '';
                                },
                            },
                        },
                        getShownLoginName: function () {
                            return 'admin';
                        }
                    },
                },
                {provide: BsModalRef, useValue: bsModalServiceSpy}
            ],
        }).compileComponents();
        bsModalSpy = TestBed.inject(BsModalRef) as jasmine.SpyObj<BsModalRef>;
        cmsService = TestBed.inject(CmsServiceProxy);
        httpController = TestBed.inject(HttpTestingController);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateCmsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
