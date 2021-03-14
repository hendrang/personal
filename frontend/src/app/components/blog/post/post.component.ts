import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import POSTS_QUERY from "../../../apollo/queries/blog/posts";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  data: any = {};
  loading = true;
  errors: any;

  private queryPosts: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.queryPosts = this.apollo
      .watchQuery({
        query: POSTS_QUERY
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

}
