import { Component } from '@angular/core';
import { ChatComponent } from '../components/chat/chat.component';
import { SidebarNavComponent } from '../components/sidebar-nav/sidebar-nav.component';

@Component({
  selector: 'app-layout',
  imports: [ChatComponent, SidebarNavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
