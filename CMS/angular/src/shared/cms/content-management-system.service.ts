import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ContentManagementSystemService {

    private cmsContentAdded$ = new BehaviorSubject<boolean>(false);
    contentAdded$ = this.cmsContentAdded$.asObservable();
    constructor() {}

    setContentAddedEvent(isContentAdded: boolean) {
        this.cmsContentAdded$.next(isContentAdded);
    }
}
