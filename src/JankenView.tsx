import React, {ChangeEvent} from 'react';
import './App.css';
import {Judger, Observer} from './JankenJudger'

type JankenViewProps = {
  jankenJudger: Judger
}

type JankenViewState = {
  p1: string
  p2: string
  result: string
}

class JankenView extends React.Component<JankenViewProps, JankenViewState> implements Observer {
  constructor(props: JankenViewProps) {
    super(props);
    this.state = {
      p1: '',
      p2: '',
      result: ''
    }
  }

  playButtonClicked() {
    this.props.jankenJudger.judge('', '', this)
  }

  p1Wins(): void {
    this.setState({result: 'Player 1 Wins!'})
  }

  p1p2Tie(): void {
    this.setState({result: 'Tie!'})
  }

  p2Wins(): void {
    this.setState({result: 'Player 2 Wins!'})
  }

  render() {
    return (
      <div className="App">
        <h1>Janken Game</h1>
        <form>
          <label>
            Player 1:
            <input type="text" onChange={(event => this.handleP1Input(event))}/>
          </label>
          <label>
            Player 2:
            <input type="text" onChange={(event => this.handleP2Input(event))}/>
          </label>
          <button onClick={() => this.playButtonClicked()}>Play</button>
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
