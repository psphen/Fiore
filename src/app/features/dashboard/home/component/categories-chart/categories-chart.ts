import { Component, AfterViewInit, ViewChild, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface CategoryItem {
  label: string;
  percent: string;
  color: string;
}

@Component({
  selector: 'app-categories-chart',
  imports: [],
  templateUrl: './categories-chart.html',
  styleUrl: './categories-chart.css',
})
export class CategoriesChart implements AfterViewInit {
  @ViewChild('donutCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly total = 150;

  protected readonly categories: CategoryItem[] = [
    { label: 'Ramos', percent: '80,02%', color: '#7b1a3a' },
    { label: 'Cajas florales', percent: '16,46%', color: '#c75b7a' },
    { label: 'Macetitas', percent: '3,52%', color: '#f5c6d3' },
  ];

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    new Chart(this.canvasRef.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [80.02, 16.46, 3.52],
            backgroundColor: ['#7b1a3a', '#c75b7a', '#f5c6d3'],
            borderWidth: 0,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        rotation: -135,
        circumference: 270,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
      },
    });
  }
}
