export interface Observer {
  p1DidWin(): void

  p2Wins(): void

  p1p2Tie(): void

  displayHistoryEmpty(): void

  displayHistory(history: Round[]): void
}

export interface Master {
  judge(p1: string, p2: string, observer: Observer): void
  loadHistory(observer: Observer, repo: HistoryRepo): void
}

export interface HistoryRepo {
  isEmpty(): boolean
  getHistory(): Round[]
  save(): void
}

export class Round {
  p1: string
  p2: string
  result: string

  constructor(p1: string, p2: string, result: string) {
    this.p1 = p1
    this.p2 = p2
    this.result = result
  }
}

export class JankenMaster implements Master {
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