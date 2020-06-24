import React from 'react';
import './App.css';
import {Judger, Observer} from './Janken'

type JankenViewProps = {
  janken: Judger
}

type JankenViewState = {
  result: string
}

class JankenView extends React.Component<JankenViewProps, JankenViewState> implements Observer {
  constructor(props: JankenViewProps) {
    super(props);
    this.state = {
      result: ''
    }
  }

  playButtonClicked() {
    this.props.janken.judge('', '', this)
  }

  p1Wins(): void {
    this.setState({result: 'Player 1 Wins!'})
  }

  p1p2Tie(): void {
  }

  p2Wins(): void {
  }

  render() {
    return (
      <div className="App">
        <h1>Janken Game</h1>
        <button onClick={() => this.playButtonClicked()}>Play</button>
        <div>{this.state.result}</div>
      </div>
    )
  }
}

export default JankenView;
