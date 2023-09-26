import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata = {
    email: "", password: ""
  }
  submit = false;
  loading = false;
  errorMessage = "";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    this.loading = true;
    console.log(this.formdata);
    //call login servive
    this.auth.login(this.formdata.email, this.formdata.password)
      .subscribe({
        next: data => {
          //Store token
          this.auth.storeToken(data.idToken);
          console.log("log user token is " + data.idToken);

          this.auth.canAuthenticate();
        }, error: data => {
          if (data.error.error.message == "INVALIED_PASSWORD" || data.error.error.message == "INVALIED_EMAIL") {
            this.errorMessage = "invalid credientials";
          } else {
            this.errorMessage = "unknown error";
          }
        }
      }).add(() => {
        this.loading = false;
        console.log("login completed")
      })
  }

}
