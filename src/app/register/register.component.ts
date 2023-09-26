import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Token } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata = { name: "", email: "", password: "" };
  submit = false;
  errorMessage = "";
  loading = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {

    this.loading = true;

    //Call register service
    this.auth
      .register(this.formdata.name, this.formdata.email, this.formdata.password)
      .subscribe({
        next: data => {
          //store token from response
          this.auth.storeToken(data.idToken);
          console.log("registered id token "+data.idToken );

          this.auth.canAuthenticate();

        },
        error: data => {
          if (data.error.error.message == "INVALID_EMAIL") {
            this.errorMessage = "Invalid Email!";
          } else if (data.error.error.message == "Already Email Exists") { this.errorMessage = "Already Email Exists"; }
          else { this.errorMessage = "Unknown Error"; }
        }
      }).add(() => {
        this.loading = false;
      })

  }
}
