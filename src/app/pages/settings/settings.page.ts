import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings.services.ts';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SettingsPage implements OnInit {
  darkMode = false;
  gridMode = true;

  constructor(private settings: SettingsService) {}

  async ngOnInit() {
    this.darkMode = await this.settings.isDarkMode();
    this.gridMode = await this.settings.isGridMode();
    this.applyTheme();
  }

  async toggleDark() {
    await this.settings.toggleDarkMode();
    this.darkMode = !this.darkMode;
    this.applyTheme();
  }

  async toggleGrid() {
    await this.settings.toggleGridMode();
    this.gridMode = !this.gridMode;
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
  }
}