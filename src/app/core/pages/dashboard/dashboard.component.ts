import { Component, inject, signal } from '@angular/core'
import { ConnectionBackendService } from '../../services/connection-backend.service'
import { MatGridListModule } from '@angular/material/grid-list'
import { map } from 'rxjs'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { WidgetComponent } from '../../components/widget/widget.component'
import { DashboardService } from '../../utils/dashboard.service'

@Component({
    selector: 'app-dashboard',
    standalone: true,
    providers: [DashboardService],
    imports: [
        MatGridListModule,
        MatGridListModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        WidgetComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
    widgets = inject(DashboardService)
    private breakpointObserver = inject(BreakpointObserver)

    /** Based on the screen size, switch from standard to one column per row */
    cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
            if (matches) {
                return [
                    { title: 'Card 1', cols: 1, rows: 1 },
                    { title: 'Card 2', cols: 1, rows: 1 },
                    { title: 'Card 3', cols: 1, rows: 1 },
                    { title: 'Card 4', cols: 1, rows: 1 },
                ]
            }

            return [
                { title: 'Card 1', cols: 2, rows: 1 },
                { title: 'Card 2', cols: 1, rows: 1 },
                { title: 'Card 3', cols: 1, rows: 2 },
                { title: 'Card 4', cols: 1, rows: 1 },
            ]
        }),
    )
    connectionBack = inject(ConnectionBackendService)
    response = signal<object>({})
}
