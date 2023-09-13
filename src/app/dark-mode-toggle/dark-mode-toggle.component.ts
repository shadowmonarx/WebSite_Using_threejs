import { Component } from '@angular/core';
import { DarkModeService } from '../dark-mode.service';

@Component({
  selector: 'app-dark-mode-toggle',
  template: `
    <mat-slide-toggle
      [checked]="darkModeService.isDarkModeEnabled()"
      (change)="darkModeService.toggleDarkMode()"
    >
      Dark Mode
    </mat-slide-toggle>
  `,
  styleUrls: ['./dark-mode-toggle.component.less'],
})
export class DarkModeToggleComponent {
  constructor(public darkModeService: DarkModeService) {}
}
