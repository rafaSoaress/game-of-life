var canvas;
var ctx;
var fps = 40;

var canvasX = 500;
var canvasY = 500;

var tileX, tileY;

//vars for game board
var board;
var rows = 100;
var columns = 100;

var white = '#FFF';
var balck = '#000';


function createArray2D(r,c){
	var obj = new Array(r);
	for(y=0; y<r; y++){	
		obj[y]= new Array(c);
	}
	return obj;
}

var Agent = function(x,y,state){
	this.x = x;
	this.y = y;
	this.state = state;    //alive = 1, died = 2
	this.estateNext = this.state;  //next cycle state
	this.neighbors = [];

	this.addNeighbor = function(){
		var xNeighbor;
		var yNeighbor;

		for(i=-1; i<2; i++){
			for(j=-1; j<2; j++){

				xNeighbor = (this.x +j +columns) %columns;
				yNeighbor = (this.y +i +rows) %rows;

				if(i!=0 || j!=0){
					this.neighbors.push(board[yNeighbor][xNeighbor]);
				}
			}
		}
	}

	this.draw = function(){
		var color;

		if(this.state == 1){
			color = white;

		}
		else{
			color = balck;
		}
		ctx.fillStyle = color;
		ctx.fillRect(this.x *tileX, this.y *tileY, tileX, tileY);
	}
	//programming the conways law	
	this.newCycle = function (){
		var add = 0;
		for(i=0; i<this.neighbors.length; i++){
			add += this.neighbors[i].state;
		}
		//rules for the law
		this.estateNext = this.state;
		if(add<2 || add>3){
			this.estateNext = 0;
		}
		//add life
		if(add ==3){
			this.estateNext = 1;
		}
	}
	this.mutation = function(){
		this.state = this. estateNext;
	}
}

function startBoard(obj){
	var state;

	for(y=0; y<rows; y++){
		for(x=0; x<columns; x++){

			state = Math.floor(Math.random()*2);
			obj[y][x] = new Agent(x,y,state);
		}
	}

	for(y=0; y<rows; y++){
		for(x=0; x<columns; x++){
			obj[y][x].addNeighbor();			
		}
	}
}


function inicializa(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	canvas.width = canvasX;
	canvas.height = canvasY;
	tileX = Math.floor(canvasX/rows);
	tileY = Math.floor(canvasY/columns);

	board = createArray2D(rows,columns);

	startBoard(board);

	setInterval(function(){principal();},1000/fps);
}

function drawBoard(obj){
	for(y=0; y<rows; y++){
		for(x=0; x<columns; x++){
			obj[y][x].draw();
		}
	}
	//calculate the next cycle
	for(y=0; y<rows; y++){
		for(x=0; x<columns; x++){
			obj[y][x].newCycle();
		}
	}
	for(y=0; y<rows; y++){
		for(x=0; x<columns; x++){
			obj[y][x].mutation();
		}
	}
}

function eraseCanvas(){
	canvas.width = canvas.width;
	canvas.height = canvas.height;
}

function principal(){
	eraseCanvas();
	drawBoard(board);
}