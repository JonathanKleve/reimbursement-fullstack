import { User } from './user.model';

export interface Reimbursement {
    id?: number;
    amount: number;
    description: string;
    status: 'PENDING' | 'APPROVED' | 'DENIED';
    author: User;
}