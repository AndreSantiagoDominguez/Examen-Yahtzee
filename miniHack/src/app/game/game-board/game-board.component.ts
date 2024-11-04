import { Component } from '@angular/core';
import { ScoreSelectionService } from '../Service/score-selection.service';
import { GameStateService } from '../Service/game-state.service';
import { DiceService } from '../Service/dice.service';


@Component({
  selector: 'app-game-board',
  template: `
    <div class="dice-container">
      <div *ngFor="let die of diceService.getDiceState()" 
           (click)="diceService.toggleLock(die.id)"
           [class.locked]="die.isLocked" 
           class="dice">
        {{ die.value }}
      </div>
    </div>
    <button (click)="rollDice()" [disabled]="!gameStateService.canRoll()">Lanzar Dados</button>
    <button (click)="resetGame()">Reiniciar Juego</button>
    <p>Tiradas restantes: {{ gameStateService.getRollsLeft() }}</p>

    <div class="score-selection">
      <h3>Selecciona una jugada:</h3>
      <button *ngFor="let jugada of getJugadasDisponibles()"
              (click)="selectJugada(jugada)">
        {{ jugada }}
      </button>
    </div>

    <div class="score-summary">
      <h3>Puntuaciones:</h3>
      <ul>
        <li *ngFor="let jugada of getJugadasDisponibles()">
          {{ jugada }}: {{ scoreSelectionService.getScores()[jugada] }}
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  constructor(
    public diceService: DiceService,
    public gameStateService: GameStateService,
    public scoreSelectionService: ScoreSelectionService
  ) {}

  rollDice() {
    if (this.gameStateService.canRoll()) {
      this.diceService.rollDice();
      this.gameStateService.rollDice();
    }
  }

  resetGame() {
    this.gameStateService.resetGame();
    this.diceService.initializeDice();
  }

  selectJugada(jugada: string) {
    const dados = this.diceService.getDiceState().map(d => d.value);
    const jugadaSeleccionada = this.scoreSelectionService.selectScore(jugada, dados);
    if (jugadaSeleccionada) {
      this.resetGame(); 
    } else {
      alert('La jugada ya ha sido seleccionada.');
    }
  }

  getJugadasDisponibles() {
    return Object.keys(this.scoreSelectionService.getScores());
  }
}
