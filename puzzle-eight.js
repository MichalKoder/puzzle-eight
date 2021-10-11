

document.addEventListener('keydown', (e) => {
    if(!puzzle.completed()) {
     if (e.code === "ArrowUp") {puzzle.down();}
    else if (e.code === "ArrowDown") {puzzle.up();}
    else if (e.code === "ArrowLeft") {puzzle.right();}
    else if (e.code === "ArrowRight") {puzzle.left();}
    else if (e.code === "Space") {puzzle.shuffle();}
    puzzle.refreshBoard();
    }
    if(puzzle.completed())
    {
        puzzle.over();
        document.getElementById('score').innerHTML = puzzle.score;
    }
 });

 
var puzzle = {
state : [1,2,3,4,5,6,7,8,0],
legalUp : [0,0,0,1,1,1,1,1,1],
legalDown : [1,1,1,1,1,1,0,0,0],
legalLeft : [0,1,1,0,1,1,0,1,1],
legalRight : [1,1,0,1,1,0,1,1,0],
holePos : 8,
tab : [...Array(9).keys()],
score : 0,

shuffle : function() {
    this.tab.sort( ()=>Math.random()-0.5 );
    this.state = this.tab;
    this.holePos = this.state.findIndex(zeroInd => zeroInd < 1);
    this.refreshBoard();
    this.score = 0;
  },

  completed : function() {
    if(JSON.stringify(this.state) == JSON.stringify([1,2,3,4,5,6,7,8,0])) 
    return true;
    return false;
  },

  over : function() {
      document.getElementsByClassName('overlay')[0].style.display = 'block';
  },

refreshBoard : function() {
    for(let i=0;i<9;i++) {
        document.getElementById('n'+i).style.backgroundImage = "url('img/n"+(this.state[i])+".png')";
    }
    document.getElementById('n'+this.holePos).style.borderRadius = '5px';
},
  
up : function() {
    if (this.legalUp[this.holePos]) {
        document.getElementById('n'+this.holePos).style.borderRadius = '10px';
        this.state[this.holePos] = this.state[this.holePos-3];
        this.holePos-=3;
        this.state[this.holePos] = 0;
        this.score++;
       }
   },
   
down : function() {
       if (this.legalDown[this.holePos]) {
        document.getElementById('n'+this.holePos).style.borderRadius = '10px';
           this.state[this.holePos] = this.state[this.holePos+3];
           this.holePos+=3;
           this.state[this.holePos] = 0;
           this.score++;        

          }
   },
   
left : function() {
       if (this.legalLeft[this.holePos]) {
        document.getElementById('n'+this.holePos).style.borderRadius = '10px';
           this.state[this.holePos] = this.state[this.holePos-1];
           this.holePos-=1;
           this.state[this.holePos] = 0;
           this.score++;
          }
   },
   
right : function() {
       if (this.legalRight[this.holePos]) {
    document.getElementById('n'+this.holePos).style.borderRadius = '10px';
           this.state[this.holePos] = this.state[this.holePos+1];
           this.holePos+=1;
           this.state[this.holePos] = 0;
           this.score++;

          }
   },
   
printState : function() {
       let t = '';
      for(let i=0;i<9;i++) {
           t += this.state[i];
           t += ((i+1) % 3) ? ' ' : "\n";
       }
       console.log(t);
}
}