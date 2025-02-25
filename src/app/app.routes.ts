import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./core/pages/dashboard/dashboard.component'),
    },
    {
        path: 'analytics',
        loadComponent: () =>
            import('./core/pages/analythics/analythics.component'),
    },
]
