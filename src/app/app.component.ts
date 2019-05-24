import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularobservable';
  private results = [];
  private term = new FormControl();
  constructor(private https: HttpClient) { }


  ngOnInit() {
    this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(searchTerm => {
        this.https.get(`https://restcountries.eu/rest/v2/name/${searchTerm}`).subscribe((data: any) => {
          this.results = data;
          console.log('request', data);
        });
      });
  }
}


  // Promise Used Here

  // private search(term: any) {
  //   console.log("term", term);

  //   this.https.get(`https://restcountries.eu/rest/v2/name/${term}`).toPromise().
  //     then((data: any) => {
  //       console.log("data", data);
  //       this.results = data;

  //     });
  // }
