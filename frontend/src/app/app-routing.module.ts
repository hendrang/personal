import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { PostDetailComponent } from './components/blog/post-detail/post-detail.component';
import { PostComponent } from './components/blog/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { ResumeComponent } from './components/resume/resume.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "resume",
    component: ResumeComponent,
  },
  {
    path: "blog",
    component: BlogComponent,
    children: [
      { path: '', redirectTo: 'post', pathMatch: 'full' },
      { path: 'post', component: PostComponent },
      { path: 'post/:id', component: PostDetailComponent }
    ],
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  { path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
