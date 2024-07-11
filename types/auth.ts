export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegistrationData {
    name: string;
    email: string;
    password: string;
  }
  