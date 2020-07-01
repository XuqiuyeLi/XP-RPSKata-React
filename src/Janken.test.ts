import {HistoryRepo, JankenJudger, Observer} from './JankenJudger'

class SpyObserver implements Observer {
  p1Wins_wasCalled = false
  p2Wins_wasCalled = false
  p1p2Tie_wasCalled = false

  p1DidWin(): void {
    this.p1Wins_wasCalled = true
  }

  p2Wins(): void {
    this.p2Wins_wasCalled = true
  }

  p1p2Tie(): void {
    this.p1p2Tie_wasCalled = true
  }

  reset(): void {
    this.p1Wins_wasCalled = false
    this.p2Wins_wasCalled = false
    this.p1p2Tie_wasCalled = false
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
      new JankenJudger().judge('rock', 'scissors', observer)

      verifyP1DidWin()
    })

    test('scissors vs rock', () => {
      new JankenJudger().judge('scissors', 'rock', observer)

      expect(observer.p2Wins_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p1p2Tie_wasCalled).toBe(false)
    })

    test('scissors vs paper', () => {
      new JankenJudger().judge('scissors', 'paper', observer)

      verifyP1DidWin()
    })

    test('scissors vs paper', () => {
      new JankenJudger().judge('scissors', 'paper', observer)

      verifyP1DidWin()
    })

    test('paper vs scissors', () => {
      new JankenJudger().judge('paper', 'scissors', observer)

      expect(observer.p2Wins_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p1p2Tie_wasCalled).toBe(false)
    })

    test('paper vs rock', () => {
      new JankenJudger().judge('paper', 'rock', observer)

      verifyP1DidWin()
    })

    test('rock vs paper', () => {
      new JankenJudger().judge('rock', 'paper', observer)

      expect(observer.p2Wins_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p1p2Tie_wasCalled).toBe(false)
    })

    test('rock vs rock', () => {
      new JankenJudger().judge('rock', 'rock', observer)

      expect(observer.p1p2Tie_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p2Wins_wasCalled).toBe(false)
    })

    test('paper vs paper', () => {
      new JankenJudger().judge('paper', 'paper', observer)

      expect(observer.p1p2Tie_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p2Wins_wasCalled).toBe(false)
    })

    test('scissors vs scissors', () => {
      new JankenJudger().judge('scissors', 'scissors', observer)

      expect(observer.p1p2Tie_wasCalled).toBe(true)
      expect(observer.p1Wins_wasCalled).toBe(false)
      expect(observer.p2Wins_wasCalled).toBe(false)
    })
  })

  describe('history', () => {
    class EmptyStubHistoryRepo implements HistoryRepo {
      isEmpty(): boolean {
        return false
      }
    }

    const jankenJudger = new JankenJudger()

    test('if no one has played', () => {
      const repo = new EmptyStubHistoryRepo()


      jankenJudger.loadHistory(observer, repo)


      expect(observer.displayHistoryEmpty_wasCalled).toBe(true)
    })

    test('if games have been played', () => {
      const repo = // stub with [{p1: 'rock', p2: 'paper', result: 'scissors'}]


      jankenJudger.loadHistory(observer, repo)


      expect(observer.displayHistory(// same history as stub))
    })
  })
})
