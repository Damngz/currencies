import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Front-Duoc-Azure';
  isLoggedIn = false;

  constructor(private msalService: MsalService, private router: Router) { }

  ngOnInit(): void {
    const account = this.msalService.instance.getActiveAccount();
    this.isLoggedIn = !!account;

    if (this.isLoggedIn) {
      sessionStorage.setItem('user', account?.username || '');
      this.router.navigate(['/currencies']);
    }
  }

  login() {
    this.msalService.loginPopup().subscribe({
      next: (result) => {
        console.log('Login success:', result);

        const account = this.msalService.instance.getAllAccounts()[0];
        this.msalService.instance.setActiveAccount(account);
        this.isLoggedIn = true;
        sessionStorage.setItem('user', this.msalService.instance.getActiveAccount()?.username || '');
        this.router.navigate(['/currencies']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.isLoggedIn = false;
      },
    });
  }


  logout() {
    this.msalService.logoutPopup().subscribe({
      next: () => {
        console.log('Logout success');
        this.isLoggedIn = false;

        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout error:', error);
      },
    });
  }
}
