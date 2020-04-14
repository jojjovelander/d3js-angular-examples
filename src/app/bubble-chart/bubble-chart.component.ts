import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Hierarchy from 'd3-hierarchy';
import * as d3Format from 'd3-format';
/*import * as JsonData from '../shared/bubble_data.json';*/
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import {v4 as uuid} from 'uuid';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';

export interface BubbleChartData {
    eventname: string;
    component: string;
    count: number;
}

@Component({
    selector: 'app-bubble-chart',
    templateUrl: './bubble-chart.component.html',
    styleUrls: ['./bubble-chart.component.css']
})

export class BubbleChartComponent implements OnInit {

    title = 'Bubble Chart';

    private width = 452;
    private height = 452;

    private root: any;
    private svg: any;
    private data: BubbleChartData[];
    private colour: any;
    private format: any;

    constructor(private route: ActivatedRoute, private apiService: ApiService) {
    }

    ngOnInit() {

        this.route.queryParams.subscribe(params => {
            console.log(params);
            this.apiService.getBubbleData(params.id).subscribe(
                data => {
                    this.data = JSON.parse(data.toString()) as BubbleChartData[];
                    this.root = this.pack(this.data);
                    this.initSvg();
                    this.colour = this.createScale();
                    this.format = d3Format.format(',d');
                    this.drawChart();
                }
            );
        });
    }

    private pack(data: any[]) {
        return d3Hierarchy.pack()
            .size([this.width - 2, this.height - 2])
            .padding(3)
            (d3Hierarchy.hierarchy({children: this.data as BubbleChartData[]}).sum(d => {
                let test: BubbleChartData;
                test = d as unknown as BubbleChartData;
                console.log(d); return test.count;
            }));
    }

    private initSvg() {
        this.svg = d3.select('svg')
            .append('g')
            .attr('font-size', 10)
            .attr('font-family', 'sans-serif')
            .attr('text-anchor', 'middle');
    }

    private createScale() {
        return d3Scale.scaleOrdinal()
            .domain(this.data.map(d => d.component))
            .range(d3ScaleChromatic.schemeCategory10);
    }

    private drawChart() {
        const leaf = this.svg.selectAll('g')
            .data(this.root.leaves())
            .join('g')
            .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`);

        leaf.append('circle')
            .attr('id', d => (d.leafUid = 'leaf_' + uuid()))
            .attr('r', d => d.r)
            .attr('fill-opacity', 0.7)
            .attr('fill', d => {
                console.log(d.data.component);
                return this.colour(d.data.component);
            });

        leaf.append('clipPath')
            .attr('id', d => (d.clipUid = 'clip_' + uuid()))
            .append('use')
            .attr('href', d => `#${d.leafUid}`);

        leaf.append('text')
            .attr('clip-path', d => `url(#${d.clipUid})`)
            .selectAll('tspan')
            .data(d => d.data.eventname.split(/(?=[A-Z][a-z])|\s+/g))
            .join('tspan')
            .attr('x', 0)
            .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`
            )
            .text(d => d);

        leaf.append('title')
            .text(d => `${d.data.eventname === undefined ? '' : `${d.data.eventname}`} ${this.format(d.data.count)}`);

        return this.svg.node();
    }
}
