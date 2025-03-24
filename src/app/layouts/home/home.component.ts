import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, MenubarModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoginPage = false;
  items: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService,) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLoginPage = event.url === '/login';
    });

    this.items = [
      {
        label: 'Nossos Produtos',
        icon: 'pi pi-box',
        routerLink: '/produtos'
      },
      {
        label: 'Cadastrar Produtos',
        icon: 'pi pi-plus',
        routerLink: '/cadastro-produto'
      },
      { separator: true },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.authService.logout(),
        styleClass: 'menu-right'
      }
    ];
  }
}
