import { Component } from '@angular/core'
import DynamicChartComponent from '../../../components/charts/dynamic-chart.component'

@Component({
    selector: 'app-commit',
    standalone: true,
    imports: [DynamicChartComponent],
    template: ` <app-dynamic-chart /> `,
    styles: ``,
})
export default class CommitComponent {}
