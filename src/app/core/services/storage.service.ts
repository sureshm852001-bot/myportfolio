import { Injectable } from '@angular/core';

const STORAGE_KEYS_PREFIX = 'portfolio:';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private memory = new Map<string, string>();

  private buildKey(key: string): string {
    return STORAGE_KEYS_PREFIX + key;
  }

  set(key: string, value: unknown): void {
    const serialized = JSON.stringify(value);
    this.memory.set(key, serialized);
    try {
      localStorage.setItem(this.buildKey(key), serialized);
    } catch {
      // Storage unavailable (private mode / SSR) — fall back to in-memory.
    }
  }

  get<T>(key: string): T | null {
    try {
      const stored = localStorage.getItem(this.buildKey(key)) ?? this.memory.get(key);
      return stored ? (JSON.parse(stored) as T) : null;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    this.memory.delete(key);
    try {
      localStorage.removeItem(this.buildKey(key));
    } catch {
      // ignore
    }
  }

  clear(): void {
    this.memory.clear();
    try {
      const prefix = STORAGE_KEYS_PREFIX;
      const toRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(prefix)) toRemove.push(key);
      }
      toRemove.forEach((key) => localStorage.removeItem(key));
    } catch {
      // ignore
    }
  }
}
