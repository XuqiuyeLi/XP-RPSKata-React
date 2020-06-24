import {Kata, Observer} from './Kata'

class SpyObserver implements Observer {
  p1Wins_wasCalled = false
  p2Wins_wasCalled = false

  p1Wins(): void {
    this.p1Wins_wasCalled = true
  }

  p2Wins(): void {
    this.p2Wins_wasCalled = true
  }
}

describe('1st test suite', () => {
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
})
