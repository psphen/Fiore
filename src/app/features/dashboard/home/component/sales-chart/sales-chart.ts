import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sales-chart',
  imports: [],
  templateUrl: './sales-chart.html',
  styleUrl: './sales-chart.css',
})
export class SalesChart implements AfterViewInit {
  @ViewChild('salesCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private readonly platformId = inject(PLATFORM_ID);

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    new Chart(this.canvasRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ene-Feb', 'Mar-Abr', 'May-Jun', 'Jul-Ago', 'Sep-Oct', 'Nov-Dic'],
        datasets: [
          {
            label: 'Instagram',
            data: [15, 12, 16, 21, 21, 16],
            backgroundColor: '#9d1b4c',
            borderRadius: 4,
          },
          {
            label: 'Facebook',
            data: [5, 7, 22, 16, 16, 11],
            backgroundColor: '#e8829a',
            borderRadius: 4,
          },
          {
            label: 'Whatsapp',
            data: [12, 11, 12, 12, 12, 12],
            backgroundColor: '#f5c6d3',
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: { size: 12 },
            },
          },
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            beginAtZero: true,
            max: 25,
            ticks: { stepSize: 5 },
            grid: { color: '#f0f0f0' },
          },
        },
      },
    });
  }
}
