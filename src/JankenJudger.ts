export interface Observer {
  p1DidWin(): void

  p2Wins(): void

  p1p2Tie(): void

  displayHistoryEmpty(): void

  displayHistory(history: any): void
}

export interface Judger {
  judge(p1: string, p2: string, observer: Observer): void
}

export interface HistoryRepo {
  isEmpty(): boolean

  getHistory(): any
  save(): void
}

export class JankenJudger implements Judger{
  judge(p1: string, p2: string, observer: Observer) {
    if (p1 === p2) {
      observer.p1p2Tie()
    } else if (p1 === 'rock' && p2 === 'scissors' ||
      p1 === 'scissors' && p2 === 'paper' ||
      p1 === 'paper' && p2 === 'rock') {
      observer.p1DidWin()
    } else if (p1 === 'scissors' ||
      p1 === 'paper' && p2 === 'scissors' ||
      p1 === 'rock' && p2 === 'paper'
    ) {
      observer.p2Wins()
    }
  }

  loadHistory(observer: Observer, repo: HistoryRepo) {
    if (repo.isEmpty()) {
      observer.displayHistoryEmpty()
    } else {
      const history = repo.getHistory()
      observer.displayHistory(history)
    }
  }
}