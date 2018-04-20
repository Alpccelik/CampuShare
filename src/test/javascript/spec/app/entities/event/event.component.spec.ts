/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CampuShareTestModule } from '../../../test.module';
import { EventComponent } from '../../../../../../main/webapp/app/entities/event/event.component';
import { EventService } from '../../../../../../main/webapp/app/entities/event/event.service';
import { Event } from '../../../../../../main/webapp/app/entities/event/event.model';

describe('Component Tests', () => {

    describe('Event Management Component', () => {
        let comp: EventComponent;
        let fixture: ComponentFixture<EventComponent>;
        let service: EventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CampuShareTestModule],
                declarations: [EventComponent],
                providers: [
                    EventService
                ]
            })
            .overrideTemplate(EventComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Event(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.events[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
