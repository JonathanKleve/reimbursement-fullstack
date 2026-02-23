export interface User {
    id?: number;         // The '?' means it's optional (new users won't have an ID yet)
    username: string;
    password?: string;   // We keep this optional for security reasons
}