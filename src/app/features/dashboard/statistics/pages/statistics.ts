import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChartLine, faChartBar, faDollarSign, faShoppingBag, faPercentage, faBox } from '@fortawesome/free-solid-svg-icons';
import { MOCK_STATISTICS, StatisticsData } from '../models/statistics.model';

@Component({
  selector: 'app-statistics',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics implements OnInit {
  faChartLine = faChartLine;
  faChartBar = faChartBar;
  faDollarSign = faDollarSign;
  faShoppingBag = faShoppingBag;
  faPercentage = faPercentage;
  faBox = faBox;

  protected readonly data = signal<StatisticsData>(MOCK_STATISTICS);

  ngOnInit(): void {}
}