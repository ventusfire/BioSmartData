import { Component } from '@angular/core'
import { RepositoryComponent } from '../../components/analythics/repository.component'

@Component({
    selector: 'app-analythics',
    standalone: true,
    imports: [RepositoryComponent],
    template: ` <app-repository /> `,
    styles: ``,
})
export default class AnalythicsComponent {}
