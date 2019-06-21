import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() SelectedContent: { devices: [], content: []};

  constructor() {
  }

  ngOnInit() {
  }
  getSelectedContent($event) {
    this.SelectedContent = $event;
  }
}
