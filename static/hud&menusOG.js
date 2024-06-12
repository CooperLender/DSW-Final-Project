function virtualKeycap(x,y,letter){
	push();
		noFill();
		stroke(255);
		strokeWeight(2);
		rect(x,y,40,40,5);
	pop();
	
	push();
		fill(255);
		noStroke();
		textFont('Verdana',35);
		text(letter,x+7.5,y+33);
	pop();
}

function menu() {
		if(gameLoop === false){
			push();
				stroke(255);
				strokeWeight(2);
				fill(30);
				rect(75,75,windowWidth-150,windowHeight-150);
			pop();
			
			push();
				virtualKeycap(windowWidth/2-20, windowHeight/2+25,'E');
				noStroke();
				fill(255);
				textSize(25);
				text('START',windowWidth/2 - 40,windowHeight/2);
			pop();
			
			if(keyIsPressed && keyCode === (69)){
				restart();
				gameLoop = true;
			}
		}
	
		else{
			gameLoop = true;
		}
}