import { Component, inject, OnInit } from '@angular/core';
import { SummaryCard } from '../../component/summary-card/summary-card';
import { CalendarCard } from '../../component/calendar-card/calendar-card';
import { SalesChart } from '../../component/sales-chart/sales-chart';
import { CategoriesChart } from '../../component/categories-chart/categories-chart';
import { TrendingProducts } from '../../component/trending-products/trending-products';
import { TestServices } from '../../../../../core/services/test-services';

@Component({
  selector: 'app-home-view',
  imports: [SummaryCard, CalendarCard, SalesChart, CategoriesChart, TrendingProducts],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
})
export class HomeView implements OnInit {
  private readonly testService = inject(TestServices);

  ngOnInit(): void {
    this.testService.all().subscribe(data => {
      console.log(data);
    });
  }
}
