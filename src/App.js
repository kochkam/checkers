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
        RedIsNext: true,
        invalid: false,
        currentSpace: null,
        move: null,
        moveM: false,
        doubcord: null,
        wrongDjump:false,
      };
    }
    validateBDouble(i,squares){
      let dleftMove = i + 14;
      let drightMove = i + 18;

      if(dleftMove < 64){
        if((squares[dleftMove].props.className === "empty" && squares[dleftMove - 7].props.className === "circleRed")){
          return dleftMove;
        }
      }
      if (drightMove < 64){
        if ((squares[drightMove].props.className === "empty" && squares[drightMove - 9].props.className === "circleRed")){
          return drightMove;
      }
    }
      return null;

    }
    validateBlackMove(i, squares){
      let leftMove = this.state.currentSpace + 7;
      let rightMove = this.state.currentSpace + 9;
      let takeP = null;
      let valid = null;
      let again = false;
      let dcord = null; 
      if (this.state.doubcord !== null && i !== this.state.doubcord) {
        valid = false; 
      }
      else if((i === leftMove && leftMove < 64) || (i === rightMove && leftMove < 64)){
        valid = true;
      }
      else if((i === leftMove + 7 && leftMove + 7 < 64) || (i=== rightMove + 9 && leftMove + 9 < 64)){
        if (squares[leftMove].props.className === "circleRed"  && leftMove + 7 === i ) {
          takeP = leftMove
        }
        else if(squares[rightMove].props.className === "circleRed"  && rightMove + 9 === i){
          takeP = rightMove
        }
        if (this.validateBDouble(i,squares) != null) {
          again = true
          dcord = this.validateBDouble(i,squares)
      
        }
        valid = true;
      }
        
        squares[i] = <div className="circle"></div>;
        squares[this.state.currentSpace] = <div className="empty"></div>
        if (takeP !== null) {
          squares[takeP] = <div className="empty"></div>
        }

        if (valid === true && again === false) {
          this.setState({
            squares: squares,
            RedIsNext: !this.state.RedIsNext,
            invalid: false,
            currentSpace: null,
            move: true,
            moveM: false,
            doubcord: null,
          })
        }
        else if(valid === true && again === true){
          this.setState({
            squares: squares,
            invalid: false,
            currentSpace: i,
            move: true,
            moveM: true,
            doubcord: dcord,
          })
        }
        else if(valid === false && this.state.doubcord !== null && i !== this.state.doubcord)
        {
          this.setState({
            wrongDjump: true,
          })

        }
        
        else{
          this.setState({
            move: false,
          })
        }
      

    }
    
    validateRDouble(i,squares){
      let dleftMove = i - 14;
      let drightMove = i - 18;

        if(dleftMove > 0){
          if((squares[dleftMove].props.className === "empty" && squares[dleftMove + 7].props.className === "circle")){
            return dleftMove;
        }
      }
        if(drightMove > 0){
          if ((squares[drightMove].props.className === "empty" && squares[drightMove + 9].props.className === "circle")){
            return drightMove
          }
        }
      return null;

    }

    validateRedMove(i,squares){
      let leftMove = this.state.currentSpace - 7;
      let rightMove = this.state.currentSpace - 9;
      let takeP = null;
      let valid = null;
      let again = false;
      let dcord = null; 
      if (this.state.doubcord !== null && i !== this.state.doubcord) {
        valid = false; 
      }
      else if((i === leftMove && leftMove > 0) || (i === rightMove && leftMove > 0)){
        valid = true
      }
      else if((i === leftMove - 7 && leftMove - 7 > 0) || (i === rightMove - 9 && rightMove - 9 > 0)){
        if (squares[leftMove].props.className === "circle" && leftMove - 7 === i){
          takeP = leftMove  
        }
        else if(squares[rightMove].props.className === "circle" && rightMove - 9 === i){
          takeP = rightMove
        }
        if (this.validateRDouble(i,squares) !== null) {
          again = true
          dcord = this.validateRDouble(i,squares)
        }
        valid = true;
      }
      squares[i] = <div className="circleRed"></div>;
      squares[this.state.currentSpace] = <div className="empty"></div>
      if (takeP !== null) {
        squares[takeP] = <div className="empty"></div>
      }
      if (valid === true && again === false) {
        this.setState({
          squares: squares,
          RedIsNext: !this.state.RedIsNext,
          invalid: false,
          currentSpace: null,
          move: true,
          moveM: false,
          doubcord: null,
          })
        }
      else if(valid === true && again === true){
          this.setState({
            squares: squares,
            invalid: false,
            currentSpace: i,
            move: true,
            moveM: true,
            doubcord: dcord,
          })
        }
      else if(valid === false && this.state.doubcord !== null && i !== this.state.doubcord){
          this.setState({
            wrongDjump: true,
          })

        }      
      else{
        this.setState({
          move: false,
          })
        }
      
    }

    
    checkRselection(i,squares){
      let leftMove = i - 7;
      let rightMove = i - 9;


      if (i === 55){
        if(squares[i-9].props.className === "empty")
          return true;
        else  
          return false; 
      }
      if((leftMove > 0 && squares[leftMove].props.className === "empty") || (rightMove > 0 && squares[rightMove].props.className === "empty")){
        return true
      }
      else{
        return false
      }
    }

    checkBselection(i,squares){
      let leftMove = i + 7;
      let rightMove = i + 9;

      if (i === 8){
        if(squares[i+9].props.className === "empty")
          return true;
        else  
          return false; 
      }

      if((leftMove < 64 && squares[leftMove].props.className === "empty") || (leftMove < 64 && squares[rightMove].props.className === "empty")){
        return true;
      }
      else 
        return false;

    }
    selectSpace(i, squares){
      if (this.state.RedIsNext === true && squares[i].props.className === "circle" && this.checkBselection(i,squares) === true) {
        squares[i] = <div className="circle"></div>;
        this.setState({
          squares: squares,
          invalid: false,
          currentSpace: i,
        });
        
      }
      else if (this.state.RedIsNext === false && squares[i].props.className === "circleRed" && this.checkRselection(i,squares) === true) {
        
        squares[i] = <div className="circleRed"></div>;
        this.setState({
          squares: squares,
          invalid: false,
          currentSpace: i,
        });

      }
      else{
        this.setState({
          squares: squares,
          invalid: true,
        })
      }

    }

    movePiece(i, squares){

      if (squares[i].props.className === "empty") {
        if (this.state.RedIsNext === true){
          this.validateBlackMove(i,squares)
        }

        else if (this.state.RedIsNext === false){
          this.validateRedMove(i,squares)
        }
        else{
          this.setState({
            move: false,
          })
        }
      }

      else{
        this.setState({
          move: false,
        })
      }
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();

      if (this.state.currentSpace == null) {
      
      this.selectSpace(i,squares)

      }

      else if (this.state.currentSpace !== null) {
       this.movePiece(i,squares)
      } 
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
      let counter = 0;
      let move = null;
      let rows = [];
      let invalid = null;
      let moveAgain = null;
      let wrongDjmp= null;
      for(let i = 0; i < 8; i++){
        const cells = []
        for (let x = 0; x < 8; x++){
          if((counter % 2 === 0 && rows.length % 2 === 0) || (rows.length % 2 !== 0 && counter % 2 !== 0))
            cells.push(this.renderSquare(counter))
          else
            cells.push(this.renderSquareAlt(counter))

          counter = counter + 1
        }
        rows.push(<div className="board-row">{cells}</div>)
      }
      const status = 'Current player: ' + (this.state.RedIsNext ? "Black" : "Red");
      if (this.state.invalid === true) {
        invalid = "Invalid piece select a valid piece."
      }
      else if (this.state.invalid === false) {
        invalid =  ""
      } 

      if(this.state.move === true){
        move = ""
      }
      else if (this.state.move === false){
        move = "Invalid move please move your piece forward one space diagonally."
      }
      if(this.state.moveM === true){
        moveAgain = "Good move! Please make the next valid double jump available to you."
      }
      else if (this.state.moveM === false)
      {
        moveAgain = ""
      }
      if(this.state.wrongDjump === true){
        wrongDjmp = "Invalid move. You must make the double jump available to you. "
      }
      else{
        wrongDjmp = ""
      }
      
      
      return (
        <div>
          <div className="status">{status}</div>
          <div>{invalid}</div>
          <div>{move}</div>
          <div>{moveAgain}</div>
          <div>{wrongDjmp}</div>
          <div>
            {rows}
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

  export default Game
  
  // ========================================
  

