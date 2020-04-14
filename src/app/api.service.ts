import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    TOKEN = 'd8b7fa8fe26b029698b4344971ffd3d3';
    HOST = 'http://localhost:8000/webservice/rest/server.php?wstoken=';
    private _userId: string;

    get userId() {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

  constructor(private httpClient: HttpClient) { }

    public getTitle() {
        return this.httpClient.get(`${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_wstemplate_hello_world`);
    }

    public getMockData(courseId: number) {
        const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_wstemplate_get_mock_data&courseid=${courseId}&userid=${this.userId}`;
        console.log(url);
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(url);
    }

    public getBubbleData(courseId: number) {
        const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_wstemplate_get_bubble_data&courseid=${courseId}&userid=${this.userId}`;
            console.log(url);
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(`${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_wstemplate_get_bubble_data&courseid=${courseId}&userid=${this.userId}`);
    }
}
