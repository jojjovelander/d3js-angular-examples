import {Attribute, Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from './api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = '';
    id = 0;
    examples = [];
    constructor(el: ElementRef, private route: ActivatedRoute,
                private apiService: ApiService) {
        apiService.userId = el.nativeElement.getAttribute('userId');
        this.route.queryParams.subscribe(params => {
            this.id = params.id;
            this.examples = [
                {
                    title: 'Pie Chart',
                    route: `/pie-chart`,
                    id: this.id
                },
                {
                    title: 'Bubble Chart',
                    route: `/bubble-chart`,
                    id: this.id
                },
                {
                    title: 'Group Bar Chart',
                    route: `/grouped-bar-chart`,
                    id: this.id
                }/*,
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
        },*/
            ];
        });
    }



    ngOnInit() {
        /*this.apiService.getTitle().subscribe((data) => {
            this.title = data.toString();
        })*/
    }
}
