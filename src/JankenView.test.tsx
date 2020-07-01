import React from 'react'
import {render} from '@testing-library/react'
import JankenView from './JankenView'
import {Judger, Observer} from './JankenJudger'
import userEvent from '@testing-library/user-event'

class StubP1WinsJanken implements Judger {
  judge(p1: string, p2: string, observer: Observer): void {
    observer.p1DidWin()
  }
}

class StubP2WinsJanken implements Judger {
  judge(p1: string, p2: string, observer: Observer): void {
    observer.p2Wins()
  }
}

class StubP1P2TieJanken implements Judger {
  judge(p1: string, p2: string, observer: Observer): void {
    observer.p1p2Tie()
  }
}
// 1. have been called
// 2. parameters are correctly passed
class SpyJanken implements Judger {
  p1: string = ''
  p2: string = ''
  judgeWasCalled: boolean = false

  judge(p1: string, p2: string, observer: Observer): void {
    this.judgeWasCalled = true
    this.p1 = p1
    this.p2 = p2
  }
}

describe('JankenView', () => {
  test('タイトルを表示する', () => {
    const jankenJudger = new StubP1WinsJanken()
    const {queryByText} = render(<JankenView jankenJudger={jankenJudger}/>)
    const titleElement = queryByText('Janken Game')

    expect(titleElement).toBeInTheDocument()
  })

  test('P1Winsが呼ばれたら、その結果の文字列を表示する', () => {
    const jankenJudger = new StubP1WinsJanken()


    const jankenView = render(<JankenView jankenJudger={jankenJudger}/>)
    expect(jankenView.queryByText('Player 1 Wins!')).not.toBeInTheDocument()
    const button = jankenView.getByText('Play')
    userEvent.click(button)


    expect(jankenView.getByText('Player 1 Wins!')).toBeInTheDocument()
  })

  test('P2Winsが呼ばれたら、その結果の文字列を表示する', () => {
    const jankenJudger = new StubP2WinsJanken()


    const jankenView = render(<JankenView jankenJudger={jankenJudger}/>)
    expect(jankenView.queryByText('Player 2 Wins!')).not.toBeInTheDocument()
    const button = jankenView.getByText('Play')
    userEvent.click(button)


    expect(jankenView.getByText('Player 2 Wins!')).toBeInTheDocument()
  })

  test('P1P2Tieが呼ばれたら、その結果の文字列を表示する', () => {
    const jankenJudger = new StubP1P2TieJanken()


    const jankenView = render(<JankenView jankenJudger={jankenJudger}/>)
    expect(jankenView.queryByText('Tie!')).not.toBeInTheDocument()
    const button = jankenView.getByText('Play')
    userEvent.click(button)


    expect(jankenView.getByText('Tie!')).toBeInTheDocument()
  })

  test('Playボタンをクリックするとp1とp2の値をJankenに送る', () => {
    // arrange
    const jankenJudger = new SpyJanken()

    // action
    const jankenView = render(<JankenView jankenJudger={jankenJudger}/>)
    const p1Input = jankenView.getByLabelText('Player 1:', {selector: 'input'})
    userEvent.type(p1Input, 'rock')
    const p2Input = jankenView.getByLabelText('Player 2:', {selector: 'input'})
    userEvent.type(p2Input, 'paper')
    const button = jankenView.getByText('Play')
    userEvent.click(button)


    // assertion
    expect(jankenJudger.p1).toBe('rock')
    expect(jankenJudger.p2).toBe('paper')

  })
})

