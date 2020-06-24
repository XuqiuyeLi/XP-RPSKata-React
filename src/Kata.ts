export interface Observer {
  p1Wins(): void

  p2Wins(): void
}

export class Kata {
  someMethod(player1: string, player2: string, observer: Observer) {
    if (player1 === 'rock') {
      observer.p1Wins()
    } else if (player1 === 'scissors') {
      observer.p2Wins()
    }
  }
}