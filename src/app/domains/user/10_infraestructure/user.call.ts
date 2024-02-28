import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "@environment"
import {CreateUser,IUser} from '../00_model';

const ENDPOINT_NAME = 'Users/';

@Injectable({
  providedIn: 'root',
})
export class UserCall {
  private readonly _baseUrl: string = environment.apiUrl + ENDPOINT_NAME;

  public constructor(
      private readonly _http: HttpClient,
  ) {}

  public getUsersOutput(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this._baseUrl);
  }

  public addUser(createUser: CreateUser): Observable<CreateUser> {
    return this._http.post<CreateUser>(`${this._baseUrl}`, createUser);
  }

  public updateUser(updateUserInput: IUser): Observable<IUser> {
    return this._http.put<IUser>(`${this._baseUrl}${updateUserInput.userId}`, updateUserInput);
  }

  public deleteUser(User: IUser): Observable<any> {
    return this._http.delete(`${this._baseUrl}${User.userId}`);
  }
}