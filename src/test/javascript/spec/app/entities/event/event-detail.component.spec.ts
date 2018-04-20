/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CampuShareTestModule } from '../../../test.module';
import { EventDetailComponent } from '../../../../../../main/webapp/app/entities/event/event-detail.component';
import { EventService } from '../../../../../../main/webapp/app/entities/event/event.service';
import { Event } from '../../../../../../main/webapp/app/entities/event/event.model';

describe('Component Tests', () => {

    describe('Event Management Detail Component', () => {
        let comp: EventDetailComponent;
        let fixture: ComponentFixture<EventDetailComponent>;
        let service: EventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CampuShareTestModule],
                declarations: [EventDetailComponent],
                providers: [
                    EventService
                ]
            })
            .overrideTemplate(EventDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Event(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.event).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
