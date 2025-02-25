import {
    AfterViewInit,
    Component,
    inject,
    Inject,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'
import { MatButton } from '@angular/material/button'
import { MatDivider } from '@angular/material/divider'
import { isPlatformBrowser } from '@angular/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DataLabelsPlugin from 'chartjs-plugin-datalabels'
import { ConnectionBackendService } from '../../services/connection-backend.service'
import { DataTransferService } from '../../utils/data-transfer.service'

@Component({
    selector: 'app-pie-chart',
    template: `
        @if (isBrowser) {
            <canvas
                baseChart
                [data]="pieChartData"
                [type]="pieChartType"
                [options]="pieChartOptions"
            >
            </canvas>
        }

        <mat-divider style="margin: 1em 0"></mat-divider>

        <div class="button-row">
            <button
                mat-button
                mat-raised-button
                color="primary"
                (click)="toggleLegend()"
            >
                Toggle Legend
            </button>
            <button
                mat-button
                mat-raised-button
                color="primary"
                (click)="changeLabels()"
            >
                Change Labels
            </button>
            <button
                mat-button
                mat-raised-button
                color="primary"
                (click)="addSlice()"
            >
                Add Slice
            </button>
            <button
                mat-button
                mat-raised-button
                color="primary"
                (click)="removeSlice()"
            >
                Remove Slice
            </button>
            <button
                mat-button
                mat-raised-button
                color="primary"
                (click)="changeLegendPosition()"
            >
                Change Legend Position
            </button>
        </div>
    `,
    styles: ``,
    standalone: true,
    imports: [MatDivider, MatButton, BaseChartDirective],
})
export class PieChartComponent implements AfterViewInit {
    coennection = inject(ConnectionBackendService)
    dataTransfer = inject(DataTransferService)
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined
    isBrowser: boolean

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        this.isBrowser = isPlatformBrowser(platformId) // Solo renderiza en cliente
    }

    ngAfterViewInit(): void {
        this.getContributors()
    }

    getContributors(): void {
        this.coennection
            .getContributors(
                this.dataTransfer.userName(),
                this.dataTransfer.repo(),
            )
            .subscribe({
                next: (value) => {
                    console.log(value)
                },
            })
    }

    // Pie
    public pieChartOptions: ChartConfiguration['options'] = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            datalabels: {
                formatter: (value: any, ctx: any) => {
                    if (ctx.chart.data.labels) {
                        return ctx.chart.data.labels[ctx.dataIndex]
                    }
                    return ''
                },
            },
        },
    }
    public pieChartData: ChartData<'pie', number[], string | string[]> = {
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    }
    public pieChartType: ChartType = 'pie'

    // events
    public chartClicked({
        event,
        active,
    }: {
        event: ChartEvent
        active: object[]
    }): void {
        console.log(event, active)
    }

    public chartHovered({
        event,
        active,
    }: {
        event: ChartEvent
        active: object[]
    }): void {
        console.log(event, active)
    }

    changeLabels(): void {
        const words = [
            'hen',
            'variable',
            'embryo',
            'instal',
            'pleasant',
            'physical',
            'bomber',
            'army',
            'add',
            'film',
            'conductor',
            'comfortable',
            'flourish',
            'establish',
            'circumstance',
            'chimney',
            'crack',
            'hall',
            'energy',
            'treat',
            'window',
            'shareholder',
            'division',
            'disk',
            'temptation',
            'chord',
            'left',
            'hospital',
            'beef',
            'patrol',
            'satisfied',
            'academy',
            'acceptance',
            'ivory',
            'aquarium',
            'building',
            'store',
            'replace',
            'language',
            'redeem',
            'honest',
            'intention',
            'silk',
            'opera',
            'sleep',
            'innocent',
            'ignore',
            'suite',
            'applaud',
            'funny',
        ]
        const randomWord = () => words[Math.trunc(Math.random() * words.length)]
        this.pieChartData.labels = new Array(3).map(() => randomWord())

        this.chart?.update()
    }

    addSlice(): void {
        if (this.pieChartData.labels) {
            this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3'])
        }

        this.pieChartData.datasets[0].data.push(400)

        this.chart?.update()
    }

    removeSlice(): void {
        if (this.pieChartData.labels) {
            this.pieChartData.labels.pop()
        }

        this.pieChartData.datasets[0].data.pop()

        this.chart?.update()
    }

    changeLegendPosition(): void {
        if (this.pieChartOptions?.plugins?.legend) {
            this.pieChartOptions.plugins.legend.position =
                this.pieChartOptions.plugins.legend.position === 'left'
                    ? 'top'
                    : 'left'
        }

        this.chart?.render()
    }

    toggleLegend(): void {
        if (this.pieChartOptions?.plugins?.legend) {
            this.pieChartOptions.plugins.legend.display =
                !this.pieChartOptions.plugins.legend.display
        }

        this.chart?.render()
    }
}
