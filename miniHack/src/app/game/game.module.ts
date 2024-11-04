import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './game-board/game-board.component';
import { DiceComponent } from './dice/dice.component';
import { RollButtonComponent } from './roll-button/roll-button.component';
import { ScoreSelectioComponent } from './score-selectio/score-selectio.component';



@NgModule({
  declarations: [
  
    DiceComponent,
    RollButtonComponent,
    ScoreSelectioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
