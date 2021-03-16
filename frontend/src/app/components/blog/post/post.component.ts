import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import POSTS_QUERY from "../../../apollo/queries/blog/posts";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  data: any = {};
  articles: any[] = [];
  loading = true;
  errors: any;
  config: any;

  private queryPosts: Subscription;

  constructor(private apollo: Apollo, private router: Router) { 
    this.config = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.articles.length,
      isFirstPage: true,
      isLastPage: false,
    };

  }

  ngOnInit(): void {
    this.queryPosts = this.apollo
      .watchQuery({
        query: POSTS_QUERY
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.articles = this.data.articles;

        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  getPostDetail(postID: number) {
    this.router.navigate(["blog/post", postID]);
  }


  pageChanged(event, p) {
    this.config.currentPage = event;

    let pageCount = p.pages.length;
    let firstPageValue = p.pages[0].value;
    let lastPageValue = p.pages[pageCount - 1].value;

    this.config.isFirstPage = firstPageValue == event ? true : false;
    this.config.isLastPage = lastPageValue == event ? true : false;
  }

  ngOnDestroy() {
    this.queryPosts.unsubscribe();
  }

}
