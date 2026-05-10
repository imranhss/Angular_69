import { Routes } from '@angular/router';
import { Home } from './component/layout/home/home';
import { ListStudent } from './component/student/list-student/list-student';
import { AddEditStudent } from './component/student/add-edit-student/add-edit-student';
import { Department } from './component/department/department';
import { AddTeacher } from './component/teacher/add-teacher/add-teacher';
import { ListTeacher } from './component/teacher/list-teacher/list-teacher';
import { Register } from './component/auth/register/register';
import { Login } from './component/auth/login/login';
import { Profile } from './component/auth/profile/profile';
import { authGuard } from './guards/guards-guard';
import { ProfileAdmin } from './component/auth/profile/profile-admin/profile-admin';
import { ProfileTeacher } from './component/auth/profile/profile-teacher/profile-teacher';
import { ProfileStudent } from './component/auth/profile/profile-student/profile-student';

export const routes: Routes = [

    {path: '', component: Home},
    {path: 'all_stu', component: ListStudent},
    {path: 'addStudent', component: AddEditStudent},
    {path: 'all_stu/edit/:id', component: AddEditStudent, canActivate: [authGuard], data:{role:'Admin'}},
    {path: 'edit-teacher/:id', component: AddTeacher},
    {path: 'dep', component: Department},
    {path: 'addTeacher', component: AddTeacher},
    {path: 'allTeacher', component: ListTeacher},
    {path: 'reg', component: Register},
    {path: 'login', component: Login},
    {path: 'profile', component: Profile},


    {path: 'profile-admin', component: ProfileAdmin, canActivate: [authGuard], data:{role:'Admin'} },
    {path: 'profile-teacher', component: ProfileTeacher, canActivate: [authGuard], data:{role:'Teacher'}},
    {path: 'profile-student', component: ProfileStudent, canActivate: [authGuard], data:{role:'Student'}},
    
];
