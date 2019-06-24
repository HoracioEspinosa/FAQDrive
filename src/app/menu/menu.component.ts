import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FaqService } from './../faq.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() items: [];
  @Input() DATA: [];
  @Output() SelectedContentEvent = new EventEmitter<any>();
  @Output() BreadcumbEvent = new EventEmitter<any>();
  @Output() SelectedItemEvent = new EventEmitter<any>();
  SelectedItem: string;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  searchContent(item, $event) {
    this.SelectedItem = item.path;
    this.SelectedContentEvent.emit(item);
    this.SelectedItemEvent.emit(this.SelectedItem);
    let parent = (this.filterTitle(this.DATA['items'], item.parent));
    if(parent.length > 0) {
      parent = parent[0];
    }

    let breadParent = {
      name: parent['title'].text
    };

    if (parent['content']) {
      breadParent['content'] = parent;
    }

    let breads = [];
    let current = { name: item.title.text, content: item };
    breads.push({
      name: 'Centro de ayuda',
      content: {}
    });
    breads.push(breadParent);
    breads.push(current);
    this.BreadcumbEvent.emit(breads);
  }


  filterTitle(arr, term) {
    const self = this;
    let matches = [];
    if (!Array.isArray(arr)) { return matches; }

    arr.forEach(function (i) {
      if (i.path.includes(term)) {
        matches.push(i);
      } else {
        const childResults = self.filterTitle(i.items, term);
        if (childResults.length) {
          matches.push(Object.assign({}, i));
        }
      }
    });

    return matches;
  }

}
