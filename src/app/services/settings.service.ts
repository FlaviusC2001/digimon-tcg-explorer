import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly darkKey = 'dark_mode';
  private readonly gridKey = 'grid_mode';
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async isDarkMode(): Promise<boolean> {
    return (await this._storage?.get(this.darkKey)) ?? false;
  }

  async isGridMode(): Promise<boolean> {
    return (await this._storage?.get(this.gridKey)) ?? true;
  }

  async toggleDarkMode(): Promise<void> {
    const current = await this.isDarkMode();
    await this._storage?.set(this.darkKey, !current);
  }

  async toggleGridMode(): Promise<void> {
    const current = await this.isGridMode();
    await this._storage?.set(this.gridKey, !current);
  }
}