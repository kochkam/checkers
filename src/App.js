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
    selectState(squares,valid,again,i,dcord){
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
    validateBlkKing(i,squares){
      let leftMove = this.state.currentSpace + 7;
      let rightMove = this.state.currentSpace + 9;
      let altRightMove = this.state.currentSpace - 7;
      let altLeftMove = this.state.currentSpace - 9;

      if((leftMove < 64 && leftMove === i) || (rightMove < 64 && squares[rightMove].props.className === "empty") || (altRightMove > 0 && squares[altRightMove].props.className === "empty") || (altLeftMove > 0 && squares[altLeftMove].props.className === "empty")){
        return true;
      }
      else if((leftMove < 64 && squares[leftMove + 7].props.className === "empty" && (squares[leftMove].props.className === "circleRed" || squares[leftMove].props.className === "redKing")) || (rightMove < 64 && squares[rightMove + 9].props.className === "empty" && (squares[rightMove].props.className === "circleRed" || squares[rightMove].props.className === "redKing"))){
        return true;
      }
      else if((altLeftMove > 0 && squares[altLeftMove - 7].props.className === "empty" && (squares[altLeftMove].props.className === "circleRed" || squares[altLeftMove].props.className === "redKing")) || (altRightMove > 0 && squares[altRightMove - 9].props.className === "empty" && (squares[altRightMove].props.className === "circleRed" || squares[altRightMove].props.className === "redKing"))){
        return true;
      }
      else{
        return false; 
      }

    }
    validateBlackMove(i, squares){
      let leftMove = this.state.currentSpace + 7;
      let rightMove = this.state.currentSpace + 9;
      let takeP = null;
      let valid = null;
      let again = false;
      let dcord = null; 
      let kingPiece = squares[this.state.currentSpace].props.className;

      if (this.state.doubcord !== null && i !== this.state.doubcord) {
        valid = false; 
      }
      else if (kingPiece === "blackKing"){
        valid = this.checkBselection(this.state.currentSpace,squares)
        if(valid === true){
          takeP = this.validateBlkKing(i,squares)}
        if (this.validateBDouble(i,squares) != null) {
          again = true
          dcord = this.validateBDouble(i,squares)
        }
      }
      else if((i === leftMove && leftMove < 64) || (i === rightMove && leftMove < 64)){
        valid = true;
      }
      else if((i === leftMove + 7 && leftMove + 7 < 64) || (i=== rightMove + 9 && leftMove + 9 < 64)){
        if ((squares[leftMove].props.className === "circleRed" || squares[leftMove].props.className === "redKing")  && leftMove + 7 === i ) {
          takeP = leftMove
        }
        else if((squares[rightMove].props.className === "circleRed" || squares[leftMove].props.className === "redKing") && rightMove + 9 === i){
          takeP = rightMove
        }
        if (this.validateBDouble(i,squares) != null) {
          again = true
          dcord = this.validateBDouble(i,squares)
      
        }
        valid = true;
      }
        
      if(squares[this.state.currentSpace].props.className === "circle" && i > 55){
        squares[i] = <div className="blackKing">K</div>;
      }
      else if(squares[this.state.currentSpace].props.className === "blackKing"){
        squares[i] = <div className="blackKing">K</div>;
      }
      else{
        squares[i] = <div className="circle"></div>;
      }

      squares[this.state.currentSpace] = <div className="empty"></div>

      if (takeP !== null) {
        squares[takeP] = <div className="empty"></div>
      }

      this.selectState(squares,valid,again,i,dcord)
      

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
      if(squares[this.state.currentSpace].props.className === "circleRed" && i < 8){
        squares[i] = <div className="redKing">K</div>;
      }
      else if(squares[this.state.currentSpace].props.className === "redKing"){
        squares[i] = <div className="redKing">K</div>;
      }
      else{
      squares[i] = <div className="circleRed"></div>;
      }
      squares[this.state.currentSpace] = <div className="empty"></div>
      if (takeP !== null) {
        squares[takeP] = <div className="empty"></div>
      }
      this.selectState(squares,valid,again,i,dcord);
    }

    redException(i,squares){
      let leftMove = i - 7;
      if (i === 55){
        if(squares[leftMove].props.className === "empty")
          return true;
        else if (squares[i-18].props.className === "empty" && (squares[i-9].props.className === "circle" || squares[i-9].props.className ))
          return true; 
        else  
          return false; 
      } 
    }
    checkRkingSelection(i,squares){
      let leftMove = i + 7;
      let rightMove = i + 9;
      let altRightMove = i - 7;
      let altLeftMove = i - 9
      if (this.redException(i,squares)){
        return true}

      if((leftMove < 64 && squares[leftMove].props.className === "empty") || (rightMove < 64 && squares[rightMove].props.className === "empty") || (altRightMove > 0 && squares[altRightMove].props.className === "empty") || (altLeftMove > 0 && squares[altLeftMove].props.className === "empty")){
        return true;
      }
      else if((leftMove < 64 && squares[leftMove + 7].props.className === "empty" && (squares[leftMove].props.className === "circleRed" || squares[leftMove].props.className === "redKing")) || (rightMove < 64 && squares[rightMove + 9].props.className === "empty" && (squares[rightMove].props.className === "circleRed" || squares[rightMove].props.className === "redKing"))){
        return true;
      }
      else if((altLeftMove > 0 && squares[altLeftMove - 7].props.className === "empty" && (squares[altLeftMove].props.className === "circleRed" || squares[altLeftMove].props.className === "redKing")) || (altRightMove > 0 && squares[altRightMove - 9].props.className === "empty" && (squares[altRightMove].props.className === "circleRed" || squares[altRightMove].props.className === "redKing"))){
        return true;
      }
      else{
        return false; 
      }

    }
    
    checkRselection(i,squares){
      let leftMove = i - 7;
      let rightMove = i - 9;

      if(this.checkRkingSelection(i,squares)){
        return true;}
      else if (this.redException){
        return true; }
      else if((leftMove > 0 && squares[leftMove].props.className === "empty") || (rightMove > 0 && squares[rightMove].props.className === "empty")){
        return true
      }
      else if((leftMove > 0 && squares[leftMove - 7].props.className === "empty" && squares[leftMove].props.className === "circle") || (rightMove > 0 && squares[rightMove - 9].props.className === "empty" && squares[rightMove].props.className === "circle")){
        return true;
      }
      else{
        return false
      }
    }

    blackException(i,squares){
      let rightMove = i + 9;
      if (i === 8){
        if(squares[rightMove].props.className === "empty")
          return true;
        else if(squares[rightMove+9].props.className === "empty" && (squares[rightMove].props.className === "circleRed" || squares[rightMove].props.className === "redKing")){
          return true; 
        }
        else  
          return false; 
      }
    }
    checkBkingSelection(i,squares){
      let leftMove = i + 7;
      let rightMove = i + 9;
      let altRightMove = i - 7;
      let altLeftMove = i - 9;
      if (this.blackException(i,squares)) {
        return true;  
      }
      if((leftMove < 64 && squares[leftMove].props.className === "empty") || (rightMove < 64 && squares[rightMove].props.className === "empty") || (altRightMove > 0 && squares[altRightMove].props.className === "empty") || (altLeftMove > 0 && squares[altLeftMove].props.className === "empty")){
        return true;
      }
      else if((leftMove < 64 && squares[leftMove + 7].props.className === "empty" && (squares[leftMove].props.className === "circleRed" || squares[leftMove].props.className === "redKing")) || (rightMove < 64 && squares[rightMove + 9].props.className === "empty" && (squares[rightMove].props.className === "circleRed" || squares[rightMove].props.className === "redKing"))){
        return true;
      }
      else if((altLeftMove > 0 && squares[altLeftMove - 7].props.className === "empty" && (squares[altLeftMove].props.className === "circleRed" || squares[altLeftMove].props.className === "redKing")) || (altRightMove > 0 && squares[altRightMove - 9].props.className === "empty" && (squares[altRightMove].props.className === "circleRed" || squares[altRightMove].props.className === "redKing"))){
        return true;
      }
      else{
        return false; 
      }
    }
    checkBselection(i,squares){
      let leftMove = i + 7;
      let rightMove = i + 9;
      if(this.checkBkingSelection(i,squares)){
        return true;
      }
      else if (this.blackException(i,squares)){ 
          return true; 
      }

      else if((leftMove < 64 && squares[leftMove].props.className === "empty") || (rightMove < 64 && squares[rightMove].props.className === "empty")){
        return true;
      }
      else if((leftMove < 64 && squares[leftMove + 7].props.className === "empty" && squares[leftMove].props.className === "circleRed") || (rightMove < 64 && squares[rightMove + 9].props.className === "empty" && squares[rightMove].props.className === "circleRed")){
        return true;
      }
      else 
        return false;

    }
    selectSpace(i, squares){
      if (this.state.RedIsNext === true && this.checkBselection(i,squares) === true  && (squares[i].props.className === "circle" || squares[i].props.className === "blackKing")) {
        this.setState({
          squares: squares,
          invalid: false,
          currentSpace: i,
        });
        
      }
      else if (this.state.RedIsNext === false && this.checkRselection(i,squares) === true && (squares[i].props.className === "circleRed" || squares[i].props.className === "redKing" )) {
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
  

