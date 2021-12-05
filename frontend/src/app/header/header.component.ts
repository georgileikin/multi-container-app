import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('fetchTokenForm') fetchTokenForm: NgForm;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  onSubmit() {
    this.httpClient
      .post('/auth/token/', {
        username: this.fetchTokenForm.value.username,
        password: this.fetchTokenForm.value.password
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
