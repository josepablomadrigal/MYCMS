import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCmsDialogComponent } from './edit-cms-dialog.component';
import { HttpClientTestingModule, HttpTestingController } from '@node_modules/@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@node_modules/@angular/forms';
import { CmsServiceProxy, ContentManagementSystemDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from '@node_modules/ngx-bootstrap/modal';
import { AppSessionService } from '@shared/session/app-session.service';
import * as moment from 'moment';
import { findEl } from '@app/spec-helpers/element.spec-helper';
import { AngularEditorModule } from '@node_modules/@kolkov/angular-editor';

describe('EditCmsDialogComponent', () => {
    let component: EditCmsDialogComponent;
    let fixture: ComponentFixture<EditCmsDialogComponent>;
    let httpController: HttpTestingController;
    let cmsService: CmsServiceProxy;
    let bsModalSpy: jasmine.SpyObj<BsModalRef>;

    beforeEach(async () => {
        const bsModalRefSpy = jasmine.createSpyObj('BsModalRef', ['hide']);
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, FormsModule, AngularEditorModule, ReactiveFormsModule],
            declarations: [EditCmsDialogComponent],
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
        fixture = TestBed.createComponent(EditCmsDialogComponent);
        component = fixture.debugElement.componentInstance;
        component.currentCms = new ContentManagementSystemDto({
            id: 1,
            pageName: 'test',
            pageContent: 'test',
            creationTime: moment(),
            lastModificationTime: undefined,
            isDeleted: false,
            deleterUserId: undefined,
            deletionTime: undefined
        });
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
        component.edit();
        httpController.expectOne({
            method: 'POST',
            url: '/api/services/app/ContentManagementSystem/Upsert'
        });
        httpController.verify();
    });
});
