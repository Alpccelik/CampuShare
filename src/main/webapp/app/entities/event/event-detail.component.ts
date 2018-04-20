import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Event } from './event.model';
import { EventService } from './event.service';

@Component({
    selector: 'jhi-event-detail',
    templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit, OnDestroy {

    event: Event;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eventService: EventService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEvents();
    }

    load(id) {
        this.eventService.find(id)
            .subscribe((eventResponse: HttpResponse<Event>) => {
                this.event = eventResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEvents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eventListModification',
            (response) => this.load(this.event.id)
        );
    }
}
