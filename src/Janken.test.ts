import {Janken, Observer} from './Janken'

class SpyObserver implements Observer {
  p1Wins_wasCalled = false
  p2Wins_wasCalled = false
  p1p2Tie_wasCalled = false

  p1Wins(): void {
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

  function verifyP1DidWin() {
    expect(observer.p1Wins_wasCalled).toBe(true)
    expect(observer.p2Wins_wasCalled).toBe(false)
    expect(observer.p1p2Tie_wasCalled).toBe(false)
  }

  test('rock vs scissors', () => {
    new Janken().judge('rock', 'scissors', observer)

    verifyP1DidWin()
  })

  test('scissors vs rock', () => {
    new Janken().judge('scissors', 'rock', observer)

    expect(observer.p2Wins_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p1p2Tie_wasCalled).toBe(false)
  })

  test('scissors vs paper', () => {
    new Janken().judge('scissors', 'paper', observer)

    verifyP1DidWin()
  })

  test('scissors vs paper', () => {
    new Janken().judge('scissors', 'paper', observer)

    verifyP1DidWin()
  })

  test('paper vs scissors', () => {
    new Janken().judge('paper', 'scissors', observer)

    expect(observer.p2Wins_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p1p2Tie_wasCalled).toBe(false)
  })

  test('paper vs rock', () => {
    new Janken().judge('paper', 'rock', observer)

    verifyP1DidWin()
  })

  test('rock vs paper', () => {
    new Janken().judge('rock', 'paper', observer)

    expect(observer.p2Wins_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p1p2Tie_wasCalled).toBe(false)
  })

  test('rock vs rock', () => {
    new Janken().judge('rock', 'rock', observer)

    expect(observer.p1p2Tie_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })

  test('paper vs paper', () => {
    new Janken().judge('paper', 'paper', observer)

    expect(observer.p1p2Tie_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })

  test('scissors vs scissors', () => {
    new Janken().judge('scissors', 'scissors', observer)

    expect(observer.p1p2Tie_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })
})
