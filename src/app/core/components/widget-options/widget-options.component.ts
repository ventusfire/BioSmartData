import { Component, inject, input, model } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { IWidget } from '../../../shared/interfaces'
import { DashboardService } from '../../utils/dashboard.service'

@Component({
    selector: 'app-widget-options',
    standalone: true,
    imports: [MatButtonModule, MatIcon, MatButtonToggleModule],
    template: `
        <button
            mat-icon-button
            class="close-button"
            (click)="showOptions.set(false)"
        >
            <mat-icon>close</mat-icon>
        </button>
        <div>
            Width
            <mat-button-toggle-group
                [value]="data().columns ?? 1"
                (change)="
                    widgets.updateWidget(data().id, { columns: +$event.value })
                "
            >
                <mat-button-toggle [value]="1">1</mat-button-toggle>
                <mat-button-toggle [value]="2">2</mat-button-toggle>
                <mat-button-toggle [value]="3">3</mat-button-toggle>
                <mat-button-toggle [value]="4">4</mat-button-toggle>
            </mat-button-toggle-group>
        </div>

        <div>
            height
            <mat-button-toggle-group
                [value]="data().rows ?? 1"
                (change)="
                    widgets.updateWidget(data().id, { rows: +$event.value })
                "
            >
                <mat-button-toggle [value]="1">1</mat-button-toggle>
                <mat-button-toggle [value]="2">2</mat-button-toggle>
                <mat-button-toggle [value]="3">3</mat-button-toggle>
                <mat-button-toggle [value]="4">4</mat-button-toggle>
            </mat-button-toggle-group>
        </div>
        <button
            mat-icon-button
            class="remove-widget-button"
            (click)="widgets.removeWidget(data().id)"
        >
            <mat-icon>delete</mat-icon>
        </button>
    `,
    styleUrl: './widget-options.component.scss',
})
export class WidgetOptionsComponent {
    data = input.required<IWidget>()
    showOptions = model<boolean>(false)
    widgets = inject(DashboardService)
}
