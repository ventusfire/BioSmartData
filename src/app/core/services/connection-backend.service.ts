import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { catchError, map, Observable, throwError } from 'rxjs'
import { IRepository, IResponseCommit } from '../../shared/interfaces'

@Injectable({
    providedIn: 'root',
})
export class ConnectionBackendService {
    private apiUrl = environment.apiUrl
    private token = environment.keySh

    http = inject(HttpClient)

    private httpOptions = {
        headers: new HttpHeaders({
            Autorization: `Bearer  ${this.token}`,
            'Content-Type': 'application/json',
        }),
    }

    getUser(user?: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/users/${user}`).pipe(
            catchError((err) => {
                alert(err.message)
                return throwError(
                    () => new Error('No se pudo obtener el usuario'),
                )
            }),
        )
    }

    getRepositories(
        user: string,
        type?: string,
        page?: number,
        per_page?: number,
        sort?: string,
    ): Observable<IRepository[]> {
        const params: any = {}
        if (type) params.type = type
        if (page) params.page = page
        if (per_page) params.per_page = per_page
        if (sort) params.sort = sort
        if (user) {
            return this.http
                .get<IRepository[]>(`${this.apiUrl}/users/${user}/repos`, {
                    params,
                })
                .pipe(map((res) => res.map((res) => res)))
        } else {
            throw new Error()
        }
    }

    getCommits(owner: string, repo: string): Observable<IResponseCommit[]> {
        return this.http
            .get<
                IResponseCommit[]
            >(`${this.apiUrl}/repos/${owner}/${repo}/commits`)
            .pipe(map((res) => res.map((res) => res)))
    }

    getContributors(owner: string, repo: string): Observable<any> {
        return this.http.get(
            `${this.apiUrl}/repos/${owner}/${repo}/stats/contributors`,
            this.httpOptions,
        )
    }

    getCommitActivity(owner: string, repo: string): Observable<any> {
        return this.http.get(
            `${this.apiUrl}/repos/${owner}/${repo}/stats/commit_activity`,
            this.httpOptions,
        )
    }

    getCodeFrequency(owner: string, repo: string): Observable<any> {
        return this.http.get(
            `${this.apiUrl}/repos/${owner}/${repo}/stats/code_frequency`,
            this.httpOptions,
        )
    }

    getTrafficViews(owner: string, repo: string): Observable<any> {
        return this.http.get(
            `${this.apiUrl}/repos/${owner}/${repo}/traffic/views`,
            this.httpOptions,
        )
    }

    getTrafficClones(owner: string, repo: string): Observable<any> {
        return this.http.get(
            `${this.apiUrl}/repos/${owner}/${repo}/traffic/clones`,
            this.httpOptions,
        )
    }
}
