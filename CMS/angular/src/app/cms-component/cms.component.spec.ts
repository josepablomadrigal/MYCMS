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
    const fakePageId = 1;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('BsModalService', ['show']);
        await TestBed.configureTestingModule({
            declarations: [CmsComponent],
            imports: [BrowserAnimationsModule, HttpClientTestingModule],

            providers: [
                CmsServiceProxy,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: (id: number) => {
                                    return 1;
                                }
                            }
                        }
                    }
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
                {provide: BsModalService, useValue: spy}
            ]
        }).compileComponents();
        bsModalSpy = TestBed.inject(BsModalService) as jasmine.SpyObj<BsModalService>;
        cmsService = TestBed.inject(CmsServiceProxy);
        httpController = TestBed.inject(HttpTestingController);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CmsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when the component has pageOd ', () => {
        it('should call GetCMSContent', () => {
            httpController.expectOne({
                method: 'GET',
                url: `/api/services/app/ContentManagerSystem/GetCMSContent?pageId=${fakePageId}`,
            });
        });

        it('Elements should be present', () => {
            const createBtn = fixture.debugElement.query(By.css('[data-testid="createBtn"]'));
            expect(createBtn).toBeTruthy();
            expect(true).toBeTruthy();
        });
        it('should click create button call service modal show', () => {
            const createBtn = fixture.debugElement.query(By.css('[data-testid="createBtn"]')).nativeElement;
            createBtn.click();
            expect(bsModalSpy.show.calls.count()).toBe(1);
        });
    });

});
