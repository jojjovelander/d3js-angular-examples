import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    TOKEN = 'd8b7fa8fe26b029698b4344971ffd3d3';
    HOST = 'http://localhost:8000/webservice/rest/server.php?wstoken=';

  constructor(private httpClient: HttpClient) { }

    public getTitle() {
        return this.httpClient.get(`${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_wstemplate_hello_world`);
    }

    public getMockData() {
        return this.httpClient.get(`${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_wstemplate_get_mock_data`);
    }
}
