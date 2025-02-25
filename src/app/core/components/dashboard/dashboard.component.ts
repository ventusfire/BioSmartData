import { Component } from '@angular/core'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { WidgetComponent } from '../widget/widget.component'
import { IWidget } from '../../../shared/interfaces'
import CommitComponent from '../../pages/dashboard/widget/commit.component'

@Component({
    selector: 'app-dashboard',
    template: `<app-widget [data]="data" />`,
    styleUrl: './dashboard.component.scss',
    standalone: true,
    imports: [
        MatGridListModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        WidgetComponent,
    ],
})
export class DashboardComponent {
    data: IWidget = {
        id: 1,
        label: 'Ralph',
        content: CommitComponent,
    }
}
