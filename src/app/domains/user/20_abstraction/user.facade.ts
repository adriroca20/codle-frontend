import {Injectable} from '@angular/core';
import {delay, finalize, Observable, tap} from 'rxjs';

import {CreateUser,IUser} from '../00_model';
import {UserCall,UserState} from '../10_infraestructure';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  public constructor(
      private readonly _userCall: UserCall,
      private readonly _userState: UserState,
  ) {}

  public isUpdating$(): Observable<boolean> {
    return this._userState.isUpdating$();
  }

  public getIUsers$(): Observable<IUser[]> {
    return this._userState.getUsers$();
  }

  public loadIUserOutput$(): Observable<IUser[]> {
    return this._userCall.getUsersOutput().pipe(
        tap((users: IUser[]) => this._userState.setUsers(users)),
    );
  }

  public addIUser(userToCreate: IUser): void {
    this._userState.setUpdating(true);

    const {userName,mail,password} = userToCreate;
    const createIUserInput: CreateUser = {
        mail,
        password,
        userName
    };

    this._userCall.addUser(createIUserInput)
        .pipe(
            delay(4000),
            tap((response: any) => {
              debugger;
              const userToAdd: IUser = JSON.parse(JSON.stringify({...userToCreate, id: response.id}));
              this._userState.addUser(userToAdd);
            }),
            finalize(() => this._userState.setUpdating(false)),
            )
        .subscribe();
  }

  public updateIUser(userToUpdate: IUser): void {
    console.log({redWasHere: userToUpdate});
    const updateIUserInput: IUser = {
      ...userToUpdate,
    };

    this._userState.setUpdating(true);

    this._userCall.updateUser(updateIUserInput)
        .pipe(
            delay(4000),
            tap(() => this._userState.updateUser(userToUpdate)),
            finalize(() => this._userState.setUpdating(false)),
            )
        .subscribe();
  }

  public deleteIUser(userToDelete: IUser): void {
    this._userState.setUpdating(true);
    this._userCall.deleteUser(userToDelete)
        .pipe(
            delay(4000),
            tap(() => this._userState.deleteUser(userToDelete)),
            finalize(() => this._userState.setUpdating(false)),
            )
        .subscribe();
  }

  public getIUsersLatestValue(): IUser[] {
    return this._userState.getusersLatestValue();
  }
}
