import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FaqService } from './../faq.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() items: [];
  @Output() SelectedContentEvent = new EventEmitter<any>();

  constructor(
  ) {
  }

  ngOnInit() {

  }

  searchContent(content) {
    this.SelectedContentEvent.emit(content);
  }

}
