import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import POST_DETAIL_QUERY from "../../../apollo/queries/blog/post-detail";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  data: any = {};
  article: any;
  loading = true;
  errors: any;
  videoUrl: any = null;

  private queryPostDetail: Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.queryPostDetail = this.apollo
      .watchQuery({
        query: POST_DETAIL_QUERY,
        variables: {
          id: this.route.snapshot.paramMap.get("id")
        }
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.article = this.data.article;

        if(this.article.videoUrl) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.article.videoUrl);
        }
        
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy() {
    this.queryPostDetail.unsubscribe();
  }

}
