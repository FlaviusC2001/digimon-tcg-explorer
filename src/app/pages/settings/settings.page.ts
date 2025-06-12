import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service.ts';
import { IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  isDarkMode: boolean = false;
  isGridMode: boolean = true;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.getIsDarkMode().subscribe((darkMode: boolean) => (this.isDarkMode = darkMode));
    this.settingsService.getIsGridMode().subscribe((gridMode: boolean) => (this.isGridMode = gridMode));
  }

  toggleDarkMode() {
    this.settingsService.toggleDarkMode();
  }

  toggleGridMode() {
    this.settingsService.toggleGridMode();
  }
}