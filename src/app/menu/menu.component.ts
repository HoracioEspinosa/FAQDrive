import { Component, OnInit, Input } from '@angular/core';
import { FaqService } from './../faq.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() items: [];

  constructor(
  ) {
  }

  ngOnInit() {

  }

}
