var game = true,
	pixel = 14,
	key = "r",
	score = {
		x : 0,
		y : 0,
		n : 0,
		num : 0
	},
	canvas = $("#canvas")[0],
	ctx = canvas.getContext("2d"),
	snake = {
	x: [42,56,70],
	y: [56,56,56],
	n: 3,
	size: 10,
	order:["r","r","r"],
	color:["black","black","black"],
	time: 7000/60
	},
	item = [{
		x: [],
		y: [],
		n: 0,
		size: 10,
		color: "#800000"//red
		},{
		x: [],
		y: [],
		n: 0,
		size: 10,
		color: "#104E8B"//blue
		},{
		x: [],
		y: [],
		n: 0,
		size: 10,
		color: "#CD8500"//yellow
		},{
		x: [],
		y: [],
		n: 0,
		size: 10,
		color: "#EE00EE"//purple
		},{
		x: [],
		y: [],
		n: 0,
		size: 10,
		color: "#FF6103"//orange
		},{
		x: [],
		y: [],
		n: 0,
		size: 10,
		color: "#008B00"//green
	}],
	IntervalId,
	IntervalId2;

var map = new Array(40);
for (var i = 0; i < 40; i++) {
    map[i] = new Array(40);
    for(var j = 0 ; j < 40 ; j++){
			map[i][j] = 0;
		}
  }

$(document).ready(function(){
	var x = canvas.width / 2;
    var y = canvas.height / 4;
	ctx.font = '20pt Calibri';
	ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('Press enter to start.', x, y);
	
	$(document).keydown(function(e) {
    	if(e.which == 13){
    		$(document).off();
    		canvas.width = canvas.width;
    		startgame();
    	}
	});

});
function startgame(){
	for(var i = 0 ; i < 4 ; i++){
		spawn();
	}
	render();

	IntervalId = setInterval(function() {
   		update();
   		render();
   		checkhit()
	}, snake.time);
	

	IntervalId2 = setInterval(function() {
   		spawn();
	}, 3000);

	$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        if(key != "r")key = "l";
        break;

        case 38: // up
        if(key != "d")key = "u";
        break;

        case 39: // right
        if(key != "l")key ="r";
        break;

        case 40: // down
        if(key != "u")key = "d";
        break;

        default: return;
    }
    e.preventDefault();
});
}
function endgame(){
	clearInterval(IntervalId);
	clearInterval(IntervalId2);
	var x = canvas.width / 2;
    var y = canvas.height / 4;
	ctx.font = '20pt Calibri';
	ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('SCORE: '+score.num, x, y);
	ctx.fillText('Press enter to restart', x, y*4/3);
	$(document).keydown(function(e) {
    	if(e.which == 13){
    		location.reload();
    	}
	});
	
}

function update(){
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
			
			
		}
		if(snake.y[i] >= 0 && snake.y[i]<560 && snake.x[i] >= 0 && snake.x[i]<=560){
			map[snake.y[i]/pixel][snake.x[i]/pixel] = 1;
		}
	}
	score.x = snake.x[snake.n-1]+2;
	score.y = snake.y[snake.n-1]-pixel/2;
}

function render(){
	canvas.width = canvas.width;
	if(snake.y[snake.n-1] < 0 || snake.y[snake.n-1] >= 560){game = false;}
	if(snake.x[snake.n-1] < 0 || snake.x[snake.n-1] >= 560){game = false;}
	
	if(game){
		createDotSnake();
		createItem();
		if(score.n >0){
			createScore();
			score.n--;
		}
	}
	else{
		endgame();
	} 
	
}

function createDotSnake(){
	for(var i = 0 ;i < snake.n ; i++){
		ctx.fillStyle = snake.color[i];
		ctx.fillRect(snake.x[i],snake.y[i],snake.size,snake.size);
		
	}
}

function createItem(){
	for(var num = 0 ; num < 6 ; num++){
		for(var i = 0 ; i < item[num].n ; i++){
			ctx.fillStyle = item[num].color;
			
			ctx.fillRect(item[num].x[i],item[num].y[i],item[num].size,item[num].size);
		}
	}
}
function createScore(){
	ctx.font = '20px Calibri';
	ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    if(score.num > 50)	
    ctx.fillText(score.num+"!!", score.x, score.y);
	else 
	ctx.fillText(score.num, score.x, score.y);
}

function spawn(){
	for(var num = 0 ; num < 6 ; num++){
		var c = 0;
		do{
			var x = Math.floor((Math.random() * 40));
			var y = Math.floor((Math.random() * 40));
			
		}while(map[y][x] == 1);

		map[y][x] = 1;
		item[num].x[item[num].n] = x*pixel;	
		item[num].y[item[num].n] = y*pixel;
		createItem(item[num]);
		item[num].n++;
	}

}

function checkhit(){
	var x = snake.x[snake.n-1];
	var y = snake.y[snake.n-1];
	var m = 0;
	var i,j;
	for(var i = 0 ; i < snake.n-2 ; i++){
		if(snake.x[i] == x && snake.y[i] == y)
			game = false;
	}

	for(i = 0 ; i<6 ; i++){
		for(j = 0 ; j < item[i].n ; j++){
			if(item[i].x[j] == x && item[i].y[j] == y){
				m = 1;
				break;
			}
		}
		if(m)break;
	}
	if(m){
		add(item[i]);
		removeitem(item[i],j);
		if(snake.n > 3){
			if(snake.color[0] == snake.color[1] && snake.color[1] == snake.color[2]){
				removesnake();
			}
		}
	}
}
function add(item){
	var n = snake.n;
	for(n ; n > 0 ; n--){
		snake.x[n] = snake.x[n-1];
		snake.y[n] = snake.y[n-1];
		snake.order[n] = snake.order[n-1];
		snake.color[n] = snake.color[n-1];
	}

	if(snake.order[1] == "r"){
		snake.x[0] = snake.x[1] - pixel;
		snake.y[0] = snake.y[1];
	}
	else if(snake.order[1] == "d"){
		snake.x[0] = snake.x[1];
		snake.y[0] = snake.y[1] - pixel;
	}
	else if(snake.order[1] == "l"){
		snake.x[0] = snake.x[1] + pixel;
		snake.y[0] = snake.y[1];
	}
	else if(snake.order[1] == "u"){
		snake.x[0] = snake.x[1];
		snake.y[0] = snake.y[1]+ pixel;
	}
	snake.color[0] = item.color;
	snake.order[0] = snake.order[1];
	snake.n++;
	
	
}
function removeitem(item,j){
	map[item.y[j]/pixel][item.x[j]/pixel] = 0;
	for(var i = 0 ; i < item.n ; i++){
		if(i > j){
			item.x[j] = item.x[i];
			item.y[j] = item.y[i];
			j++;
		}
	}
	item.n--;
}

function removesnake(){
	for(var i = 3 ; i < snake.n;i++){
		snake.x[i-3] = snake.x[i];
		snake.y[i-3] = snake.y[i];
		snake.color[i-3] = snake.color[i];
		snake.order[i-3] = snake.order[i];
	}
	snake.n-=3;
	score.num+=3;
	score.n = 10;
	if(score.num %30 == 0){
		snake.time /= 1.3;
		clearInterval(IntervalId);
			IntervalId = setInterval(function() {
   			update();
   			render();
   			checkhit()
		}, snake.time);
	}
}