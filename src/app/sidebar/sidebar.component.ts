import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  iconType: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/products',
    title: 'Product Management',
    type: 'link',
    iconType: 'nc-icon nc-book-bookmark'
  },
  {
    path: '/customers',
    title: 'Customer Management',
    type: 'link',
    iconType: 'nc-icon nc-book-bookmark'
  },
  {
    path: '/orders',
    title: 'Order Management',
    type: 'link',
    iconType: 'nc-icon nc-book-bookmark'
  },
  {
    path:'/dashboard',
    title: 'Home',
    type: 'link',
    iconType: 'nc-icon nc-book-bookmark'
  }
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];

  isNotMobileMenu() {
    return window.outerWidth <= 991;
  }

  constructor() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  ngOnInit(): void {
  }

}
