import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import checkerArray from './array.js';

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
        invalidA: [0,16,32,48,15,31,47,63],
      };
    }

   validSpace(space){

      for(let x = 0; x < this.state.invalidA.length; x++){
        if (this.state.invalidA[x] === space) {
          return false;
        }
      }
      return true

   }
    validateBDouble(i,squares){
      let dleftMove = i + 14;
      let drightMove = i + 18;
      let dAltRightMove = i - 14;
      let dAltLeftMove = i - 18;
      let moveArray = []; 


      if (dleftMove < 64) {

        if((this.validSpace(dleftMove) && dleftMove - 7 < 64 && squares[dleftMove].props.className === "empty" && (squares[dleftMove - 7].props.className === "circleRed" || squares[dleftMove - 7].props.className === "kingRed"))){
          moveArray.push(dleftMove);
        }
      }
      if (drightMove < 64){
        if ((this.validSpace(drightMove) && drightMove - 9 < 64 && squares[drightMove].props.className === "empty" && (squares[drightMove - 9].props.className === "circleRed" || squares[drightMove - 9].props.className === "kingRed"))){
          moveArray.push(drightMove);
        }
      }
    
      if (squares[this.state.currentSpace].props.className === "blackKing") {
        if (dAltLeftMove > 0) {
          if ((this.validSpace(dAltRightMove) && dAltRightMove + 7 > 0 && squares[dAltRightMove].props.className === "empty" && (squares[dAltRightMove + 7].props.className === "circleRed" || squares[dAltRightMove + 9].props.className === "kingRed"))){

            moveArray.push(dAltRightMove); 
          }
        }
        if (dAltRightMove > 0){
          if ((this.validSpace(dAltLeftMove) && dAltLeftMove + 9 > 0 && squares[dAltLeftMove].props.className === "empty" && (squares[dAltLeftMove + 9].props.className === "circleRed" || squares[dAltLeftMove + 7].props.className === "kingRed"))){
            moveArray.push(dAltLeftMove);
          }
        }
    }
      if (moveArray.length > 0) {
        return moveArray;
      }
      else
        return null;

    }

    validateDcord(i){

      for(let x = 0; x < this.state.doubcord.length; x++){
        if (this.state.doubcord[x] === i) {
            return true; 
        }
      }

      return false; 
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
          wrongDjump: false,
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
            wrongDjump: false,
          })
        }
      else if(valid === false && this.state.doubcord !== null && this.validateDcord(i) === false){
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

      if((leftMove < 64 && leftMove === i) || (rightMove < 64 && rightMove === i) || (altRightMove > 0 && altRightMove === i) || (altLeftMove > 0 && altLeftMove === i)){
        return null;
      }
      else if((leftMove < 64 && leftMove + 7 === i && (squares[leftMove].props.className === "circleRed" || squares[leftMove].props.className === "redKing"))){
        return leftMove;
      }
      else if ((rightMove < 64 && rightMove + 9 === i && (squares[rightMove].props.className === "circleRed" || squares[rightMove].props.className === "redKing"))){
        return rightMove;
      }
      else if((altLeftMove > 0 && altLeftMove - 9 === i && (squares[altLeftMove].props.className === "circleRed" || squares[altLeftMove].props.className === "redKing"))){
        return altLeftMove;
      }
      else if((altRightMove > 0 && altRightMove - 7 === i && (squares[altRightMove].props.className === "circleRed" || squares[altRightMove].props.className === "redKing"))){
        return altRightMove
      }
      else{
        return null; 
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

      if (this.state.doubcord !== null && this.validateDcord(i) === false) {
        valid = false; 
      }
      else if (kingPiece === "blackKing" && this.validSpace(i)){
        valid = this.validBKingMove(i,squares)
        if(valid === true){
          takeP = this.validateBlkKing(i,squares)}
        if (this.validateBDouble(i,squares) !== null && takeP !== null) {
          again = true
          dcord = this.validateBDouble(i,squares)
        }
      }
      else if(((i === leftMove && leftMove < 64) || (i === rightMove && leftMove < 64)) && this.validSpace(i)){
        valid = true;
      }
      else if(((i === leftMove + 7 && leftMove + 7 < 64) || (i=== rightMove + 9 && leftMove + 9 < 64)) && this.validSpace(i)){
        if ((squares[leftMove].props.className === "circleRed" || squares[leftMove].props.className === "redKing")  && leftMove + 7 === i ) {
          takeP = leftMove
          valid = true;
        }
        else if((squares[rightMove].props.className === "circleRed" || squares[rightMove].props.className === "redKing") && rightMove + 9 === i){
          takeP = rightMove
          valid = true;
        }
        if (this.validateBDouble(i,squares) != null && takeP !== null) {
          again = true
          dcord = this.validateBDouble(i,squares)
      
        }
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
      let dleftMove = i - 18;
      let drightMove = i - 14;
      let dAltRightMove = i + 18;
      let dAltLeftMove = i + 14;
      let moveArray = [];
 
        if (dleftMove > 0) {
          if((this.validSpace(dleftMove) && dleftMove + 9 > 0 && squares[dleftMove].props.className === "empty" && (squares[dleftMove + 9].props.className === "circle" || squares[dleftMove + 9].props.className === "blackKing"))){
            moveArray.push(dleftMove);
          }
        }
          
        if (drightMove > 0){
          if ((this.validSpace(drightMove) && drightMove + 7 > 0 && squares[drightMove].props.className === "empty" && (squares[drightMove + 7].props.className === "circle" || squares[drightMove + 7].props.className === "blackKing"))){
            moveArray.push(drightMove);
          }
        }

        if (squares[this.state.currentSpace].props.className === "redKing") {
          if (dAltRightMove < 64) {
            
            if ((this.validSpace(dAltRightMove) &&  dAltRightMove - 9 < 64 && squares[dAltRightMove].props.className === "empty" && (squares[dAltRightMove - 9].props.className === "circle" || squares[dAltRightMove + 9].props.className === "blackKing"))){
              moveArray.push(dAltRightMove); 
            }
          }
          if (dAltLeftMove < 64){
            if ((this.validSpace(dAltLeftMove) && dAltLeftMove - 7 < 64 && squares[dAltLeftMove].props.className === "empty" && (squares[dAltLeftMove - 7].props.className === "circle" || squares[dAltLeftMove + 7].props.className === "blackKing"))){
              moveArray.push(dAltLeftMove);
          }
          }
      }
      if (moveArray.length > 0) {
        return moveArray;
      }
      else
        return null;


    }

    validateRedKing(i,squares){
      let leftMove = this.state.currentSpace + 7;
      let rightMove = this.state.currentSpace + 9;
      let altRightMove = this.state.currentSpace - 7;
      let altLeftMove = this.state.currentSpace - 9;

      if((leftMove < 64 && leftMove === i) || (rightMove < 64 && rightMove === i) || (altRightMove > 0 && altRightMove === i) || (altLeftMove > 0 && altLeftMove === i)){
        return null;
      }
      else if((leftMove < 64 && leftMove + 7 === i && (squares[leftMove].props.className === "circle" || squares[leftMove].props.className === "blackKing"))){
        return leftMove;
      }
      else if ((rightMove < 64 && rightMove + 9 === i && (squares[rightMove].props.className === "circle" || squares[rightMove].props.className === "blackKing"))){
        return rightMove;
      }
      else if((altLeftMove > 0 && altLeftMove - 9 === i && (squares[altLeftMove].props.className === "circle" || squares[altLeftMove].props.className === "blackKing"))){
        return altLeftMove;
      }
      else if((altRightMove > 0 && altRightMove - 7 === i && (squares[altRightMove].props.className === "circle" || squares[altRightMove].props.className === "blackKing"))){
        return altRightMove
      }
      else{
        return null; 
      }

    }

    validateRedMove(i,squares){
      let leftMove = this.state.currentSpace - 9;
      let rightMove = this.state.currentSpace - 7;
      let takeP = null;
      let valid = null;
      let again = false;
      let dcord = null; 
      let kingPiece = squares[this.state.currentSpace].props.className;
      if (this.state.doubcord !== null && this.validateDcord(i) === false) {
        valid = false; 
      }
      else if (kingPiece === "redKing" && this.validSpace(i)){
        valid = this.validRKingMove(i,squares)
        if(valid === true){
          takeP = this.validateRedKing(i,squares)}
        if (this.validateRDouble(i,squares) !== null && takeP !== null) {
          again = true
          dcord = this.validateRDouble(i,squares)
        }
      }
      else if(((i === leftMove && leftMove > 0) || (i === rightMove && leftMove > 0)) && this.validSpace(i)){
        valid = true
      }
      else if(((i === leftMove - 9 && leftMove - 9 > 0) || (i === rightMove - 7 && rightMove - 7 > 0)) && this.validSpace(i)){
        if ((squares[leftMove].props.className === "circle" || squares[leftMove].props.className === "blackKing") && leftMove - 9 === i){
          takeP = leftMove;  
          valid = true;
        }
        else if((squares[rightMove].props.className === "circle" || squares[rightMove].props.className === "blackKing") && rightMove - 7 === i){
          takeP = rightMove;
          valid = true; 
        }
        if (this.validateRDouble(i,squares) !== null && takeP !== null) {
          again = true;
          dcord = this.validateRDouble(i,squares);
          valid = true;
        }
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
      let leftMove = i - 9;
      if (i === 55){
        if(squares[leftMove].props.className === "empty"){
          return true;
        }
        else if (squares[i-18].props.className === "empty" && (squares[i-9].props.className === "circle" || squares[i-9].props.className === "blackKing" ))
          return true; 
        else  
          return false; 
      } 
      else return true;
    }
    checkRkingSelection(i,squares){
      let leftMove = i + 7;
      let rightMove = i + 9;
      let altRightMove = i - 7;
      let altLeftMove = i - 9

      if(squares[i].props.className === "redKing"){
        if (this.redException(i,squares) === false){
          return false}

        if((leftMove < 64 && squares[leftMove].props.className === "empty") || (rightMove < 64 && squares[rightMove].props.className === "empty") || (altRightMove > 0 && squares[altRightMove].props.className === "empty") || (altLeftMove > 0 && squares[altLeftMove].props.className === "empty")){
          return true;
        }
        else if((leftMove < 64 && squares[leftMove + 7].props.className === "empty" && (squares[leftMove].props.className === "circle" || squares[leftMove].props.className === "blackKing")) || (rightMove < 64 && squares[rightMove + 9].props.className === "empty" && (squares[rightMove].props.className === "circle" || squares[rightMove].props.className === "blackKing"))){
          return true;
        }
        else if((altLeftMove > 0 && squares[altLeftMove - 9].props.className === "empty" && (squares[altLeftMove].props.className === "circle" || squares[altLeftMove].props.className === "blackKing")) || (altRightMove > 0 && squares[altRightMove - 7].props.className === "empty" && (squares[altRightMove].props.className === "circle" || squares[altRightMove].props.className === "blackKing"))){
          return true;
        }
        else{
          return false; 
        }
      }
      else return false;

    }
    validBKingMove(i,squares){
      let leftMove = this.state.currentSpace + 7;
      let rightMove = this.state.currentSpace  + 9;
      let altRightMove = this.state.currentSpace  - 7;
      let altLeftMove = this.state.currentSpace  - 9

      if(squares[this.state.currentSpace].props.className === "blackKing"){
        if((leftMove < 64 && leftMove === i) || (rightMove < 64 && rightMove === i) || (altRightMove > 0 && altRightMove === i) || (altLeftMove > 0 && altLeftMove === i)){
          return true;
        }
        else if((leftMove < 64 && squares[leftMove + 7].props.className === "empty" && (squares[leftMove].props.className === "circleRed" || squares[leftMove].props.className === "redKing")) || (rightMove < 64 && squares[rightMove + 9].props.className === "empty" && (squares[rightMove].props.className === "circleRed" || squares[rightMove].props.className === "redKing"))){
          return true;
        }
        else if((altLeftMove > 0 && squares[altLeftMove - 9].props.className === "empty" && (squares[altLeftMove].props.className === "circleRed" || squares[altLeftMove].props.className === "redKing")) || (altRightMove > 0 && squares[altRightMove - 7].props.className === "empty" && (squares[altRightMove].props.className === "circleRed" || squares[altRightMove].props.className === "redKing"))){
          return true;
        }
        else{
          return false; 
        }
      }
      else return false;

    }

    validRKingMove(i,squares){
      let leftMove = this.state.currentSpace + 7;
      let rightMove = this.state.currentSpace  + 9;
      let altRightMove = this.state.currentSpace  - 7;
      let altLeftMove = this.state.currentSpace  - 9

      if(squares[this.state.currentSpace].props.className === "redKing"){
        if((leftMove < 64 && leftMove === i) || (rightMove < 64 && rightMove === i) || (altRightMove > 0 && altRightMove === i) || (altLeftMove > 0 && altLeftMove === i)){
          return true;
        }
        else if((leftMove < 64 && squares[leftMove + 7].props.className === "empty" && (squares[leftMove].props.className === "circle" || squares[leftMove].props.className === "blackKing")) || (rightMove < 64 && squares[rightMove + 9].props.className === "empty" && (squares[rightMove].props.className === "circle" || squares[rightMove].props.className === "blackKing"))){
          return true;
        }
        else if((altLeftMove > 0 && squares[altLeftMove - 9].props.className === "empty" && (squares[altLeftMove].props.className === "circle" || squares[altLeftMove].props.className === "blackKing")) || (altRightMove > 0 && squares[altRightMove - 7].props.className === "empty" && (squares[altRightMove].props.className === "circle" || squares[altRightMove].props.className === "blackKing"))){
          return true;
        }
        else{
          return false; 
        }
      }
      else return false;

    }
    
    checkRselection(i,squares){
      let leftMove = i - 9;
      let rightMove = i - 7;

      if(this.checkRkingSelection(i,squares)){
        return true;}
      else if (this.redException(i,squares) === false){
        return false; }
      else if((leftMove > 0 && squares[leftMove].props.className === "empty") || (rightMove > 0 && squares[rightMove].props.className === "empty")){
        return true
      }
      else if((leftMove > 0 && leftMove - 9 > 0 && squares[leftMove - 9].props.className === "empty" && (squares[leftMove].props.className === "circle" || squares[leftMove].props.className === "blackKing" )) || (rightMove > 0 && rightMove - 7 > 0 && squares[rightMove - 7].props.className === "empty" && (squares[rightMove].props.className === "circle" || squares[rightMove].props.className === "blackKing" ))){
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
      return true; 
    }
    checkBkingSelection(i,squares){
      let leftMove = i + 7;
      let rightMove = i + 9;
      let altRightMove = i - 7;
      let altLeftMove = i - 9;

      if(squares[i].props.className === "blackKing"){
        if (this.blackException(i,squares) === false) {
          return false;  
        }
        if((leftMove < 64 && squares[leftMove].props.className === "empty") || (rightMove < 64 && squares[rightMove].props.className === "empty") || (altRightMove > 0 && squares[altRightMove].props.className === "empty") || (altLeftMove > 0 && squares[altLeftMove].props.className === "empty")){
          return true;
        }
        else if((leftMove < 64 && squares[leftMove + 7].props.className === "empty" && (squares[leftMove].props.className === "circleRed" || squares[leftMove].props.className === "redKing")) || (rightMove < 64 && squares[rightMove + 9].props.className === "empty" && (squares[rightMove].props.className === "circleRed" || squares[rightMove].props.className === "redKing"))){
          return true;
        }
        else if((altLeftMove > 0 && squares[altLeftMove - 9].props.className === "empty" && (squares[altLeftMove].props.className === "circleRed" || squares[altLeftMove].props.className === "redKing")) || (altRightMove > 0 && squares[altRightMove - 7].props.className === "empty" && (squares[altRightMove].props.className === "circleRed" || squares[altRightMove].props.className === "redKing"))){
          return true;
        }
        else{
          return false; 
        }
    }
    }
    checkBselection(i,squares){
      let leftMove = i + 7;
      let rightMove = i + 9;
      if(this.checkBkingSelection(i,squares)){
        return true;
      }
      else if (this.blackException(i,squares) === false){ 
          return false; 
      }

      if((leftMove < 64 && squares[leftMove].props.className === "empty") || (rightMove < 64 && squares[rightMove].props.className === "empty")){
        return true;
      }
      if((leftMove < 64 && leftMove + 7 < 64 && squares[leftMove + 7].props.className === "empty" && (squares[leftMove].props.className === "circleRed" || squares[leftMove].props.className === "redKing")) || (rightMove < 64 && rightMove + 9 < 64 && squares[rightMove + 9].props.className === "empty" && (squares[rightMove].props.className === "circleRed" || squares[rightMove].props.className === "redKing" ))){
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

      if (calculateWinner(squares)){
        return;
      }

      else if (this.state.currentSpace == null) {
      
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

    handleReset(){
      this.setState({
        squares:  new checkerArray().squares,
        RedIsNext: true,
        invalid: false,
        currentSpace: null,
        move: null,
        moveM: false,
        doubcord: null,
        wrongDjump:false,
        invalidA: [0,16,32,48,15,31,47,63],
      })
      
    }
    renderNewButton(){
      return(<button className="resetButton"
        onClick={() => this.handleReset()}>Reset Game</button>)
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
      let buttonReset = this.renderNewButton();
      const winner = calculateWinner(this.state.squares);
      let status; 
      if (winner) {
        status = "Winner: " + winner;
      } else{
        status = 'Current player: ' + (this.state.RedIsNext ? "Black" : "Red"); 
      }

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
          <div>
            {rows}
          </div>
          <div>{buttonReset}</div>
          <div>{invalid}</div>
          <div>{move}</div>
          <div>{moveAgain}</div>
          <div>{wrongDjmp}</div>
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
  
function calculateWinner(squares){
    let redCount = 0;
    let blackCount = 0; 
    for (let i = 0; i < squares.length; i++){
      if (squares[i].props.className === "redKing" || squares[i].props.className === "circleRed") {
        redCount = redCount + 1;
      }
      else if(squares[i].props.className === "blackKing" || squares[i].props.className === "circle"){
        blackCount = blackCount + 1;
      }

    }
    if (blackCount === 0) {
        return "Red";
    }
    else if (redCount === 0)
    {
      return "Black";
    }
    else{
      return null; 
    }

}
