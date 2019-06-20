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
  SelectedContent = { name: "Horacio" };

  constructor(
    private faqService: FaqService
  ) {
    this.getData();
  }

  searchContent(content) {
    console.log(content);
  }



  getSelectedContent($event) {
    this.SelectedContent = $event;
  }

  showContent(event) {
    console.log(event.target.getAttribute('data-title'));
  }

  async getData() {
    const data = await this.faqService.getJSON();
    this.items = data;
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
}
