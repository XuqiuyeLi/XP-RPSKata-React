import React, {ChangeEvent, FormEvent} from 'react';
import './App.css';
import {Master, Observer, Round} from './JunkenMaster/JankenMaster'

type JankenViewProps = {
  jankenMaster: Master
}

type JankenViewState = {
  p1: string,
  p2: string,
  result: string,
  historyMessage: string,
  history: Round[]
}

class JankenView extends React.Component<JankenViewProps, JankenViewState> implements Observer {
  constructor(props: JankenViewProps) {
    super(props);
    this.state = {
      p1: '',
      p2: '',
      result: '',
      historyMessage: '',
      history: []
    }
  }

  componentDidMount(): void {
    // アプリロード時にデータをロードする
  }

  handleJakenGameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.jankenMaster.judge(this.state.p1, this.state.p2, this)
  }

  p1DidWin(): void {
    this.setState({result: 'Player 1 Wins!'})
  }

  p1p2Tie(): void {
    this.setState({result: 'Tie!'})
  }

  p2Wins(): void {
    this.setState({result: 'Player 2 Wins!'})
  }

  displayHistory(history: Round[]): void {
  }

  displayHistoryEmpty(): void {
  }

  render() {
    return (
      <div className="App">
        <h1>Janken Game</h1>
        <form onSubmit={(event) => this.handleJakenGameSubmit(event)}>
          <label>
            Player 1:
            <input type="text" onChange={(event => this.handleP1Input(event))}/>
          </label>
          <label>
            Player 2:
            <input type="text" onChange={(event => this.handleP2Input(event))}/>
          </label>
          <button type="submit">Play</button>
        </form>

        <div>{this.state.result}</div>
      </div>
    )
  }

  private handleP1Input(event: ChangeEvent<HTMLInputElement>) {
    this.setState({p1: event.target.value})
  }

  private handleP2Input(event: ChangeEvent<HTMLInputElement>) {
    this.setState({p2: event.target.value})
  }
}

export default JankenView;
