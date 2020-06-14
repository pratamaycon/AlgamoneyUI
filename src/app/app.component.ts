import { Router } from '@angular/router';
import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements DoCheck {
  title = 'AlgamoneyUI';
  path = '';

  constructor(private toastyConfig: ToastyConfig, private router: Router) {
    this.toastyConfig.theme = 'bootstrap';
  }

  ngDoCheck() {
    this.path = window.location.href.substring(21);
  }
}
