import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square(props) {
      return (
          <button className="square" onClick={props.onClick}>
              {props.value}
          </button>

      );
  }
  
  class Board extends React.Component {

    handleClick(i) {
        // using slice(), we can avoid mutation
        const squares = this.state.squares.slice(); // creates a copy of squares 

        // if a winner exists OR a square has already been clicked, a user's click will be IGNORED
        if(calculateWinner(squares) || squares[i]) {
          return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares : squares,
          xIsNext : !this.state.xIsNext,
        });
    }

    // function that we call to re-render the square with a value
    renderSquare(i) {
      return (
          <Square 
            value={this.props.squares[i]}
            onClick = {() => this.props.onClick(i)}
          />
      );
    }
  
    render() {
      // const winner = calculateWinner(this.state.squares);
      // let status;
      // // if the winner is NOT null, a winner exists
      // if (winner) {
      //   status = 'Winner: ' + winner;
      // } else {
      //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
      // }
  
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    /* because we are looking back at the history of 
       different board states, we need to store the 
       history array in the Game component
    */

    constructor(props) {
      super(props);
      this.state = {
        history : [{
          squares : Array(9).fill(null),
        }],
        xIsNext : true,
      };
    }

    handleClick(i) {
      // using slice(), we can avoid mutation
      const history = this.state.history;
      const currBoard = history[history.length - 1];
      const squares = currBoard.squares.slice(); // creates a copy of squares 

      // if a winner exists OR a square has already been clicked, a user's click will be IGNORED
      if(calculateWinner(squares) || squares[i]) {
        return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        // we use CONCAT instead of push() for arrays because it doesn't mutate original array
        history : history.concat([{
          squares : squares,
        }]),
        xIsNext : !this.state.xIsNext,
      });
    }


    render() {
      const history = this.state.history;
      const currBoard = history[history.length - 1]; // accesses the most recent board in history
      const winner = calculateWinner(currBoard.squares); // check if there's a winner, in curr board

      // list of buttons that map to previous boards
      const moves = history.map((step,move) => {
        const desc = move ? 
          'Go to move #' + move : 
          'Go to game start';
         return (
           <li>
             <button onClick={() => this.jumpTo(move)}> {desc} </button>
           </li>
         )
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {currBoard.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }