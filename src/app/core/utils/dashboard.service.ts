import { computed, Injectable, signal } from '@angular/core'
import { IWidget } from '../../shared/interfaces'
import CommitComponent from '../pages/dashboard/widget/commit.component'
import { PullRequestComponent } from '../pages/dashboard/widget/pull-request.component'
import { ContributionsComponent } from '../pages/dashboard/widget/contribuciones.component'

@Injectable()
export class DashboardService {
    widgetsDefault = signal<IWidget[]>([
        {
            id: 0,
            label: 'Contributions',
            content: ContributionsComponent,
            rows: 3,
            columns: 2,
        },
    ])
    widgets = signal<IWidget[]>([
        {
            id: 1,
            label: 'Commits',
            content: CommitComponent,
            rows: 3,
            columns: 2,
        },
        {
            id: 2,
            label: 'Pull Request',
            content: PullRequestComponent,
        },
    ])

    addedWidgets = signal<IWidget[]>(this.widgetsDefault())

    widgetsToAdd = computed(() => {
        const addedIds = this.addedWidgets().map((res) => res.id)
        return this.widgets().filter((res) => !addedIds.includes(res.id))
    })

    addWidget(widget: IWidget) {
        this.addedWidgets.set([...this.addedWidgets(), { ...widget }])
    }

    updateWidget(id: number, widget: Partial<IWidget>) {
        const index = this.addedWidgets().findIndex((res) => res.id === id)
        if (index !== -1) {
            const newWidgets = [...this.addedWidgets()]
            newWidgets[index] = { ...newWidgets[index], ...widget }
            this.addedWidgets.set(newWidgets)
        }
    }

    removeWidget(id: number) {
        this.addedWidgets.set(
            this.addedWidgets().filter((res) => res.id !== id),
        )
    }
}
