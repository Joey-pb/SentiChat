import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';

import { ChatComponent } from '../components/chat/chat.component';
import { SidebarNavComponent } from '../components/sidebar-nav/sidebar-nav.component';
import { MessageInputComponent } from '../components/message-input/message-input.component';

import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-layout',
  imports: [ChatComponent, SidebarNavComponent, NgClass, MessageInputComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  sidebarService = inject(SidebarService);
}
