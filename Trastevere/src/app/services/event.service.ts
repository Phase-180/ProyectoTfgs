import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class EventService {

    constructor(private http: HttpClient) {}

    getEvents() {
        return this.http.get('showcase/resources/data/calendarevents.json')
                    .toPromise()
                    .then(res => <any[]> res.json().data )
                    .then(data => { return data; });
    }
}