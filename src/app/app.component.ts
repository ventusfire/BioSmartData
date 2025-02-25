import {
    Component,
    signal,
    computed,
    ViewChild,
    ElementRef,
    AfterViewInit,
    inject,
} from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { CustomSidenavComponent } from './core/components/custom-sidenav/custom-sidenav.component'
import { filter, fromEvent, map, switchMap } from 'rxjs'
import { ConnectionBackendService } from './core/services/connection-backend.service'
import { IGetUserGitHub } from './shared/interfaces'
import { DataTransferService } from './core/utils/data-transfer.service'
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        CustomSidenavComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
    title = 'BioSmartData-prueba-front'

    @ViewChild('inputSearch', { static: true }) inputSearch!: ElementRef
    userData = inject(DataTransferService)
    collapsed = signal(false)
    user = signal<IGetUserGitHub>({
        login: 'ventusfire',
        id: 57595800,
        node_id: 'MDQ6VXNlcjU3NTk1ODAw',
        avatar_url: 'https://avatars.githubusercontent.com/u/57595800?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/ventusfire',
        html_url: 'https://github.com/ventusfire',
        followers_url: 'https://api.github.com/users/ventusfire/followers',
        following_url:
            'https://api.github.com/users/ventusfire/following{/other_user}',
        gists_url: 'https://api.github.com/users/ventusfire/gists{/gist_id}',
        starred_url:
            'https://api.github.com/users/ventusfire/starred{/owner}{/repo}',
        subscriptions_url:
            'https://api.github.com/users/ventusfire/subscriptions',
        organizations_url: 'https://api.github.com/users/ventusfire/orgs',
        repos_url: 'https://api.github.com/users/ventusfire/repos',
        events_url: 'https://api.github.com/users/ventusfire/events{/privacy}',
        received_events_url:
            'https://api.github.com/users/ventusfire/received_events',
        type: 'User',
        user_view_type: 'public',
        site_admin: false,
        name: '',
        company: 'null',
        blog: '',
        location: 'null',
        email: 'null',
        hireable: null,
        bio: null,
        twitter_username: 'null',
        public_repos: 13,
        public_gists: 0,
        followers: 2,
        following: 2,
        created_at: new Date(),
        updated_at: new Date(),
    })

    sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'))
    connection = inject(ConnectionBackendService)

    ngAfterViewInit(): void {
        fromEvent<KeyboardEvent>(this.inputSearch.nativeElement, 'keypress')
            .pipe(
                filter((event) => event.key === 'Enter'),
                map(() => this.inputSearch.nativeElement.value),
                switchMap((res) => this.connection.getUser(res)),
            )
            .subscribe({
                next: (value) => {
                    this.user.set(value)
                    this.userData.setName(value.login)
                    this.userData.setFalowers(value.falowers)
                    console.log(this.userData.userName())
                },
                error: (err) => {
                    alert(err.mesagge)
                },
            })
    }
}
