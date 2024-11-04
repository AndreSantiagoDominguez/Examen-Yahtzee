import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private rollsLeft: number = 3;

  constructor() {}

  resetGame(): void {
    this.rollsLeft = 3; 
   
  }

  

  rollDice() {
    if (this.rollsLeft > 0) {
      this.rollsLeft--;
    }
  }

  getRollsLeft(): number {
    return this.rollsLeft;
  }

  canRoll(): boolean {
    return this.rollsLeft > 0;
  }
}
