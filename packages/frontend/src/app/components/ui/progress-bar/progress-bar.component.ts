import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  standalone: true,
  template: `
    <div class="progress-bar-container">
      <div class="progress-bar">
        <div
          [style.width]="getProgressWidth() + '%'"
          [style.background-color]="getProgressColor()"></div>
        <div
          [style.width]="getRegressWidth() + '%'"
          [style.background-color]="getRegressColor()"></div>
      </div>
      <div class="labels-container">
        <div class="labels">
        <span>Word progress: {{cardProgress}}</span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input({ required: true }) public cardProgress!: number
  
  getProgressWidth(): number {
    return Math.min(100, Math.max(0, 50 + this.cardProgress * 5));
  }

  getRegressWidth(): number {
    return Math.min(100, Math.max(0, 50 - this.cardProgress * 5));
  }

  private calculateOpacity(value: number): number {
    const maxProgress = 10;
    return Math.min(1, Math.abs(value) / maxProgress);
  }

  getProgressColor(): string {
    if (this.cardProgress >= 0) {
      const opacity = this.calculateOpacity(this.cardProgress);
      return `rgba(46, 204, 112, ${opacity})`;
    }
    return 'transparent';
  }

  getRegressColor(): string {
    if (this.cardProgress < 0) {
      const opacity = this.calculateOpacity(this.cardProgress);
      return `rgba(231, 77, 60, ${opacity})`;
    }
    return 'transparent';
  }
}
