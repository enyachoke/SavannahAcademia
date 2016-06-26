import { Injectable } from '@angular/core';
import { Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ClassRoom } from './class-room.model';
import {Config} from '../../shared/config';
import {AuthHttp} from 'angular2-jwt';
@Injectable()
export class ClassRoomService {

  private classRoomsUrl = `${Config.getBackend() }class_rooms`;  // URL to web api
  constructor(private http: AuthHttp) { }
  getAll(): Observable<ClassRoom[]> {
    return this.http.get(this.classRoomsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getOne(id: number) {
    return this.http.get(`${this.classRoomsUrl}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  // Add new ClassRoom
  private post(classRoom: ClassRoom): Observable<ClassRoom> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let payload = { class_room: classRoom };
    return this.http
      .post(this.classRoomsUrl, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  save(classRoom: ClassRoom): Observable<ClassRoom> {
    if (classRoom.id) {
      return this.put(classRoom);
    }
    return this.post(classRoom);
  }
  // Update existing ClassRoom
  private put(classRoom: ClassRoom) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.classRoomsUrl}/${classRoom.id}`;
    let payload = { class_room: classRoom };
    return this.http
      .put(url, JSON.stringify(payload), { headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
  delete(classRoom: ClassRoom) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.classRoomsUrl}/${classRoom.id}`;

    return this.http
      .delete(url, headers)
      .catch(this.handleError);
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  private extractData(res: Response) {
    let body = res.json();
    let data = body[Object.getOwnPropertyNames(body)[0]];
    return data || {};
  }

}
