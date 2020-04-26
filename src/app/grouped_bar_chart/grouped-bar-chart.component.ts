import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Color from 'd3-color';

import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import * as JsonData from '../shared/grouped_bar_chart.json';

export interface UserGradeItems {
    grade: any;
    rank: number;
    average: number;
}

export interface ChartData {
    categorie: string;
    values: RatingData[];
}

export interface RatingData {
    value: number;
    rate: string;
}

@Component({
    selector: 'app-bar-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './grouped-bar-chart.component.html',
    styleUrls: ['./grouped-bar-chart.component.css']
})

export class GroupedBarChartComponent implements OnInit {

    constructor(private route: ActivatedRoute, private apiService: ApiService) {
    }

    title = 'Grouped Bar Chart';

    private width = 960;
    private height = 960;

    private svg: any;
    private data: ChartData[];
    private colour: any;
    private categoriesNames: any;
    private rateNames: any;

    private keys: any[];
    private groupKey: string;
    private margin = {top: 10, right: 10, bottom: 20, left: 40};

    private xAxis: any;
    private yAxis: any;

    private x0: any;
    private x1: any;

    private y: any;

    ngOnInit() {
        console.log('ASDASDAJSDKAJSDKJASKDJ');
        this.data = JsonData.default as ChartData[];
        console.log(this.data);

        this.colour = this.createScale();

        this.categoriesNames = this.data.map(d => d.categorie);
        this.rateNames = this.data[0].values.map(d => d.rate);

        this.x0 = this.initX0();
        this.x1 = this.initX1();
        this.y = this.initY();
        this.xAxis = this.initXAxis();
        this.yAxis = this.initYAxis();

        this.initSvg();
        this.drawChart();
        this.createLegend();

        /*this.route.queryParams.subscribe(params => {
            console.log(params);
            this.apiService.getUserGradeItemsByCourse(params.id).subscribe(
                data => {


                }
            );
        });*/
    }

    private initX0() {
        return d3Scale.scaleBand()
            .domain(this.categoriesNames)
            .rangeRound([this.margin.left, this.width - this.margin.right])
            .paddingInner(0.1);
    }

    private initX1() {
        return d3Scale.scaleBand()
            .domain(this.rateNames)
            .rangeRound([0, this.x0.bandwidth()])
            .padding(0.05);
    }

    private initY() {
        return d3Scale.scaleLinear()
            .domain([0, d3Array.max(this.data, d => d3Array.max(d.values, key => key.value))]).nice()
            .rangeRound([this.height - this.margin.bottom, this.margin.top]);
    }

    private createScale() {
        return d3Scale.scaleOrdinal()
            .range(['#ca0020', '#f4a582', '#d5d5d5', '#92c5de', '#0571b0']);
    }

    private initXAxis() {
        return d3Axis.axisBottom(this.x0).scale(this.x0).tickSize(0);
    }

    private initYAxis() {
        return d3Axis.axisLeft(this.y).scale(this.y);
    }

    private initSvg() {
        this.svg = d3.select('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private drawChart() {

        this.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(this.xAxis);

        this.svg.append('g')
            .attr('class', 'y axis')
            .style('opacity', '0')
            .call(this.yAxis);

        this.svg.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

        const slice = this.svg.selectAll('.slice')
            .data(this.data)
            .enter().append('g')
            .attr('class', 'g')
            .attr('transform', d => 'translate(' + this.x0(d.categorie) + ', 0)' );

        slice.selectAll('rect')
            .data(d => d.values)
            .enter()
            .append('rect')
            .attr('width', this.x1.bandwidth())
            .attr('x', d => this.x1(d.rate))
            .style('fill', d => this.colour(d.rate) )
            .attr('y', d => this.y(0))
            .attr('height', d => this.height - this.y(0))
            /*.on('mouseover', d => d3.select(this).style('fill', d3Color.rgb(this.colour(d.rate)).darker(2)))
            .on('mouseout', d => d3.select(this).style('fill', this.colour(d.rate)))*/;

        slice.selectAll('rect')
            .transition()
            .delay(d => Math.random() * 1000)
            .duration(1000)
            .attr('y', d =>  this.y(d.value))
            .attr('height', d => this.height - this.y(d.value));
    }

    private createLegend() {
        const legend = this.svg.selectAll('.legend')
            .data(this.data[0].values.map(d => d.rate).reverse())
            .enter().append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')')
            .style('opacity', '0');

        legend.append('rect')
            .attr('x', this.width - 18)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', d => this.colour(d));

        legend.append('text')
            .attr('x', this.width - 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .style('text-anchor', 'end')
            .text(d => d);

        legend.transition().duration(500).delay((d, i) => 1300 + 100 * i).style('opacity', '1');
    }
}
