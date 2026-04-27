import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, MOCK_EVENTS } from '../models/calendar.model';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {
  protected readonly events = signal<CalendarEvent[]>(MOCK_EVENTS);
  protected currentDate = signal<Date>(new Date(2024, 0, 2024));
  protected selectedMonth = signal<number>(0);
  protected selectedYear = signal<number>(2024);
  protected today = new Date();

  protected readonly monthName = computed(() => {
    return this.currentDate().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  });

  protected readonly calendarDays = computed(() => {
    const year = this.selectedYear();
    const month = this.selectedMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  });

  protected readonly eventsForDay = (date: Date | null): CalendarEvent[] => {
    if (!date) return [];
    return this.events().filter(e => {
      const eventDate = new Date(e.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  protected readonly weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  ngOnInit(): void {}

  previousMonth() {
    const current = this.selectedMonth();
    if (current === 0) {
      this.selectedMonth.set(11);
      this.selectedYear.set(this.selectedYear() - 1);
    } else {
      this.selectedMonth.set(current - 1);
    }
  }

  nextMonth() {
    const current = this.selectedMonth();
    if (current === 11) {
      this.selectedMonth.set(0);
      this.selectedYear.set(this.selectedYear() + 1);
    } else {
      this.selectedMonth.set(current + 1);
    }
  }

  getEventClass(type: string): string {
    const classes: Record<string, string> = {
      order: 'bg-blue-100 text-blue-800 border-blue-200',
      delivery: 'bg-green-100 text-green-800 border-green-200',
      meeting: 'bg-purple-100 text-purple-800 border-purple-200',
      note: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return classes[type] || '';
  }

  getEventLabel(type: string): string {
    const labels: Record<string, string> = {
      order: 'Orden',
      delivery: 'Entrega',
      meeting: 'Reunión',
      note: 'Nota',
    };
    return labels[type] || type;
  }
}