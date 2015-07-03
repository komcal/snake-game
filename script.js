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
	};

$(document).ready(function(){
	render();
	
	setInterval(function() {
   		update();
   		render();

	}, 4000/60);

	$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        key = "l";
        break;

        case 38: // up
        key = "u";
        break;

        case 39: // right
        key ="r";
        break;

        case 40: // down
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
		}

	}
	
}

function render(){
	if(snake.x[snake.n-1] < 0 || snake.x[snake.n-1] >= 560)game = false;
	if(snake.y[snake.n-1] < 0 || snake.y[snake.n-1] >= 560)game = false;

	if(game)createDotSnake();
}

function createDotSnake(){
	
	for(var i = 0 ;i < snake.n ; i++){
		ctx.fillStyle = "green";
		ctx.fillRect(snake.x[i],snake.y[i],snake.size,snake.size);
		
	}
}