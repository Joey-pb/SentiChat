import { Component, inject, signal } from '@angular/core';
import { ChatComponent } from '../components/chat/chat.component';
import { SidebarNavComponent } from '../components/sidebar-nav/sidebar-nav.component';
import { NgClass } from '@angular/common';
import { SidebarService } from '../services/sidebar.service';
import { MessageInputComponent } from '../components/message-input/message-input.component';

@Component({
  selector: 'app-layout',
  imports: [ChatComponent, SidebarNavComponent, NgClass, MessageInputComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  sidebarService = inject(SidebarService);
}
