import { Component, computed, input, Input, signal } from '@angular/core'
import { IGetUserGitHub, IMenuItem } from '../../../shared/interfaces'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-custom-sidenav',
    standalone: true,
    imports: [MatListModule, MatIconModule, RouterModule],
    templateUrl: './custom-sidenav.component.html',
    styleUrl: './custom-sidenav.component.scss',
})
export class CustomSidenavComponent {
    userData = input.required<IGetUserGitHub>()
    sideNavCollapsed = signal(false)
    @Input() set collapsed(val: boolean) {
        this.sideNavCollapsed.set(val)
    }
    meniItem = signal<IMenuItem[]>([
        { icon: 'dashboard', label: 'Dashboard', routes: 'dashboard' },
        { icon: 'analytics', label: 'Analytics', routes: 'analytics' },
    ])

    profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'))
}
