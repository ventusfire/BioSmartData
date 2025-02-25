import { Injectable, signal } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class DataTransferService {
    userName = signal('')
    userFalowers = signal(0)
    repo = signal('')
    yDynamic = signal(0)
    xDynamic = signal({})

    dataCommit = signal<any>('')

    setName(name: string) {
        this.userName.set(name)
    }

    setFalowers(falowers: number) {
        this.userFalowers.set(falowers)
    }

    setRepo(repo: string) {
        this.repo.set(repo)
    }

    setDynamic(y: number, x: object) {
        this.yDynamic.set(y)
        this.xDynamic.set(x)
    }

    setDataCommint(data: any) {
        this.dataCommit.set(data)
    }
}
