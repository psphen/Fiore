import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileSettings, MOCK_PROFILE } from '../models/profile.model';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  protected readonly profile = signal<ProfileSettings>(MOCK_PROFILE);
  protected isEditing = signal(false);
  protected editForm = signal<Partial<ProfileSettings>>({});

  ngOnInit(): void {}

  toggleEdit() {
    if (this.isEditing()) {
      this.isEditing.set(false);
    } else {
      this.editForm.set({ ...this.profile() });
      this.isEditing.set(true);
    }
  }

  saveProfile() {
    this.profile.set({ ...this.editForm() } as ProfileSettings);
    this.isEditing.set(false);
  }

  cancelEdit() {
    this.isEditing.set(false);
  }

  updateField(field: keyof ProfileSettings, value: string | boolean) {
    this.editForm.update(current => ({ ...current, [field]: value }));
  }

  updateNotifications(key: 'email' | 'push' | 'sms', value: boolean) {
    const current = this.isEditing() ? this.editForm() : this.profile();
    const notifications = current.notifications ?? { email: true, push: true, sms: false };
    const updated: ProfileSettings = {
      name: current.name ?? '',
      email: current.email ?? '',
      phone: current.phone ?? '',
      avatar: current.avatar ?? '',
      role: current.role ?? 'Usuario',
      language: current.language ?? 'es',
      timezone: current.timezone ?? 'America/Argentina/Buenos_Aires',
      notifications: {
        email: key === 'email' ? value : notifications.email,
        push: key === 'push' ? value : notifications.push,
        sms: key === 'sms' ? value : notifications.sms,
      },
    };
    if (this.isEditing()) {
      this.editForm.set(updated);
    } else {
      this.profile.set(updated);
    }
  }
}