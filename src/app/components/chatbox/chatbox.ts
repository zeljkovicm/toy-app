import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <div class="flex flex-col items-end pointer-events-none font-sans">
      
      <div 
        class="transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) transform origin-bottom-right mb-6 pointer-events-auto"
        [class.scale-100]="isOpen()"
        [class.opacity-100]="isOpen()"
        [class.translate-y-0]="isOpen()"
        [class.scale-0]="!isOpen()"
        [class.opacity-0]="!isOpen()"
        [class.translate-y-10]="!isOpen()"
      >
        <div class="w-80 sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100 flex flex-col">
          
          <div class="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 p-6 text-white shrink-0 relative">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                  <mat-icon class="scale-125">smart_toy</mat-icon>
                </div>
                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-4 border-blue-600 rounded-full"></div>
              </div>
              <div>
                <h3 class="font-bold text-lg leading-tight m-0">AI Asistent</h3>
                <p class="text-blue-100 text-xs m-0 opacity-80">Obično odgovara odmah</p>
              </div>
            </div>
            <button 
              (click)="toggle()" 
              class="absolute top-6 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white border-none bg-transparent cursor-pointer"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <div class="flex-grow p-5 bg-[#f8fafc] overflow-y-auto space-y-4 custom-scrollbar">
            <div class="flex flex-col items-start">
              <div class="bg-white text-gray-700 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[85%] text-sm leading-relaxed">
                Zdravo! 👋 Ja sam tvoj digitalni asistent. Kako mogu da ti pomognem danas?
              </div>
              <span class="text-[10px] text-gray-400 mt-1 ml-1">12:45 PM</span>
            </div>

            <div class="flex flex-col items-end">
              <div class="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none shadow-md max-w-[85%] text-sm leading-relaxed">
                Zanima me kako funkcioniše vaša usluga?
              </div>
              <span class="text-[10px] text-gray-400 mt-1 mr-1 text-right">12:46 PM</span>
            </div>
          </div>

          <div class="p-4 bg-white border-t border-gray-100 shrink-0">
            <div class="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-1 border border-transparent focus-within:border-indigo-400 focus-within:bg-white transition-all shadow-inner">
              <input 
                type="text" 
                placeholder="Napiši poruku..." 
                class="w-full py-3 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400"
                (keyup.enter)="sendMessage()"
              >
              <button (click)="sendMessage()" class="p-2 text-indigo-600 hover:scale-110 transition-transform bg-transparent border-none cursor-pointer flex items-center justify-center">
                <mat-icon>send</mat-icon>
              </button>
            </div>
            <p class="text-center text-[10px] text-gray-400 mt-3 uppercase tracking-widest font-semibold">Powered by ToyApp</p>
          </div>
        </div>
      </div>

      <button 
        (click)="toggle()" 
        class="group pointer-events-auto relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 shadow-[0_10px_25px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.5)] hover:-translate-y-1 transition-all duration-300 border-none cursor-pointer"
      >
        <div class="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        <mat-icon class="text-white scale-125 transition-transform duration-500 group-hover:rotate-12" [class.rotate-90]="isOpen()">
          {{ isOpen() ? 'close' : 'chat_bubble' }}
        </mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #e2e8f0;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #cbd5e1;
    }
    
    /* Cubic bezier za onaj "bounce" efekat pri otvaranju */
    .cubic-bezier {
      transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  `]
})
export class Chatbox {
  isOpen = signal(false);
  toggle() { this.isOpen.update(v => !v); }
  sendMessage() { console.log('Slanje poruke...'); }
}