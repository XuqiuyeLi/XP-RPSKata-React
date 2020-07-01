import React, {ChangeEvent, FormEvent} from 'react';
import './App.css';
import {HistoryRepo, Master, Observer, Round} from './JunkenMaster/JankenMaster'

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

class LocalHistoryRepo implements HistoryRepo {
  getHistory(): Round[] {
    return [];
  }

  isEmpty(): boolean {
    return false;
  }

  save(): void {
  }
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
    this.props.jankenMaster.loadHistory(this, new LocalHistoryRepo())
  }

  handleJankenGameSubmit(event: FormEvent<HTMLFormElement>) {
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
    this.setState({historyMessage: 'No History'})
  }

  render() {
    return (
      <div className="App">
        <h1>Janken Game</h1>
        <form onSubmit={(event) => this.handleJankenGameSubmit(event)}>
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

        <h1>History</h1>
        <div>
          <div>{this.state.historyMessage}</div>
        </div>
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
