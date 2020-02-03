import { DataSource } from "@angular/cdk/table";

import { CollectionViewer } from "@angular/cdk/collections";
import { EventService } from '../../shared/services/event.service';
import { Event } from "../../../model/model.event";
import { BehaviorSubject, Observable, of } from 'rxjs';


export class EventDataSource implements DataSource<Event> {

    private breakingSubject = new BehaviorSubject<Event[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    events = new Array<Event>();

    constructor(private eventService: EventService) {}

    connect(collectionViewer: CollectionViewer): Observable<Event[]> {
        return this.breakingSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.breakingSubject.complete();
        this.loadingSubject.complete();
    }

    loadBreakings() {

        this.loadingSubject.next(true);

        this.eventService.getEventsList().subscribe(
            response => 
    {
      this.events = response.map(item => 
      {
        return new Event();
      });
    });
        // .subscribe(breaking => this.breakingSubject.next(breaking));
    }    
}