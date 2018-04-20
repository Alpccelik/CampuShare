import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Event } from './event.model';
import { EventPopupService } from './event-popup.service';
import { EventService } from './event.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-event-dialog',
    templateUrl: './event-dialog.component.html'
})
export class EventDialogComponent implements OnInit {

    event: Event;
    isSaving: boolean;

    users: User[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventService: EventService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.event.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventService.update(this.event));
        } else {
            this.subscribeToSaveResponse(
                this.eventService.create(this.event));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Event>>) {
        result.subscribe((res: HttpResponse<Event>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Event) {
        this.eventManager.broadcast({ name: 'eventListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-event-popup',
    template: ''
})
export class EventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventPopupService: EventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventPopupService
                    .open(EventDialogComponent as Component, params['id']);
            } else {
                this.eventPopupService
                    .open(EventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
