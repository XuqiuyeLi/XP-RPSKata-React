import {Kata, Observer} from './Kata'

class SpyObserver implements Observer {
  p1Wins_wasCalled = false
  p2Wins_wasCalled = false
  draw_wasCalled = false

  p1Wins(): void {
    this.p1Wins_wasCalled = true
  }

  p2Wins(): void {
    this.p2Wins_wasCalled = true
  }

  draw(): void {
    this.draw_wasCalled = true
  }

  reset(): void {
    this.p1Wins_wasCalled = false
    this.p2Wins_wasCalled = false
    this.draw_wasCalled = false
  }
}

describe('Kata', () => {
  const observer = new SpyObserver()

  beforeEach(() => {
    observer.reset()
  })

  function verifyP1DidWin() {
    expect(observer.p1Wins_wasCalled).toBe(true)
    expect(observer.p2Wins_wasCalled).toBe(false)
    expect(observer.draw_wasCalled).toBe(false)
  }

  test('rock vs scissors', () => {
    new Kata().someMethod('rock', 'scissors', observer)

    verifyP1DidWin()
  })

  test('scissors vs rock', () => {
    new Kata().someMethod('scissors', 'rock', observer)

    expect(observer.p2Wins_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.draw_wasCalled).toBe(false)
  })

  test('scissors vs paper', () => {
    new Kata().someMethod('scissors', 'paper', observer)

    verifyP1DidWin()
  })

  test('scissors vs paper', () => {
    new Kata().someMethod('scissors', 'paper', observer)

    verifyP1DidWin()
  })

  test('paper vs scissors', () => {
    new Kata().someMethod('paper', 'scissors', observer)

    expect(observer.p2Wins_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.draw_wasCalled).toBe(false)
  })

  test('paper vs rock', () => {
    new Kata().someMethod('paper', 'rock', observer)

    verifyP1DidWin()
  })

  test('rock vs paper', () => {
    new Kata().someMethod('rock', 'paper', observer)

    expect(observer.p2Wins_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.draw_wasCalled).toBe(false)
  })

  test('rock vs rock', () => {
    new Kata().someMethod('rock', 'rock', observer)

    expect(observer.draw_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })

  test('paper vs paper', () => {
    new Kata().someMethod('paper', 'paper', observer)

    expect(observer.draw_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })

  test('scissors vs scissors', () => {
    new Kata().someMethod('scissors', 'scissors', observer)

    expect(observer.draw_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })
})
