import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreTableComponent } from './score-table/score-table.component';
import { ScoreSummaryComponent } from './score-summary/score-summary.component';



@NgModule({
  declarations: [
    ScoreTableComponent,
    ScoreSummaryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ScoreModule { }
