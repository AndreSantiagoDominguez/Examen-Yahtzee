import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  private diceState: { id: number, value: number, isLocked: boolean }[] = [];

  constructor() {
    this.initializeDice();
  }

  initializeDice() {
  
    this.diceState = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      value: this.rollDie(),
      isLocked: false
    }));
  }

  rollDice() {
    this.diceState.forEach(die => {
      if (!die.isLocked) {
        die.value = this.rollDie();
      }
    });
  }

  toggleLock(diceId: number) {
    const die = this.diceState.find(d => d.id === diceId);
    if (die) {
      die.isLocked = !die.isLocked;
    }
  }

  isLocked(diceId: number): boolean {
    const die = this.diceState.find(d => d.id === diceId);
    return die ? die.isLocked : false;
  }

  getDiceState() {
    return this.diceState;
  }

  private rollDie(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}
