export interface User {
    id: string;
    username: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface SignUpRequest {
    username: string;
    password: string;
    email: string;
}
