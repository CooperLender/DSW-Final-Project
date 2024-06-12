state = "main";
pState = "main";

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

function UI() {
	if (state == "main") {
		mainMenu();
	}
	
	if (state == "settings") {
		settingsMenu();
	}
}

function mainMenu() {
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
			
			settingsButton.draw();
			
			ballsButton.draw();
			swordButton.draw();
			laserButton.draw();
			
			if(keyIsPressed && keyCode === (69)){
				restart();
				gameLoop = true;
			}
		}
	
		else{
			gameLoop = true;
		}
}

function settingsMenu() {
	push();
		stroke(255);
		strokeWeight(2);
		fill(30);
		rect(75,75,windowWidth-150,windowHeight-150);
	pop();
	
	push();
		fill(255);
		textAlign(CENTER);
		textSize(20);
		text("FPS", windowWidth/2-20, windowHeight/2 - 240, 40, 40);
	pop();
	
	
	fps60Button.draw();
	fps90Button.draw();
	fps144Button.draw();
	
	backButton.draw();
}

function mouseClicked(){
	if(gameLoop === false) {
		if(settingsButton.isClicked() == true){
			state = "settings";
		}

		if(fps60Button.isClicked() == true){
			fr = 60;
			print("fps 60")
		}

		if(fps90Button.isClicked() == true){
			fr = 90;
			print("fps 90")
		}

		if(fps144Button.isClicked() == true){
			fr = 144;
			print("fps 144")
		}
		
		if(ballsButton.isClicked() == true){
			weapon = "balls";
		}
		
		if(swordButton.isClicked() == true){
			weapon = "sword";
		}
		
		if(laserButton.isClicked() == true){
			weapon = "laser";
		}

		if(backButton.isClicked() == true){
			if(pState == "main") {
				state = "main";
			}
		}
	}
}