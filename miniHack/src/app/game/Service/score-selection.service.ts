import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreSelectionService {
  private scores: { [key: string]: number | null } = {
    'ones': null,
    'twos': null,
    'threes': null,
    'fours': null,
    'fives': null,
    'sixes': null,
    'threeOfAKind': null,
    'fourOfAKind': null,
    'fullHouse': null,
    'smallStraight': null,
    'largeStraight': null,
    'yahtzee': null,
    'chance': null
  };

  constructor() {}

  getScores(): { [key: string]: number | null } {
    return this.scores;
  }

  selectScore(jugada: string, dados: number[]): boolean {
    if (this.scores[jugada] !== null) {
      return false; 
    }

    const puntuacion = this.calculateScore(jugada, dados);
    this.scores[jugada] = puntuacion;
    return true;
  }

  private calculateScore(jugada: string, dados: number[]): number {
    switch (jugada) {
      case 'ones':
        return dados.filter(d => d === 1).reduce((sum, d) => sum + d, 0);
      case 'twos':
        return dados.filter(d => d === 2).reduce((sum, d) => sum + d, 0);
      case 'threes':
        return dados.filter(d => d === 3).reduce((sum, d) => sum + d, 0);
      case 'fours':
        return dados.filter(d => d === 4).reduce((sum, d) => sum + d, 0);
      case 'fives':
        return dados.filter(d => d === 5).reduce((sum, d) => sum + d, 0);
      case 'sixes':
        return dados.filter(d => d === 6).reduce((sum, d) => sum + d, 0);
      case 'threeOfAKind':
        return this.hasOfAKind(dados, 3) ? dados.reduce((sum, d) => sum + d, 0) : 0;
      case 'fourOfAKind':
        return this.hasOfAKind(dados, 4) ? dados.reduce((sum, d) => sum + d, 0) : 0;
      case 'fullHouse':
        return this.isFullHouse(dados) ? 25 : 0;
      case 'smallStraight':
        return this.isSmallStraight(dados) ? 30 : 0;
      case 'largeStraight':
        return this.isLargeStraight(dados) ? 40 : 0;
      case 'yahtzee':
        return this.hasOfAKind(dados, 5) ? 50 : 0;
      case 'chance':
        return dados.reduce((sum, d) => sum + d, 0);
      default:
        return 0;
    }
  }
  
  
  private hasOfAKind(dados: number[], count: number): boolean {
    const counts = this.getDiceCounts(dados);
    return Object.values(counts).some(c => c >= count);
  }
  
  private isFullHouse(dados: number[]): boolean {
    const counts = this.getDiceCounts(dados);
    const values = Object.values(counts);
    return values.includes(3) && values.includes(2);
  }
  
  private isSmallStraight(dados: number[]): boolean {
    const uniqueDados = Array.from(new Set(dados)).sort();
    const straights = [
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6]
    ];
    return straights.some(straight => straight.every(num => uniqueDados.includes(num)));
  }
  
  private isLargeStraight(dados: number[]): boolean {
    const uniqueDados = Array.from(new Set(dados)).sort();
    return (
      (uniqueDados.length === 5 && uniqueDados.every((num, idx) => num === uniqueDados[0] + idx))
    );
  }
  
  private getDiceCounts(dados: number[]): { [key: number]: number } {
    return dados.reduce((counts, die) => {
      counts[die] = (counts[die] || 0) + 1;
      return counts;
    }, {} as { [key: number]: number });
  }
  
}
