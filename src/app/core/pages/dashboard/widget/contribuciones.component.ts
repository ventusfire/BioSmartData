import { Component } from '@angular/core'
import { PieChartComponent } from '../../../components/charts/piechart.component'

@Component({
    selector: 'app-contributions',
    standalone: true,
    imports: [PieChartComponent],
    template: ` <app-pie-chart /> `,
    styles: ``,
})
export class ContributionsComponent {}
