export interface Observer {
  p1Wins(): void

  p2Wins(): void

  p1p2Tie(): void
}

export interface Judger {
  judge(p1: string, p2: string, observer: Observer): void
}

export class JankenJudger implements Judger{
  judge(p1: string, p2: string, observer: Observer) {
    if (p1 === p2) {
      observer.p1p2Tie()
    } else if (p1 === 'rock' && p2 === 'scissors' ||
      p1 === 'scissors' && p2 === 'paper' ||
      p1 === 'paper' && p2 === 'rock') {
      observer.p1Wins()
    } else if (p1 === 'scissors' ||
      p1 === 'paper' && p2 === 'scissors' ||
      p1 === 'rock' && p2 === 'paper'
    ) {
      observer.p2Wins()
    }
  }
}