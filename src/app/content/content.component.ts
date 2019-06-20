import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() SelectedContent: {};

  constructor() {
    console.log(this.SelectedContent);
  }

  ngOnInit() {
  }
  getSelectedContent($event) {
    this.SelectedContent = $event;
    console.log(this.SelectedContent);
  }
}
