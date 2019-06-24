import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatPlaceholder } from '@angular/material'
import { FaqService } from './faq.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'FAQ';
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  items: {};
  DATA: {};
  SelectedContent = {};
  SelectedItemElement = {};

  Breadcumb = [
  ];

  constructor(
    private faqService: FaqService
  ) {
    this.getData();
  }

  setBreadCumbContent(content) {
    if(content) {
      if (content.path) {
        if (this.SelectedItemElement !== content.path) {
          this.Breadcumb = [];
          if (content) {
            this.SelectedContent = content;
            this.SelectedItemElement = content.path;
            this.searchContent(content);
          } else {
            this.SelectedContent = this.SelectedContent;
          }
        }
      }
    }
  }

  getBack() {
      window.history.back();
  }

  searchContent(content) {
    if (content.content || content.devices)  {
      this.Breadcumb = [];
      this.SelectedContent = content;
      this.SelectedItemElement = content.path;
      let parent = (this.filterTitle(this.DATA['items'], this.SelectedItemElement));

      if(parent) {
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
        let current = { name: content.title.text, content: content };
        breads.push({
          name: 'Centro de ayuda',
          content: {}
        });
        breads.push(breadParent);
  
        this.Breadcumb = breads;
      }
    }
  }



  getSelectedContent($event) {
    this.SelectedContent = $event;
  }

  setSelectedItemElement($event) {
    this.SelectedItemElement = $event;
  }

  setBreadcumbContent($event) {
    let breads = [];
    $event.forEach(element => {
      breads.push(element);
    });

    this.Breadcumb = breads;
  }

  showContent(event) {

  }

  async getData() {
    const data = await this.faqService.getJSON();
    this.items = data['items'];
    this.DATA = data;
  }

  async ngOnInit() {
    const self = this;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
