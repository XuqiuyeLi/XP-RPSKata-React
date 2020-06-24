import React from 'react'
import {render} from '@testing-library/react'
import JankenView from './JankenView'
import {Judger, Observer} from './Janken'
import userEvent from '@testing-library/user-event'

class StubP1WinsJanken implements Judger {
  judge(p1: string, p2: string, observer: Observer): void {
    observer.p1Wins()
  }
}

describe('JankenView', () => {
  test('タイトルを表示する', () => {
    const janken = new StubP1WinsJanken()
    const {queryByText} = render(<JankenView janken={janken}/>)
    const titleElement = queryByText('Janken Game')

    expect(titleElement).toBeInTheDocument()
  })

  test('P1Winsが呼ばれたら、その結果の文字列を表示する', () => {
    const janken = new StubP1WinsJanken()


    const jankenView = render(<JankenView janken={janken}/>)
    expect(jankenView.queryByText('Player 1 Wins!')).not.toBeInTheDocument()
    const button = jankenView.getByText('Play')
    userEvent.click(button)


    expect(jankenView.getByText('Player 1 Wins!')).toBeInTheDocument()
  })

  test('P2Winsが呼ばれたら、その結果の文字列を表示する', () => {

  })

  test('P1P2Tieが呼ばれたら、その結果の文字列を表示する', () => {

  })

  test('Playボタンをクリックするとp1とp2の値をJankenに送る', () => {

  })
})

