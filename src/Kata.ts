export interface Observer {
  p1Wins(): void

  p2Wins(): void

  draw(): void
}

export class Kata {
  someMethod(player1: string, player2: string, observer: Observer) {
    if (player1 === player2) {
      observer.draw()
    } else if (player1 === 'rock' && player2 === 'scissors' ||
      player1 === 'scissors' && player2 === 'paper' ||
      player1 === 'paper' && player2 === 'rock') {
      observer.p1Wins()
    } else if (player1 === 'scissors' ||
      player1 === 'paper' && player2 === 'scissors' ||
      player1 === 'rock' && player2 === 'paper'
    ) {
      observer.p2Wins()
    }
  }
}