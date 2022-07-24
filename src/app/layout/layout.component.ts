import {Component, OnInit, ViewChild} from '@angular/core';
import {filter, Subscription} from "rxjs";
import {Location, PopStateEvent} from "@angular/common";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import PerfectScrollbar from "perfect-scrollbar";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private _router: Subscription | undefined;
  url: string | undefined;
  location: Location;
  private lastPoppedUrl: string | undefined;
  private yScrollStack: number[] = [];
  @ViewChild(SidebarComponent, {static: false}) sidebar: SidebarComponent | undefined;

  constructor(private router: Router, location: Location) {
    this.location = location;
  }

  ngOnInit(): void {
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          // @ts-ignore
          window.scrollTo(0, this.yScrollStack.pop());
        }
        else
          window.scrollTo(0, 0);
      }
    });
    // @ts-ignore
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });
    const html = document.getElementsByTagName('html')[0];
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
      html.classList.add('perfect-scrollbar-on');
    }
    else {
      html.classList.add('perfect-scrollbar-off');
    }
  }

  public isMap(){
    // console.log(this.location.prepareExternalUrl(this.location.path()));
    return this.location.prepareExternalUrl(this.location.path()) == '#/maps/fullscreen';
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

}
