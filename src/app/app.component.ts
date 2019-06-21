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
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  items: {};
  DATA: {};
  SelectedContent = { name: "Horacio" };
  Breadcumb = [
    {
      name: 'Centro de ayuda'
    }
  ];

  constructor(
    private faqService: FaqService
  ) {
    this.getData();
  }

  searchContent(content) {
    if (content.content) {
      this.SelectedContent = content;
    }
  }



  getSelectedContent($event) {
    this.SelectedContent = $event;
  }

  setBreadcumbContent($event) {
    let bread = this.Breadcumb[0];
    let breads = [];
    breads.push(bread);
    $event.forEach(element => {
      breads.push(element);
    });

    this.Breadcumb = breads;
  }

  showContent(event) {

  }

  async getData() {
    const data = await this.faqService.getJSON();
    this.items = data.items;
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
    let matches = [];
    if (!Array.isArray(arr)) { return matches; }

    arr.forEach(function (i) {
      if (i.path.includes(term)) {
        matches.push(i);
      } else {
        const childResults = this.filterTitle(i.items, term);
        if (childResults.length) {
          matches.push(Object.assign({}, i));
        }
      }
    });

    return matches;
  }
}
