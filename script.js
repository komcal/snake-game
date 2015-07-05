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
		size: 10,
		color: "#CD0000"},
		{
		x: [],
		y: [],
		n: 0,
		size: 10,
		color: "#104E8B"},
		{
		x: [],
		y: [],
		n: 0,
		size: 10,
		color: "#EEEE00"}],
	IntervalId,
	IntervalId2;
	
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
	

	IntervalId2 = setInterval(function() {
   		spawn();
	}, 3000);

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
	

	if(game){
		createDotSnake();
		createItem();
	}
	else{
		clearInterval(IntervalId);
		clearInterval(IntervalId2);
	} 
	
}

function createDotSnake(){
	for(var i = 0 ;i < snake.n ; i++){
		ctx.fillStyle = "green";
		ctx.fillRect(snake.x[i],snake.y[i],snake.size,snake.size);
		
	}
}

function createItem(){
	//console.log(item);
	for(var num = 0 ; num < 3 ; num++){
		for(var i = 0 ; i < item[num].n ; i++){
			ctx.fillStyle = item[num].color;
			ctx.fillRect(item[num].x[i],item[num].y[i],item[num].size,item[num].size);
		}
	}
}

function spawn(){
	for(var num = 0 ; num < 3 ; num++){
		var c = 0;
		do{
			var x = Math.floor((Math.random() * 40));
			var y = Math.floor((Math.random() * 40));
			
		}while(map[y][x] == 1);

		map[y][x] = 1;
		console.log(x + " " + y);
		item[num].x[item[num].n] = x*pixel;	
		item[num].y[item[num].n] = y*pixel;
		createItem(item[num]);
		item[num].n++;
	}

}