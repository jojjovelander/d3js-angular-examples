import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from './api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'D3.js with Angular!';
    constructor(private route: ActivatedRoute, private apiService: ApiService) {
        console.log('Called Constructor');
        this.route.queryParams.subscribe(params => {
            console.log(params);
        });
    }

    examples = [
        {
            title: 'Pie Chart',
            route: '/pie-chart'
        },
        {
            title: 'Line Chart',
            route: '/line-chart'
        },
        {
            title: 'Multi Series Line Chart',
            route: '/multi-series'
        },
        {
            title: 'Bar Chart',
            route: '/bar-chart'
        },
        {
            title: 'Stacked Bar Chart',
            route: '/stacked-bar-chart'
        },
        {
            title: 'Brush Zoom',
            route: '/brush-zoom'
        },
        {
            title: 'Donut chart',
            route: '/donut-chart'
        },
    ];

    ngOnInit() {
        this.apiService.getTitle().subscribe((data) => {
            console.log(data);
            this.title = data.toString();
        });
    }
}
