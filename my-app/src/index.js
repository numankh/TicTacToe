import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    // allows us to store the state of the Square
    // constructor(props) {    
    //     super(props);   // parent class is the Board component
    //     this.state = {
    //         value : null,
    //     };
    // }

    render() {
      return (
        // When this button is clicked, we re-render given the props
        // and displays it by having {} within the button tag
        <button 
         className="square" 
         onClick={() => this.props.onClick()} // sets up a click event listener 
        >
          {this.props.value}    
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    // storing Game state within the Board
    constructor(props) {
        super(props); // parent class is the Game component
        this.state = {
            squares : Array(9).fill(null),
        };
    }

    handleClick(i) {
        // using slice(), we can avoid mutation
        const squares = this.state.squares.slice(); // creates a copy of squares 
        squares[i] = 'X';
        this.setState({squares : squares});
    }

    // function that we call to re-render the square with a value
    renderSquare(i) {
      return (
          <Square 
           value={this.state.squares[i]}
           onClick = {() => this.handleClick(i)}
          />
          );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  