import {
    Component,
    inject,
    Inject,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'
import { MatButton } from '@angular/material/button'
import { isPlatformBrowser } from '@angular/common'
import { DataTransferService } from '../../utils/data-transfer.service'

@Component({
    selector: 'app-dynamic-chart',
    template: `
        @if (isBrowser) {
            <canvas
                baseChart
                [data]="barChartData"
                [options]="barChartOptions"
                [type]="barChartType"
                (chartHover)="chartHovered($event)"
                (chartClick)="chartClicked($event)"
            >
            </canvas>
            <button mat-button mat-raised-button color="primary">Update</button>
        }
    `,
    styles: ``,
    standalone: true,
    imports: [MatButton, BaseChartDirective],
})
export default class DynamicChartComponent {
    dataSet = inject(DataTransferService)
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined
    isBrowser: boolean
    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId)
    }

    public barChartOptions: ChartConfiguration['options'] = {
        elements: {
            line: {
                tension: 0.4,
            },
        },
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            x: this.dataSet.xDynamic(),
            y: {
                min: this.dataSet.yDynamic(),
            },
        },
        plugins: {
            legend: { display: true },
        },
    }
    public barChartLabels: string[] = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
    ]
    public barChartType: ChartType = 'bar'

    public barChartData: ChartData<'bar'> = {
        labels: this.barChartLabels,
        datasets: [
            { data: [], label: 'Commit Activity' },
            { data: [], label: 'Series B' },
        ],
    }

    private updateChart(commitsPerDay: Record<string, number>) {
        this.barChartLabels = Object.keys(commitsPerDay)
        this.barChartData = {
            labels: this.barChartLabels,
            datasets: [
                {
                    data: Object.values(commitsPerDay),
                    label: 'Commits per Day',
                },
            ],
        }
        this.chart?.update()
    }

    // events
    public chartClicked({
        event,
        active,
    }: {
        event?: ChartEvent
        active?: object[]
    }): void {
        console.log(event, active)
    }

    public chartHovered({
        event,
        active,
    }: {
        event?: ChartEvent
        active?: object[]
    }): void {
        console.log(event, active)
    }

    public randomize(): void {
        this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar'
    }
}
