import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  private isGridMode = new BehaviorSubject<boolean>(true);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const darkMode = (await this.storage.get('darkMode')) || false;
    const gridMode = (await this.storage.get('gridMode')) || true;
    this.isDarkMode.next(darkMode);
    this.isGridMode.next(gridMode);
    this.applyTheme(darkMode);
  }

  getIsDarkMode() {
    return this.isDarkMode.asObservable();
  }

  getIsGridMode() {
    return this.isGridMode.asObservable();
  }

  async toggleDarkMode() {
    const newValue = !this.isDarkMode.value;
    this.isDarkMode.next(newValue);
    await this.storage.set('darkMode', newValue);
    this.applyTheme(newValue);
  }

  async toggleGridMode() {
    const newValue = !this.isGridMode.value;
    this.isGridMode.next(newValue);
    await this.storage.set('gridMode', newValue);
  }

  private applyTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
  }
}