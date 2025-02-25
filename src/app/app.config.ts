import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import {
    HttpClientModule,
    provideHttpClient,
    withFetch,
} from '@angular/common/http'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        importProvidersFrom(HttpClientModule),
        provideCharts(withDefaultRegisterables()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        provideCharts(withDefaultRegisterables()),
    ],
}
