var game = true,
	pixel = 14,
	key = "r",
	canvas = $("#canvas")[0],
	ctx = canvas.getContext("2d"),
	snake = {
	x: [42,56,70],
	y: [56,56,56],
	n: 3,
	size: 10,
	order:["r","r","r"]
	},
	item = [{
		x: [],
		y: [],
		n: 0,
		color: "#CD0000"},
		{
		x: [],
		y: [],
		n: 0,
		color: "#104E8B"},
		{
		x: [],
		y: [],
		n: 0,
		color: "#EEEE00"}],
	IntervalId;
	
var map = new Array(40);
$(document).ready(function(){
	
  for (var i = 0; i < 40; i++) {
    map[i] = new Array(40);
    for(var j = 0 ; j < 40 ; j++){
			map[i][j] = 0;
		}
  }
	
	render();

	IntervalId = setInterval(function() {
   		update();
   		render();
	}, 5000/60);

	$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        if(key != "r")
        key = "l";
        break;

        case 38: // up
        if(key != "d")
        key = "u";
        break;

        case 39: // right
        if(key != "l")
        key ="r";
        break;

        case 40: // down
        if(key != "u")
        key = "d";
        break;

        default: return;
    }
    e.preventDefault();
});

});
function update(){
	canvas.width = canvas.width;
	
	for(var i = 0 ; i < snake.n ; i++){
		if(snake.y[i] >= 0 && snake.y[i]<=560 && snake.x[i] >= 0 && snake.x[i]<=560)
		map[snake.y[i]/pixel][snake.x[i]/pixel] = 0;
	}	
	for(var i = 0 ; i < snake.n ; i++){
		if(i < snake.n-1){
			if(snake.order[i+1]=="r"){snake.x[i]+=pixel;}
			else if(snake.order[i+1]=="u"){snake.y[i]-=pixel;}
			else if(snake.order[i+1]=="l"){snake.x[i]-=pixel;}
			else if(snake.order[i+1]=="d"){snake.y[i]+=pixel;}
			snake.order[i] = snake.order[i+1];
		}
		else{
			snake.order[i] = key;
			if(snake.order[i]=="r"){snake.x[i]+=pixel;}
			else if(snake.order[i]=="u"){snake.y[i]-=pixel;}
			else if(snake.order[i]=="l"){snake.x[i]-=pixel;}
			else if(snake.order[i]=="d"){snake.y[i]+=pixel;}
			//console.log("**" + snake.y[i]);
			
		}
		if(snake.y[i] >= 0 && snake.y[i]<560 && snake.x[i] >= 0 && snake.x[i]<=560){
			map[snake.y[i]/pixel][snake.x[i]/pixel] = 1;
				
		}
	}
}

function render(){
	//console.log(snake.y[snake.n-1]);
	if(snake.y[snake.n-1] < 0 || snake.y[snake.n-1] >= 560){game = false;console.log("end");}
	if(snake.x[snake.n-1] < 0 || snake.x[snake.n-1] >= 560){game = false;console.log("end");}
	

	if(game)createDotSnake();
	else clearInterval(IntervalId);
}

function createDotSnake(){
	
	for(var i = 0 ;i < snake.n ; i++){
		ctx.fillStyle = "green";
		ctx.fillRect(snake.x[i],snake.y[i],snake.size,snake.size);
		
	}
}
function spawn(){
	for(var i = 0 ; i < 2 ; i++){
		item[i].n++;
		

	}
}