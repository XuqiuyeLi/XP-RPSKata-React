import {HistoryRepo, JankenMaster, Observer, Round} from './JankenMaster'

class SpyObserver implements Observer {
  p1Wins_wasCalled = false
  p2Wins_wasCalled = false
  p1p2Tie_wasCalled = false
  displayHistoryEmpty_wasCalled = false
  displayHistory_wasCalledWithHistory: Round[] | boolean = false

  p1DidWin(): void {
    this.p1Wins_wasCalled = true
  }

  p2Wins(): void {
    this.p2Wins_wasCalled = true
  }

  p1p2Tie(): void {
    this.p1p2Tie_wasCalled = true
  }

  displayHistory(history: any): void {
    this.displayHistory_wasCalledWithHistory = history
  }

  displayHistoryEmpty(): void {
    this.displayHistoryEmpty_wasCalled = true
  }

  reset(): void {
    this.p1Wins_wasCalled = false
    this.p2Wins_wasCalled = false
    this.p1p2Tie_wasCalled = false
    this.displayHistoryEmpty_wasCalled = false
    this.displayHistory_wasCalledWithHistory = false
  }
}

describe('Janken', () => {
  const observer = new SpyObserver()

  beforeEach(() => {
    observer.reset()
  })

  describe('judge', () => {

    function verifyP1DidWin() {
      expect(observer.p1Wins_wasCalled).toBe(true)
      expect(observer.p2Wins_wasCalled).toBe(false)
      expect(observer.p1p2Tie_wasCalled).toBe(false)
    }

    test('rock vs scissors', () => {
      new JankenMaster().judge('rock', 'scissors', observer)

      verifyP1DidWin()
    })

    test('scissors vs rock', () => {
      new JankenMaster().judge('scissors', 'rock', observer)

      expect(observer.p2Wins_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p1p2Tie_wasCalled).toBe(false)
    })

    test('scissors vs paper', () => {
      new JankenMaster().judge('scissors', 'paper', observer)

      verifyP1DidWin()
    })

    test('scissors vs paper', () => {
      new JankenMaster().judge('scissors', 'paper', observer)

      verifyP1DidWin()
    })

    test('paper vs scissors', () => {
      new JankenMaster().judge('paper', 'scissors', observer)

      expect(observer.p2Wins_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p1p2Tie_wasCalled).toBe(false)
    })

    test('paper vs rock', () => {
      new JankenMaster().judge('paper', 'rock', observer)

      verifyP1DidWin()
    })

    test('rock vs paper', () => {
      new JankenMaster().judge('rock', 'paper', observer)

      expect(observer.p2Wins_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p1p2Tie_wasCalled).toBe(false)
    })

    test('rock vs rock', () => {
      new JankenMaster().judge('rock', 'rock', observer)

      expect(observer.p1p2Tie_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p2Wins_wasCalled).toBe(false)
    })

    test('paper vs paper', () => {
      new JankenMaster().judge('paper', 'paper', observer)

      expect(observer.p1p2Tie_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p2Wins_wasCalled).toBe(false)
    })

    test('scissors vs scissors', () => {
      new JankenMaster().judge('scissors', 'scissors', observer)

      expect(observer.p1p2Tie_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p2Wins_wasCalled).toBe(false)
    })
  })

  describe('history', () => {
    class EmptyStubHistoryRepo implements HistoryRepo {
      isEmpty(): boolean {
        return true
      }

      getHistory(): Round[] {
        return [];
      }

      save(): void {
      }
    }

    class FullStubHistoryRepo implements HistoryRepo {
      isEmpty(): boolean {
        return false;
      }

      getHistory(): Round[] {
        return [
          new Round('rock','scissors','p1Wins'),
          new Round('rock','rock','p1P2Tie')
        ]
      }

      save(): void {
      }
    }

    const jankenJudger = new JankenMaster()

    test('if no one has played', () => {
      const repo = new EmptyStubHistoryRepo()


      jankenJudger.loadHistory(observer, repo)


      expect(observer.displayHistoryEmpty_wasCalled).toBe(true)
      expect(observer.displayHistory_wasCalledWithHistory).toBe(false)
    })

    test('if games have been played', () => {
      const repo = new FullStubHistoryRepo()


      jankenJudger.loadHistory(observer, repo)


      expect(observer.displayHistory_wasCalledWithHistory).toEqual([
        new Round('rock','scissors','p1Wins'),
        new Round('rock','rock','p1P2Tie')
      ])
      expect(observer.displayHistoryEmpty_wasCalled).toBe(false)
    })
  })
})
