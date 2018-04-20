import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Event } from './event.model';
import { EventService } from './event.service';

@Injectable()
export class EventPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private eventService: EventService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.eventService.find(id)
                    .subscribe((eventResponse: HttpResponse<Event>) => {
                        const event: Event = eventResponse.body;
                        if (event.startDate) {
                            event.startDate = {
                                year: event.startDate.getFullYear(),
                                month: event.startDate.getMonth() + 1,
                                day: event.startDate.getDate()
                            };
                        }
                        if (event.endDate) {
                            event.endDate = {
                                year: event.endDate.getFullYear(),
                                month: event.endDate.getMonth() + 1,
                                day: event.endDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.eventModalRef(component, event);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.eventModalRef(component, new Event());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    eventModalRef(component: Component, event: Event): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.event = event;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
