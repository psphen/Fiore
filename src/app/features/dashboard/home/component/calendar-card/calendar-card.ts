import { Component, signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';

interface CalendarDay {
  day: number | null;
  isToday: boolean;
  isCurrentMonth: boolean;
}

@Component({
  selector: 'app-calendar-card',
  imports: [NgClass],
  templateUrl: './calendar-card.html',
  styleUrl: './calendar-card.css',
})
export class CalendarCard {
  protected readonly weekDays = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

  private readonly today = new Date();
  protected readonly currentDate = signal(new Date(this.today.getFullYear(), this.today.getMonth(), 1));

  protected readonly monthLabel = computed(() => {
    return this.currentDate().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
      .replace(/^\w/, c => c.toUpperCase());
  });

  protected readonly calendarDays = computed<CalendarDay[]>(() => {
    const date = this.currentDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayDate = this.today.getDate();
    const todayMonth = this.today.getMonth();
    const todayYear = this.today.getFullYear();

    const days: CalendarDay[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, isToday: false, isCurrentMonth: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        day: d,
        isToday: d === todayDate && month === todayMonth && year === todayYear,
        isCurrentMonth: true,
      });
    }

    return days;
  });

  protected prevMonth(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  protected nextMonth(): void {
    const d = this.currentDate();
    this.currentDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }
}
