import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CmsComponent } from './cms.component';
import { CmsServiceProxy } from '@shared/service-proxies/service-proxies';
import { HttpClientTestingModule, HttpTestingController } from '@node_modules/@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AppSessionService } from '@shared/session/app-session.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('CmsComponent', () => {
    let component: CmsComponent;
    let fixture: ComponentFixture<CmsComponent>;
    let httpController: HttpTestingController;
    let cmsService: CmsServiceProxy;
    let bsModalSpy: jasmine.SpyObj<BsModalService>;
    let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
    const fakePageId = 1;

    beforeEach(async () => {
        const bsModalServiceSpy = jasmine.createSpyObj('BsModalService', ['show']);
        const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
        routeSpy.snapshot = {
            paramMap: {
                get: () => null
            }
        };
        await TestBed.configureTestingModule({
            declarations: [CmsComponent],
            imports: [BrowserAnimationsModule, HttpClientTestingModule],

            providers: [
                CmsServiceProxy,
                {
                    provide: ActivatedRoute,
                    useValue: routeSpy
                },
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
                {provide: BsModalService, useValue: bsModalServiceSpy}
            ]
        }).compileComponents();
        bsModalSpy = TestBed.inject(BsModalService) as jasmine.SpyObj<BsModalService>;
        cmsService = TestBed.inject(CmsServiceProxy);
        httpController = TestBed.inject(HttpTestingController);
        activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CmsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when the component does not have a pageId in the route', () => {
        beforeEach(() => {
            activatedRouteSpy.snapshot.paramMap.get = () => null;
            fixture = TestBed.createComponent(CmsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should not call getCMSContent', () => {
            httpController.expectNone({
                method: 'GET',
                url: `/api/services/app/ContentManagerSystem/GetCMSContent?pageId=${fakePageId}`,
            });
        });

        it('should create button should be present and edit button should not be present', () => {
            const createBtn = fixture.debugElement.query(By.css('[data-testid="createBtn"]'));
            const editBtn = fixture.debugElement.query(By.css('[data-testid="editBtn"]'));
            expect(createBtn).toBeTruthy();
            expect(editBtn).toBeFalsy();
        });
    });

    describe('when the component has pageId in the route', () => {
        beforeEach(() => {
            activatedRouteSpy.snapshot.paramMap.get = () => fakePageId.toString();
            fixture = TestBed.createComponent(CmsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should call GetCMSContent', () => {
            httpController.expectOne({
                method: 'GET',
                url: `/api/services/app/ContentManagementSystem/GetCMSContent?pageId=${fakePageId}`,
            });
        });

        it('should create and edit buttons be present', () => {
            const createBtn = fixture.debugElement.query(By.css('[data-testid="createBtn"]'));
            const editBtn = fixture.debugElement.query(By.css('[data-testid="editBtn"]'));
            expect(createBtn).toBeTruthy();
            expect(editBtn).toBeTruthy();
        });

        it('should click create button call service modal show', () => {
            const createBtn = fixture.debugElement.query(By.css('[data-testid="createBtn"]')).nativeElement;
            createBtn.click();
            expect(bsModalSpy.show.calls.count()).toBe(1);
        });

        it('should click create button call service modal show', () => {
            const editBtn = fixture.debugElement.query(By.css('[data-testid="editBtn"]')).nativeElement;
            editBtn.click();
            expect(bsModalSpy.show.calls.count()).toBe(1);
        });
    });

});
