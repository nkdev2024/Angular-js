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
import { Observable } from 'rxjs';



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
  // backendUrl = 'https://psychic-orbit-5gvjxx5gj9jrfq99-8080.app.github.dev';
  backendUrl = 'http://44.193.168.210:8080';
  dataList: any = [];

  constructor(private http: HttpClient) {}
 
  // file upload api
  fileUpload(): void {
       // Capture the file input element
       const fileInput: any = document.querySelector('input[type="file"]') as HTMLInputElement;
       const file = fileInput.files[0];

       // Create FormData object and append form data
        const formData = new FormData();
   
      //  formData.append('password', password);
        formData.append('file', file);

        
    // Send data to the backend using HttpClient
    this.http.post(`${this.backendUrl}/fileUpload`, formData)
    .subscribe(
      response => {
        console.log('Image uploaded successfull.');
        // Handle success response from the server
      },
      error => {
        // try catch error handler method
        console.error('Image is not uploaded successfully.');
        // Handle error response from the server
      }
    );

  }

  // creating/sending user data api
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
          // using promise for async await method
          console.error('Error sending data:', error);
          // Handle error response from the server
        }
      );
  }

  // fetch user data request
  fetchData(): void{
      // Send data to the backend using HttpClient
    this.http.get(`${this.backendUrl}/getAllusers`)
    .subscribe(
      (data) => {
        console.log(data)
        this.dataList = data;
      },
      (error) => {
        // async await method way using promises
        console.error('Error fetching data:', error);
      }
    );
  }

  // update user info/data api 
  updateItem(datas: any, i: any): void{
    console.log(i)
    this.http.put(`${this.backendUrl}/updateUser`, datas)
    .subscribe(
      (data) => {
        console.log(data)
        this.dataList[i] = data;
      },
      (error) => {
        // using async await method using promises
        console.error('Error fetching data:', error);
      }
    );
  }

  // delete user data api
  deleteItem(datas: any , i: any): void {
  console.log(datas + i);
  this.http.delete(`${this.backendUrl}/deleteUser?rollNumber=${datas.rollNumber}`)
    .subscribe({
      next: (response) => {
        console.log('Response:', response);
        
        this.dataList.splice(i, 1);
        console.log(this.dataList);
      },
      error: (error) => {
        // using async await using promises method
        console.error('Error fetching data:', error);
      }
    });
}
  
}
