
lengthIncrease = 500;
//changes to shootBall an
function crosshair() {
	line(mouseX - 10, mouseY - 10, mouseX + 10, mouseY + 10);
	line(mouseX - 10, mouseY + 10, mouseX + 10, mouseY - 10);
}

function shootBall() {
	if (mouseIsPressed && playerAlive) {
		milliChecker = millis() - lastShot;
		if (milliChecker > shotTime) {
			let ball = new balls.Sprite(player.x, player.y, shotSize, "none");
			ball.color = 255;
			ball.stroke = 255;
			ball.direction = ball.angleTo(mouse);
			ball.speed = shotSpeed;
			lastShot = millis()
		}
	}

	if (balls.length > 0) {
		for (b = 0; b < balls.length; b ++) {
			if(balls.overlaps(enemy)) {
				balls[b].remove();
				enemyHealth -= 1;
				enemyHealthBar.width -= 24;
				enemyHealthBar.x -= 12;
			}

			else if(balls[b].overlaps(floor) || balls[b].overlaps(roof) || balls[b].overlaps(leftwall) || balls[b].overlaps(rightwall)) {
				balls[b].remove();
			}
		}
	}
}

function shootBall() {
	if (mouseIsPressed && playerAlive) {
		milliChecker = millis() - lastShot;
		if (milliChecker > shotTime) {
			let ball = new balls.Sprite(player.x, player.y, shotSize, "none");
			ball.color = 255;
			ball.stroke = 255;
			ball.direction = ball.angleTo(mouse);
			ball.speed = shotSpeed;
			lastShot = millis()
		}
	}

	if (balls.length > 0) {
		for (b = 0; b < balls.length; b ++) {
			if(balls.overlaps(enemy)) {
				balls[b].remove();
				enemyHealth -= 1;
				enemyHealthBar.width -= 24;
				enemyHealthBar.x -= 12;
			}

			else if(balls[b].overlaps(floor) || balls[b].overlaps(roof) || balls[b].overlaps(leftwall) || balls[b].overlaps(rightwall)) {
				balls[b].remove();
			}
		}
	}
}
function shootSword() {
	if (mouseIsPressed && playerAlive) {
		milliChecker = millis() - lastShot;
		if (milliChecker > shotTime) {
			let ball = new balls.Sprite(player.x, player.y, 20,20, "none");
			ball.color = 255;
			ball.stroke = 255;
			ball.direction = ball.angleTo(mouse);
			ball.speed = shotSpeed;
			lastShot = millis()
		}
	}

	if (balls.length > 0) {
		for (b = 0; b < balls.length; b ++) {
			if(balls.overlaps(enemy)) {
				balls[b].remove();
				enemyHealth -= 1;
				enemyHealthBar.width -= 24;
				enemyHealthBar.x -= 12;
			}

			else if(balls[b].overlaps(floor) || balls[b].overlaps(roof) || balls[b].overlaps(leftwall) || balls[b].overlaps(rightwall)) {
				balls[b].remove();
			}
		}
	}
}


function playerMovement() {
	if (kb.pressing('up'))  {
		
		if (player.vel.y >= -baseSpeed) {
			player.vel.y -= baseSpeed
		}
		
		else
		{
			player.vel.y -= userAccel;
		}
	}
	if (kb.pressing('down'))  {
		
		if (player.vel.y <= baseSpeed) {
			player.vel.y += baseSpeed
		}
		
		else
		{
			player.vel.y += userAccel;
		}
	}
	if (kb.pressing('right'))  {
		
		if (player.vel.x <= baseSpeed) {
			player.vel.x += baseSpeed
		}
		
		else
		{
			player.vel.x += userAccel;
		}
	}
	if (kb.pressing('left'))  {
		
		if (player.vel.x >= baseSpeed) {
			player.vel.x -= baseSpeed
		}
		
		else
		{
			player.vel.x -= userAccel;
		}
	}															

	if(player.vel.x >= drag) {
		player.vel.x -= drag
	}
	
	if(player.vel.x <= -drag) {
		player.vel.x += drag
	}
	
	if(player.vel.y >= drag) {
		player.vel.y -= drag
	}
	
	if(player.vel.y <= -drag) {
		player.vel.y += drag
	}
	if (abs(player.vel.y) < drag && !kb.pressing('up') && !kb.pressing('down'))
		{
			player.vel.y = 0;
		}
	
		if (abs(player.vel.x) < drag && !kb.pressing('right') && !kb.pressing('left'))
		{
			player.vel.x = 0;
		}
}

//powerup code

function timeStoping() {
	let stopChecker = millis() - lastStop;
			
	if (player.overlaps(timeStop)) {
		hoshiplatinum = true;
	}
	if (stopChecker > stopInterval) {
		if (kb.presses("i")) {
			
			if(hoshiplatinum = true) {
				enemySpeed = 0;
				enemyShotMillis = 500000;
			}
			
			setTimeout(function() {
				enemyShotMillis = 750;
				enemySpeed = 5;
				lastStop = millis();
			}, 2000);
		}
	}
}

function guardianUP() {
	if (player.overlaps(guardianPowerUp)) {
		let guardian = new guardians.Sprite()
		guardianPowerUp.remove();
	}
	
	if(guardians.length > 0 && guardians.length <= 8) {
			if (guardians.length < 8) {
				let guardian = new guardians.Sprite();
			}

			timeCounter += 1
			
			for(x= 0; x < guardians.length; x++ ) {
				guardians[x].x = 100*cos(timeCounter + ((360/guardians.length)*x)) + player.x;
				guardians[x].y = 100*sin(timeCounter + ((360/guardians.length)*x)) + player.y;
			}
			
			if(enemy.colliding(guardians)) {
				enemyHealth -= 0.4;
				print("あああああ");
			}
			// guardian.x = guardianX + player.x;
			// guardian.y = guardianY + player.y;
		}
}

function shotSpeedUp() {
	if (player.overlaps(speedUp)) {
		speedUp.remove();
		shotSpeed += 5;
		print(shotSpeed)
	}
}

function shotSizeUp() {
	if (player.overlaps(sizeUp)) {
		shotSize +=10;
		print(shotSize);
		sizeUp.remove();
	}
}

function shotTimeDown() {
	if (player.overlaps(timeUp)) {
		shotTime -=400;
		print(shotTime);
		timeUp.remove();
	}
}
function swordLengthUp(){
	if(player.overlaps(lengthUp))
		{
			swordHitBox.width += lengthIncrease;
			swordHitBox.height += lengthIncrease;
			sword.width += lengthIncrease;
			swinger.width+= lengthIncrease;
			lengthUp.x = -200;
			swinger.offset.x = (swinger.width*0.5);
			print("aa");
		}
}

function dash() {
	if (kb.presses("space")) {
		
		dashChecker = millis() - lastDash;
		
		if (dashChecker > 500) {
			
			if(kb.pressing('up')) {
				player.y -= dashDistance;
			}
			
			if(kb.pressing('down')) {
				player.y += dashDistance;
			}
			
			if(kb.pressing('left')) {
				player.x -= dashDistance;
			}
			
			if(kb.pressing('right')) {
				player.x += dashDistance;
			}
			
			lastDash = millis();
		}
	}
}
function spawnSword() {
	sword = new Sprite(-200,200,65,15,'n')
	swinger = new Sprite(-200,200,65,15,'n')
}

function swordMovement() {
	sword.rotation = sword.angleTo(mouse);
	sword.x = (sword.width*1/2)*cos(player.angleTo(mouse)) + player.x;
	sword.y = (sword.width*1/2)*sin(player.angleTo(mouse)) + player.y;
}

function swordSwing()
{
	if(millis() - swingTime > 500)
		{
	swingTime = millis();
		// shootBall();
	swingerAngle = sword.angleTo(mouse)+45
	swinger.rotation = sword.angleTo(mouse)-60;
	r = sword.angleTo(mouse)+60
	swinger.rotateTo(r, 15)
			// let ball = new balls.Sprite(player.x, player.y, 20, 20, "none");
			// // ball.rotation = ball.angleTo(mouse);
			// ball.color = 255;
			// ball.stroke = 255;
			// ball.direction = ball.angleTo(mouse);
			// ball.speed = shotSpeed;
			
		}
	if (balls.length > 0) {
		for (b = 0; b < balls.length; b ++) {
			if(balls.overlaps(enemy)) {
				balls[b].remove();
				enemyHealth -= 1;
				enemyHealthBar.width -= 24;
				enemyHealthBar.x -= 12;
			}
		}
	}

}
function shootChecker(){
		if (balls.length > 0) {
		for (b = 0; b < balls.length; b ++) {
			if(balls.overlaps(enemy)) {
				balls[b].remove();
				enemyHealth -= 1;
				enemyHealthBar.width -= 24;
				enemyHealthBar.x -= 12;
			}

			else if(balls[b].overlaps(floor) || balls[b].overlaps(roof) || balls[b].overlaps(leftwall) || balls[b].overlaps(rightwall)) {
				balls[b].remove();
			}
		}
	}
}
function swordBehavior() {
				swinger.x = (swinger.height*0.5+15)*cos(player.angleTo(mouse)) + player.x;
			swinger.y = (swinger.height*0.5+15)*sin(player.angleTo(mouse)) + player.y;
	sword.rotation = sword.angleTo(mouse);
	shootChecker();
	r = 0
	
	if (mouseIsPressed) {
		swordSwing();
	}
	
	if (enemy.overlaps(swordHitBox)) {
		enemyHealth -= 5;
		print(enemyHealth);
	}
	
	if(millis() - swingTime > 280) {
		// swinger.x = -500
		// swinger.y = -500
		swordHitBox.x = -500
		swordHitBox.y = -500
		sword.visible = false

		swinger.rotation = swinger.angleTo(mouse)
	}
	
	else {
			//50 *swordhitbox multiplier for pos
			swordHitBox.rotation = sword.angleTo(mouse);
			swordHitBox.x = (swordHitBox.width*0.5)*cos(player.angleTo(mouse)) + player.x ;
			swordHitBox.y = (swordHitBox.width*0.5)*sin(player.angleTo(mouse)) + player.y ;
			sword.visible = false
		}

    swordMovement()
}

function shootLaser() {
	if (mouseIsPressed && playerAlive) {
		laserMilliChecker = millis() - laserLastShot;
		if (laserMilliChecker > 500) {
			let laser = new lasers.Sprite(0, 0, 2000,10, "none");
			laser.rotation = player.angleTo(mouse);
			laser.x = (laser.width*1/2)*cos(player.angleTo(mouse)) + player.x;
			laser.y = (laser.width*1/2)*sin(player.angleTo(mouse)) + player.y;
			laser.color = 255;
			laser.stroke = 255;
			// ball.direction = ball.angleTo(mouse);
			// ball.speed = shotSpeed;
			laserLastShot = millis()
		}

	}
	if (lasers.length > 0) {
		for (b = 0; b < lasers.length; b ++) {
			if(lasers.overlaps(enemy)) {
				
				enemyHealth -= 5;
				enemyHealthBar.width -= 24;
				enemyHealthBar.x -= 12;
				print(enemyHealth);
			}


		}
	}
	//millis()-laserLastShot > 100 && 
	if(lasers.length> 0)
		{
			for(x=0;x<lasers.length; x++)
				{
					// lasers[x].remove();
					lasers[x].height -=1;
					print(lasers[x].height)
					if (lasers[x].height <0 || lasers[x].height > 10)
						{
							lasers[x].remove();
						}
				
				}
		}
}

