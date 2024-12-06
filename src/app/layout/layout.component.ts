import { Component, inject } from '@angular/core';
import { ChatComponent } from '../components/chat/chat.component';
import { AuthFireService } from '../services/auth-fire.service';
import { Router } from '@angular/router';
import { SidebarNavComponent } from '../components/sidebar-nav/sidebar-nav.component';

@Component({
  selector: 'app-layout',
  imports: [ChatComponent, SidebarNavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
