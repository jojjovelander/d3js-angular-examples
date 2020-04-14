import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Attribute, ElementRef, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { LineChartComponent } from './01_line_chart/line-chart.component';
import { MultiSeriesComponent } from './02_multi_series_line_chart/multi-series.component';
import { BarChartComponent } from './03_bar_chart/bar-chart.component';
import { StackedBarChartComponent } from './04_stacked_bar_chart/stacked-bar-chart.component';
import { BrushZoomComponent } from './05_brush_zoom/brush-zoom.component';
import { PieChartComponent } from './06_pie_chart/pie-chart.component';
import { DonutChartComponent } from './07_donut_chart/donut-chart.component';
import {HttpClientModule} from '@angular/common/http';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import {ApiService} from './api.service';

const appRoutes: Routes = [
    { path: 'line-chart', component: LineChartComponent },
    { path: 'multi-series', component: MultiSeriesComponent },
    { path: 'bar-chart', component: BarChartComponent },
    { path: 'stacked-bar-chart', component: StackedBarChartComponent },
    { path: 'brush-zoom', component: BrushZoomComponent },
    { path: 'pie-chart', component: PieChartComponent },
    { path: 'bubble-chart', component: BubbleChartComponent },
    { path: 'donut-chart', component: DonutChartComponent },
    { path: '**', component: BubbleChartComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        LineChartComponent,
        MultiSeriesComponent,
        BarChartComponent,
        StackedBarChartComponent,
        BrushZoomComponent,
        PieChartComponent,
        BubbleChartComponent,
        DonutChartComponent,
        BubbleChartComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        MatMenuModule,
        MatSidenavModule,
        HttpClientModule
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
