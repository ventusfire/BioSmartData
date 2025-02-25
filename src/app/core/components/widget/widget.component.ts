import { Component, input, signal } from '@angular/core'
import { IWidget } from '../../../shared/interfaces'
import { NgComponentOutlet } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { WidgetOptionsComponent } from '../widget-options/widget-options.component'

@Component({
    selector: 'app-widget',
    standalone: true,
    imports: [
        NgComponentOutlet,
        MatButtonModule,
        MatIcon,
        WidgetOptionsComponent,
    ],
    templateUrl: './widget.component.html',
    styleUrl: './widget.component.scss',
    host: {
        '[style.grid-area]':
            '"span " + (data().rows ?? 1) + "/ span " + (data().columns ?? 1)',
    },
})
export class WidgetComponent {
    data = input.required<IWidget>()

    showOptions = signal(false)
}
