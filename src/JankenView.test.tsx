import React from 'react'
import {render} from '@testing-library/react'
import JankenView from './JankenView'
import {HistoryRepo, Master, Observer, Round} from './JunkenMaster/JankenMaster'
import userEvent from '@testing-library/user-event'

class StubP1WinsJanken implements Master {
  judge(p1: string, p2: string, observer: Observer): void {
    observer.p1DidWin()
  }

  loadHistory(observer: Observer, repo: HistoryRepo): void {
  }
}

class StubP2WinsJanken implements Master {
  judge(p1: string, p2: string, observer: Observer): void {
    observer.p2Wins()
  }

  loadHistory(observer: Observer, repo: HistoryRepo): void {
  }
}

class StubP1P2TieJanken implements Master {
  judge(p1: string, p2: string, observer: Observer): void {
    observer.p1p2Tie()
  }

  loadHistory(observer: Observer, repo: HistoryRepo): void {
  }
}

class SpyJanken implements Master {
  p1: string = ''
  p2: string = ''
  judgeWasCalled: boolean = false

  judge(p1: string, p2: string, observer: Observer): void {
    this.judgeWasCalled = true
    this.p1 = p1
    this.p2 = p2
  }

  loadHistory(observer: Observer, repo: HistoryRepo): void {
  }
}

class EmptyHistoryStubHistoryLoader implements Master {
  loadHistory(observer: Observer, repo: HistoryRepo): void {
    observer.displayHistoryEmpty()
  }

  judge(p1: string, p2: string, observer: Observer): void {
  }
}

class FullHistoryStubHistoryLoader implements Master {
  judge(p1: string, p2: string, observer: Observer): void {
  }

  loadHistory(observer: Observer, repo: HistoryRepo): void {
    observer.displayHistory([
        new Round('rock', 'scissors', 'p1Wins'),
        new Round('paper', 'paper', 'p1p2Tie')
      ]
    )
  }
}

describe('JankenView', () => {
  test('タイトルを表示する', () => {
    const jankenJudger = new StubP1WinsJanken()
    const {queryByText} = render(<JankenView jankenMaster={jankenJudger}/>)
    const titleElement = queryByText('Janken Game')

    expect(titleElement).toBeInTheDocument()
  })

  describe('ゲーム', () => {
    test('P1Winsが呼ばれたら、その結果の文字列を表示する', () => {
      const jankenJudger = new StubP1WinsJanken()


      const jankenView = render(<JankenView jankenMaster={jankenJudger}/>)
      expect(jankenView.queryByText('Player 1 Wins!')).not.toBeInTheDocument()
      const button = jankenView.getByText('Play')
      userEvent.click(button)


      expect(jankenView.getByText('Player 1 Wins!')).toBeInTheDocument()
    })

    test('P2Winsが呼ばれたら、その結果の文字列を表示する', () => {
      const jankenJudger = new StubP2WinsJanken()


      const jankenView = render(<JankenView jankenMaster={jankenJudger}/>)
      expect(jankenView.queryByText('Player 2 Wins!')).not.toBeInTheDocument()
      const button = jankenView.getByText('Play')
      userEvent.click(button)


      expect(jankenView.getByText('Player 2 Wins!')).toBeInTheDocument()
    })

    test('P1P2Tieが呼ばれたら、その結果の文字列を表示する', () => {
      const jankenJudger = new StubP1P2TieJanken()


      const jankenView = render(<JankenView jankenMaster={jankenJudger}/>)
      expect(jankenView.queryByText('Tie!')).not.toBeInTheDocument()
      const button = jankenView.getByText('Play')
      userEvent.click(button)


      expect(jankenView.getByText('Tie!')).toBeInTheDocument()
    })

    test('Playボタンをクリックするとp1とp2の値をJankenに送る', () => {
      // arrange
      const jankenJudger = new SpyJanken()

      // action
      const jankenView = render(<JankenView jankenMaster={jankenJudger}/>)
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

  describe('History', () => {
    test('Historyが無い場合の表示をする', () => {
      const jankenMaster = new EmptyHistoryStubHistoryLoader()


      const jankenView = render(<JankenView jankenMaster={jankenMaster}/>)


      expect(jankenView.queryByText('No History')).toBeInTheDocument()
    })

    test('Historyがある場合、Roundsの内容を表示する', () => {
      const jankenMaster = new FullHistoryStubHistoryLoader()


      const jankenView = render(<JankenView jankenMaster={jankenMaster}/>)


      expect(jankenView.queryByText('rock scissors p1Wins')).toBeInTheDocument()
      expect(jankenView.queryByText('paper paper p1p2Tie')).toBeInTheDocument()
    })
  })
})
　
// JankenView with StubMaster, SpyMaster　　 2
// JankenMaster with StubRepo  1
// LocalHistoryRepo　3

// JankenView with JankenMaster with StubRepo           (integration)
// JankenMaster with LocalHistoryRepo                   (integration)
// JankenView with JankenMaster with LocalHistoryRepo   E2E (End to end)

// FakeHistoryRepo passes HistoryRepoTest
// RealHistoryRepo passes HistoryRepoTest