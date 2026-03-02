import { User } from './user.model';

export interface Reimbursement {
    id?: number;
    amount: number;
    description: string;
    status: string;
    author: User; // Notice we use the User interface here!
}