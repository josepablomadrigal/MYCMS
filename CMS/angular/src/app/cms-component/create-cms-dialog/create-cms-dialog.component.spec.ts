import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCmsDialogComponent } from './create-cms-dialog.component';
import { CmsServiceProxy } from '@shared/service-proxies/service-proxies';
import { HttpClientTestingModule, HttpTestingController } from '@node_modules/@angular/common/http/testing';
import { BsModalRef } from '@node_modules/ngx-bootstrap/modal';
import { AppSessionService } from '@shared/session/app-session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { findEl } from '@app/spec-helpers/element.spec-helper';
import { AngularEditorModule } from '@node_modules/@kolkov/angular-editor';

describe('CreateCmsDialogComponent', () => {
    let component: CreateCmsDialogComponent;
    let fixture: ComponentFixture<CreateCmsDialogComponent>;
    let httpController: HttpTestingController;
    let cmsService: CmsServiceProxy;
    let bsModalSpy: jasmine.SpyObj<BsModalRef>;

    beforeEach(async () => {
        const bsModalRefSpy = jasmine.createSpyObj('BsModalRef', ['hide']);
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, FormsModule, AngularEditorModule, ReactiveFormsModule],
            declarations: [CreateCmsDialogComponent],
            providers: [
                CmsServiceProxy,
                {provide: BsModalRef, useValue: bsModalRefSpy},
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
                }
            ]
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
        const pageNameInput = findEl(fixture, 'pageName');
        const pageContentInput = findEl(fixture, 'pageContent');

        expect(component).toBeTruthy();
        expect(pageNameInput).toBeTruthy();
        expect(pageContentInput).toBeTruthy();

    });

    it('should call Upsert', () => {
        component.save();
        httpController.expectOne({
            method: 'POST',
            url: '/api/services/app/ContentManagementSystem/Upsert'
        });
        httpController.verify();
    });


});
