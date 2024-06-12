deflectedShotDamage = 20;

function enemySpawn() {
	enemyMilliChecker = 0;
	enemyMilliCheckerHealth = 0;
	enemyMilliCheckerBurst = 0;
	enemyMilliCheckerSpread = 0;
	enemyMilliCheckerWing = 0;
	enemyAlive = true;
	enemyShotSize = windowWidth/50;
	enemyShotSpeed = windowWidth/120;
	lastEnemyShot = millis();
	lastEnemyHealthShot = millis();
	lastEnemyBurstShot = millis();
	lastEnemySpreadShot = millis();
	lastEnemyWingShot = millis();
	lastEnemySpawnFlash = millis();
	
	enemyCanSpawn = false;
	
	maxEnemyHealth = 100;
	maxHealthBarWidth = windowWidth - 240;

	enemyHealth = maxEnemyHealth;
	enemyHealthBarWidth = maxHealthBarWidth;
	
	leftSide = random(100,windowWidth/4);
	rightSide = random(windowWidth/2 + 200, windowWidth- 100);
	spawnLocations = [];

	spawnLocations.push(leftSide);
	spawnLocations.push(rightSide);

	spawnLocation = random(spawnLocations);
	
	enemy = new Sprite(spawnLocation,random(100,windowHeight-100),windowWidth/14, windowWidth/14, "k");
	enemy.color = 40;
	enemy.stroke = color(150, 0);
	enemy.strokeWeight = 2;
	
	lastEnemySpawn = millis();
	lastColor = "dark";
}

function enemyBehavior() {
	if (enemyAlive) {
		
		if (enemyHealth <= 0) {
			enemyAlive = false;
			
			if(weapon == 'sword') {
				swordPowerUps[0].x = 200;	
			}
			if(weapon == 'balls') {
				m=0;
				r= Math.random()*(ballPowerUps.length-1);
				r = Math.round(r);
				ballPowerUps[r].x =200;
			}
		}
		
		enemy.rotateTowards(player, 0.8, 0);

		enemy.direction = enemy.angleTo(player);
		enemy.speed = 3;

		enemyMilliChecker = millis() - lastEnemyShot;
		enemyMilliCheckerHealth = millis() - lastEnemyHealthShot;
		enemyMilliCheckerBurst = millis()  - lastEnemyBurstShot;
		enemyMilliCheckerSpread = millis() - lastEnemySpreadShot;
		enemyMilliCheckerWing = millis() - lastEnemyWingShot;

		if (enemyMilliChecker > enemyRPM) {
			let enemyShot = new enemyShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
			enemyShot.direction = enemyShot.angleTo(player);
			enemyShot.speed = enemyShotSpeed;
			lastEnemyShot = millis();
		}
		
		if (enemyMilliCheckerBurst > 2000 && enemyHealth <= maxEnemyHealth*0.9) {
			let enemyShot = new enemyShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
			enemyShot.direction = enemyShot.angleTo(player);
			enemyShot.speed = enemyShotSpeed-2;
			
			for(numBurst = 0; numBurst <= 3; numBurst ++) {
				let enemyShot = new enemyShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
				enemyShot.direction = enemyShot.angleTo(player) + (45/3) * numBurst;
				enemyShot.speed = enemyShotSpeed-2;
				lastEnemyBurstShot = millis();
			}
			for(numBurst = 0; numBurst <= 3; numBurst ++) {
				let enemyShot = new enemyShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
				enemyShot.direction = enemyShot.angleTo(player) - (45/3) * numBurst;
				enemyShot.speed = enemyShotSpeed-2;
				lastEnemyBurstShot = millis();
			}
		}
		
		if (enemyMilliCheckerHealth > 3000 && enemyHealth <= maxEnemyHealth*0.25) {
			healthShotSpeed = random(4, 11);
			for(s = 0; s < 15; s ++) {
				let enemyHealthShot = new enemyHealthShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
				enemyHealthShot.direction = enemyHealthShot.angleTo(player) + (360/15) * s
				enemyHealthShot.speed = random(4, 11);
				lastEnemyHealthShot = millis();
			}
		}
		
		if (enemyMilliCheckerSpread > 3000 && enemyHealth <= maxEnemyHealth*0.4) {
			for(s = 0; s < numSpreadShots; s ++) {
				let enemyShot = new enemyShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
				enemyShot.direction = enemyShot.angleTo(player) + (360/numSpreadShots) * s
				enemyShot.speed = 5;
				lastEnemySpreadShot = millis();
			}
		}
		
		if (enemyMilliCheckerWing > 2500 && enemyHealth <= maxEnemyHealth/2) {
			for(s = 0; s < 3; s ++) {
				let enemyShot = new enemyShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
				enemyShot.direction = enemyShot.angleTo(player) + 90
				enemyShot.speed = 5 + (s*1.1);
				lastEnemyWingShot = millis();
			}
			for(s = 0; s < 3; s ++) {
				let enemyShot = new enemyShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
				enemyShot.direction = enemyShot.angleTo(player) - 90
				enemyShot.speed = 5 + (s*1.2);
				lastEnemyWingShot = millis();
			}
		}

		if (enemyShots.length > 0) {
			for (e = 0; e < enemyShots.length; e ++) {
				if(enemyShots[e].overlaps(player)) {
					if (playerInvincible == false) {
						enemyAlive = false;
						playerAlive = false;
						gameLoop = false;
					}
				}
				
				else if(enemyShots[e].overlaps(swordHitBox)){
					enemyShots[e].direction = enemyShots[e].angleTo(mouse);
					enemyShots[e].speed = shotSpeed;
					enemyShots[e].stroke = 255;
					enemyShots[e].name = 'a';
				}
				
				else if(enemyShots[e].overlaps(enemy) && enemyShots[e].name == 'a' ){
					enemyHealth -= deflectedShotDamage;
					enemyHealthBar.width -= 24*3;
					enemyHealthBar.x -= 12*3;
					enemyShots[e].remove();
					print(enemyHealth);
					shotsHit+=1;
				}

				else if(enemyShots[e].overlaps(guardians) || enemyShots[e].overlaps(floor) || enemyShots[e].overlaps(roof) || enemyShots[e].overlaps(leftwall) || enemyShots[e].overlaps(rightwall)) {
					enemyShots[e].remove();
				}
			}
		}
		
		if (enemyHealthShots.length > 0 && enemyHealth <= 50) {
			for (e = 0; e < enemyHealthShots.length; e ++) {
				if(enemyHealthShots[e].overlaps(player) && enemyHealth <= 50) {
					enemyHealthShots[e].remove();
					enemyHealth += 5;
				}
				
				else if(enemyHealthShots[e].overlaps(swordHitBox)){
					enemyHealthShots[e].direction = enemyHealthShots[e].angleTo(mouse);
					enemyHealthShots[e].speed = shotSpeed;
					enemyHealthShots[e].stroke = 255;
					enemyHealthShots[e].name = 'a';
				}
				
				else if(enemyHealthShots[e].overlaps(enemy) && enemyHealthShots[e].name == 'a' ){
					enemyHealth -= deflectedShotDamage;
					enemyHealthShots[e].remove();
				}

				else if(enemyHealthShots[e].overlaps(guardians) || enemyHealthShots[e].overlaps(floor) || enemyHealthShots[e].overlaps(roof) || enemyHealthShots[e].overlaps(leftwall) || enemyHealthShots[e].overlaps(rightwall)) {
					enemyHealthShots[e].remove();
				}
			}
		}
		
		if (enemyHealth >= maxEnemyHealth) {
			enemyHealth = maxEnemyHealth;
		}
		
		if (player.overlaps(enemy)) {
			if (playerInvincible == false) {
				enemyAlive = false;
				playerAlive = false;
				gameLoop = false;
			}
		}
	}
}

function checkBossHealth() {
	enemyHealthBar.width = (enemyHealth/maxEnemyHealth) * maxHealthBarWidth;
	enemyHealthBar.x = 120 + (enemyHealthBar.width/2);
}