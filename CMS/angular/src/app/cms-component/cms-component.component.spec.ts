import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CmsComponentComponent} from './cms-component.component';
import {CmsServiceProxy} from '@shared/service-proxies/service-proxies';
import {HttpClientTestingModule, HttpTestingController} from '@node_modules/@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {AppSessionService} from '@shared/session/app-session.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CmsComponentComponent', () => {
    let component: CmsComponentComponent;
    let fixture: ComponentFixture<CmsComponentComponent>;
    let httpController: HttpTestingController;
    let cmsService: CmsServiceProxy;
    const fakePageId = 1;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CmsComponentComponent],
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
                        getShownLoginName: function() {
                            return 'admin';
                        }
                    },
                }
            ]
        }).compileComponents();
        cmsService = TestBed.inject(CmsServiceProxy);
        httpController = TestBed.inject(HttpTestingController);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CmsComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call GetCMSContent', () => {
        httpController.expectOne({
            method: 'GET',
            url: `/api/services/app/ContentManagerSystem/GetCMSContent?pageId=${fakePageId}`,
        });
    });
});
