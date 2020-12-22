import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import checkerArray from './array.js'

  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  function AltSquare(props){
    return(
      <button className="darksquare" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }

  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares:  new checkerArray().squares,
        xIsNext: true,
      };
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();

      squares[i] = this.state.xIsNext ? <div className="circle"></div> : <div className="circleRed"></div>;
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }

    renderSquareAlt(i) {
      return (
        <AltSquare
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }


  
    render() {
      let counter = 0
      let rows = []
      for(let i = 0; i < 8; i++){
        const cells = []
        for (let x = 0; x < 8; x++){
          if((counter % 2 == 0 && rows.length % 2 == 0) || (rows.length % 2 != 0 && counter % 2 != 0))
            cells.push(this.renderSquare(counter))
          else
            cells.push(this.renderSquareAlt(counter))

          counter = counter + 1
        }
        rows.push(<div className="board-row">{cells}</div>)
      }


      return (

        <div>
          {rows}
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

  export default Game
  
  // ========================================
  