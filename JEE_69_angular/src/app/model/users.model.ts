export interface UserModel {

    id?: string;

    name: string;

    email: string;

    password: string;

    phone: string;

    image: string;

    role: 'Admin' | 'Teacher' | 'Student' | '';


}