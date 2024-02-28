import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { IUser } from '../00_model';

@Injectable({
    providedIn: 'root',
})
export class UserState {
    private _user$ = new BehaviorSubject<IUser[]>([]);
    private _updating$ = new BehaviorSubject<boolean>(false);

    private _histoicChanges: IUser[][] = [];

    public isUpdating$(): Observable<boolean> {
        return this._updating$.asObservable();
    }

    public setUpdating(isUpdating: boolean): void {
        this._updating$.next(isUpdating);
    }

    public getUsers$(): Observable<IUser[]> {
        return this._user$.asObservable().pipe(
            map((users) => users.sort((a, b) => a.userName.localeCompare(b.userName))),
        );
    }

    public addUser(user: IUser): void {
        const currentValue = this._user$.getValue();
        this._user$.next([...currentValue, user]);
    }

    public updateUser(updateduser: IUser): void {
        const currentValue: IUser[] = this._user$.getValue();
        const indexOfTask = currentValue.findIndex((user) => user.userId === updateduser.userId);
        currentValue[indexOfTask] = updateduser;
        this._user$.next([...currentValue]);
    }

    public deleteUser(userToRemove: IUser): void {
        const currentValue = this._user$.getValue();
        this._user$.next(currentValue.filter((user) => user.userId !== userToRemove.userId));
    }

    public setUsers(user: IUser[]): void {
        this._user$.next(user);
    }

    public getusersLatestValue(): IUser[] {
        return JSON.parse(JSON.stringify(this._user$.getValue()));
    }

}