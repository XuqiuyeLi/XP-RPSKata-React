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
}

describe('Kata', () => {
  test('rock vs scissors', () => {
    const observer = new SpyObserver()
    new Kata().someMethod('rock', 'scissors', observer)

    expect(observer.p1Wins_wasCalled).toBe(true)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })

  test('scissors vs rock', () => {
    const observer = new SpyObserver()
    new Kata().someMethod('scissors', 'rock', observer)

    expect(observer.p2Wins_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
  })

  test('scissors vs paper', () => {
    const observer = new SpyObserver()
    new Kata().someMethod('scissors', 'paper', observer)

    expect(observer.p1Wins_wasCalled).toBe(true)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })

  test('scissors vs paper', () => {
    const observer = new SpyObserver()
    new Kata().someMethod('scissors', 'paper', observer)

    expect(observer.p1Wins_wasCalled).toBe(true)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })

  test('paper vs scissors', () => {
    const observer = new SpyObserver()
    new Kata().someMethod('paper', 'scissors', observer)

    expect(observer.p2Wins_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
  })

  test('paper vs rock', () => {
    const observer = new SpyObserver()
    new Kata().someMethod('paper', 'rock', observer)

    expect(observer.p1Wins_wasCalled).toBe(true)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })

  test('rock vs paper', () => {
    const observer = new SpyObserver()
    new Kata().someMethod('rock', 'paper', observer)

    expect(observer.p2Wins_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
  })

  test('rock vs rock', () => {
    const observer = new SpyObserver()
    new Kata().someMethod('rock', 'rock', observer)

    expect(observer.draw_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })

  test('paper vs paper', () => {
    const observer = new SpyObserver()
    new Kata().someMethod('paper', 'paper', observer)

    expect(observer.draw_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })

  test('scissors vs scissors', () => {
    const observer = new SpyObserver()
    new Kata().someMethod('scissors', 'scissors', observer)

    expect(observer.draw_wasCalled).toBe(true)
    expect(observer.p1Wins_wasCalled).toBe(false)
    expect(observer.p2Wins_wasCalled).toBe(false)
  })
})
