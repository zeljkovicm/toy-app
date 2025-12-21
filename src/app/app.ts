import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { Chatbox } from "./components/chatbox/chatbox";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Chatbox],
  template: `

    <app-header class="z-10 relative"/>
    <div class="h-[calc(100%-64px)] overflow-auto">
      <router-outlet />
    </div>
    <div class="fixed bottom-6 right-6 z-[1000]">
      <app-chatbox />
    </div>
    
  `,
  styles: [],
})
export class App {
}
