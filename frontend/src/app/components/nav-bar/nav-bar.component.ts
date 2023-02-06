import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isActive: boolean;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  
  constructor() { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(event => {
      this.isActive = false;
    });
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }

  openBlog(): void {
    window.open("https://bloqku.com/", "_blank");
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

}
