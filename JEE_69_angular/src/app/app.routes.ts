import { Routes } from '@angular/router';
import { Home } from './component/layout/home/home';
import { ListStudent } from './component/student/list-student/list-student';
import { AddEditStudent } from './component/student/add-edit-student/add-edit-student';
import { Department } from './component/department/department';
import { AddTeacher } from './component/teacher/add-teacher/add-teacher';
import { ListTeacher } from './component/teacher/list-teacher/list-teacher';

export const routes: Routes = [

    {path: '', component: Home},
    {path: 'all_stu', component: ListStudent},
    {path: 'addStudent', component: AddEditStudent},
    {path: 'all_stu/edit/:id', component: AddEditStudent},
    {path: 'edit-teacher/:id', component: AddTeacher},
    {path: 'dep', component: Department},
    {path: 'addTeacher', component: AddTeacher},
    {path: 'allTeacher', component: ListTeacher},
    
];
