import { IUSer} from "./user.interface";

//Omit makes the id and daysStreak properties unnecessary when creating a user -> The id and daysStreak are being assigned in the backend.
export interface CreateUser extends Omit<IUSer, 'id'|'daysStreak'> {}