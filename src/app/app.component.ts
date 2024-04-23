import { Component, NgModule, NO_ERRORS_SCHEMA, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    HttpClientModule, // Enable fetch for HttpClient
  ],
  imports: [RouterOutlet, CommonModule, MatListModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, HttpClientModule, ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppComponent {
  title = 'my-angular-project';
  backendUrl = 'https://psychic-orbit-5gvjxx5gj9jrfq99-8080.app.github.dev';
  dataList: any = [];

  constructor(private http: HttpClient) {}

  sendData(): void {
    // Get input values
    const userId = (document.querySelector('input[placeholder="userId"]') as HTMLInputElement).value;
    const firstName = (document.querySelector('input[placeholder="ABCD"]') as HTMLInputElement).value;
    const lastName = (document.querySelector('input[placeholder="VXYZ"]') as HTMLInputElement).value;
    const rollNumber = (document.querySelector('input[placeholder="111"]') as HTMLInputElement).value;
    const password = (document.querySelector('input[placeholder="password"]') as HTMLInputElement).value;

    // Create an object with the input data
    const data = {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      rollNumber: rollNumber,
      password: password
    };

    // Send data to the backend using HttpClient
    this.http.post(`${this.backendUrl}/createUser`, data)
      .subscribe(
        response => {
          console.log('Data sent successfully!', response);
          // Handle success response from the server
        },
        error => {
          console.error('Error sending data:', error);
          // Handle error response from the server
        }
      );
  }

  fetchData(): void{
      // Send data to the backend using HttpClient
    this.http.get(`${this.backendUrl}/getAllusers`)
    .subscribe(
      (data) => {
        console.log(data)
        this.dataList = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );;
  }

  
}
