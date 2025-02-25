import {
    AfterViewInit,
    Component,
    inject,
    Type,
    ViewChild,
} from '@angular/core'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ConnectionBackendService } from '../../services/connection-backend.service'
import { DataTransferService } from '../../utils/data-transfer.service'
import { IRepository } from '../../../shared/interfaces'
import { MatIcon } from '@angular/material/icon'

export interface UserData {
    id: string
    name: string
    forks: number
    languaje: string
    action: Type<unknown>
}

@Component({
    selector: 'app-repository',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIcon,
    ],
    template: `
        <mat-form-field>
            <mat-label>Filter</mat-label>
            <input
                matInput
                (keyup)="applyFilter($event)"
                placeholder="Repsositorio"
                #input
            />
        </mat-form-field>

        <div class="mat-elevation-z8">
            <table mat-table [dataSource]="dataSource" matSort>
                <!-- ID Column -->
                <ng-container matColumnDef="id">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>
                        ID
                    </th>
                    <td mat-cell *matCellDef="let row">{{ row.id }}</td>
                </ng-container>

                <!-- Progress name -->
                <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>
                        Repositorios
                    </th>
                    <td mat-cell *matCellDef="let row">{{ row.name }}%</td>
                </ng-container>

                <!-- forks Column -->
                <ng-container matColumnDef="forks">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>
                        Forks
                    </th>
                    <td mat-cell *matCellDef="let row">{{ row.forks }}</td>
                </ng-container>

                <!-- languaje Column -->
                <ng-container matColumnDef="languaje">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>
                        Lenguaje
                    </th>
                    <td mat-cell *matCellDef="let row">
                        {{ row.languaje ?? 'Sin lenguaje establecido' }}
                    </td>
                </ng-container>

                <ng-container matColumnDef="action">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header></th>
                    <td
                        mat-cell
                        *matCellDef="let row"
                        (click)="getContributors(row)"
                    >
                        <mat-icon>analytics</mat-icon>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr
                    mat-row
                    *matRowDef="let row; columns: displayedColumns"
                ></tr>

                <!-- Row shown when there is no matching data. -->
                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell" colspan="4">
                        No data matching the filter "{{ input.value }}"
                    </td>
                </tr>
            </table>

            <mat-paginator
                [pageSizeOptions]="[5, 10, 25, 100]"
                aria-label="Select page of users"
            ></mat-paginator>
        </div>
    `,
    styles: `
        table {
            width: 100%;
        }

        .mat-mdc-form-field {
            font-size: 14px;
            width: 100%;
        }

        td,
        th {
            width: 25%;
        }

        .mat-mdc-row .mat-mdc-cell {
            border-bottom: 1px solid transparent;
            border-top: 1px solid transparent;
            cursor: pointer;
        }

        .mat-mdc-row:hover .mat-mdc-cell {
            border-color: currentColor;
        }

        .demo-row-is-clicked {
            font-weight: bold;
        }
    `,
})
export class RepositoryComponent implements AfterViewInit {
    connection = inject(ConnectionBackendService)
    dataTransfer = inject(DataTransferService)

    displayedColumns: string[] = ['id', 'name', 'forks', 'languaje', 'action']
    dataSource!: MatTableDataSource<IRepository>
    clickedRows = new Set<IRepository>()

    @ViewChild(MatPaginator)
    paginator!: MatPaginator
    @ViewChild(MatSort)
    sort!: MatSort

    ngAfterViewInit() {
        this.getRespositorys()
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
        this.dataSource.filter = filterValue.trim().toLowerCase()

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage()
        }
    }

    getRespositorys(): void {
        console.log(this.dataTransfer.userName())
        this.connection
            .getRepositories(this.dataTransfer.userName())
            .subscribe({
                next: (res) => {
                    console.log(res)
                    this.dataSource = new MatTableDataSource(res)
                    this.dataSource.paginator = this.paginator
                    this.dataSource.sort = this.sort
                },
            })
    }

    getContributors(event: any): void {
        console.log(event)
        //this.dataTransfer.setRepo(event.)
        // this.connection
        //     .getCommits(this.userName.userName(), event.name)
        //     .subscribe({
        //         next: (value) => {
        //             value.forEach((commit) => {
        //                 const commitsPerDay: Record<string, number> = {}
        //                 const date = commit.commit.author.date.split('T')[0]
        //                 commitsPerDay[date] = (commitsPerDay[date] || 0) + 1
        //                 this.userName.setDataCommint(commitsPerDay)
        //             })
        //         },
        //     })
    }
}
