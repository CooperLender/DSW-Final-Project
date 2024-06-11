deflectedShotDamage = 20;
function enemyBehavior() {
	if (enemyAlive) {
		
		if (enemyHealth <= 0) {
			enemy.remove();
			
			enemyShots.removeAll();
			enemyHealthShots.removeAll();
			enemyHealthBar.remove();
			
			enemyAlive = false;
			if(weapon == 'sword')
				{

					
					
					swordPowerUps[0].x = 200;
					
				}
			if(weapon == 'balls')
				{
					m=0;
					r= Math.random()*(ballPowerUps.length-1);
					r = Math.round(r);
					ballPowerUps[r].x =200;
				}
		}
		
		enemy.rotateTowards(player, 1, 0);

		enemy.direction = enemy.angleTo(player);
		enemy.speed = 3;

		enemyMilliChecker = millis() - lastEnemyShot;
		enemyMilliCheckerHealth = millis() - lastEnemyHealthShot;
		enemyMilliCheckerBurst = millis()  - lastEnemyBurstShot;
		enemyMilliCheckerSnipe = millis() - lastEnemySnipeShot;

		if (enemyMilliChecker > enemyRPM) {
			let enemyShot = new enemyShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
			enemyShot.direction = enemyShot.angleTo(player);
			enemyShot.speed = enemyShotSpeed;
			lastEnemyShot = millis();
		}
		
		if (enemyMilliCheckerBurst > 2600) {
			for(numBurst = 0; numBurst < 5; numBurst ++) {
				let enemyShot = new enemyShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
				enemyShot.direction = enemyShot.angleTo(player) +10*numBurst -20;
				enemyShot.speed = enemyShotSpeed-1;
				lastEnemyBurstShot = millis();
			}
		}
		
		if (enemyMilliCheckerSnipe > 5000 && player.vel.x == 0 && player.vel.y == 0) {
			let enemyShot = new enemyShots.Sprite(enemy.x, enemy.y, enemyShotSize/2, "none");
			enemyShot.direction = enemyShot.angleTo(player);
			enemyShot.speed = enemyShotSpeed + 10;
			lastEnemySnipeShot = millis();
		}
		
		if (enemyMilliCheckerHealth > 3000 && enemyHealth <= 40) {
			healthShotSpeed = random(4, 11);
			for(s = 0; s < 50; s ++) {
				let enemyHealthShot = new enemyHealthShots.Sprite(enemy.x, enemy.y, enemyShotSize, "none");
				enemyHealthShot.direction = enemyHealthShot.angleTo(player) +10*s - 80;
				enemyHealthShot.speed = healthShotSpeed;
				lastEnemyHealthShot = millis();
			}
		}

		if (enemyShots.length > 0) {
			for (e = 0; e < enemyShots.length; e ++) {
				if(enemyShots[e].overlaps(player)) {
					if (playerInvincible == false) {
						player.remove();
						enemy.remove();
						
						enemyShots.removeAll();
						enemyHealthShots.removeAll();
						balls.removeAll();
						
						enemyHealthBar.remove();	

						enemyAlive = false;
						playerAlive = false;
						gameLoop = false;
					}
				}

				else if(enemyShots[e].overlaps(floor) || enemyShots[e].overlaps(roof) || enemyShots[e].overlaps(leftwall) || enemyShots[e].overlaps(rightwall) || enemyShots[e].overlaps(guardians) ) {
					enemyShots[e].remove();
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
			
			}
		}
		
		if (enemyHealthShots.length > 0 && enemyHealth <= 50) {
			for (e = 0; e < enemyHealthShots.length; e ++) {
				if(enemyHealthShots[e].overlaps(player) && enemyHealth <= 50) {
					enemyHealthShots[e].remove();
					enemyHealth += 5;
					enemyHealthBar.width += 120;
					enemyHealthBar.x += 60;
				}

				else if(enemyHealthShots[e].overlaps(floor) || enemyHealthShots[e].overlaps(roof) || enemyHealthShots[e].overlaps(leftwall) || enemyHealthShots[e].overlaps(rightwall)|| enemyHealthShots[e].overlaps(guardians) ) {
					enemyHealthShots[e].remove();
				}
					else if(enemyHealthShots[e].overlaps(swordHitBox)){
					enemyHealthShots[e].direction = enemyHealthShots[e].angleTo(mouse);
					enemyHealthShots[e].speed = shotSpeed;
					enemyHealthShots[e].stroke = 255;
					enemyHealthShots[e].name = 'a';
				}
				else if(enemyHealthShots[e].overlaps(enemy) && enemyHealthShots[e].name == 'a' ){
						enemyHealth -= deflectedShotDamage;
					enemyHealthBar.width -= 24*3;
				enemyHealthBar.x -= 12*3;
					enemyHealthShots[e].remove();
						
			
			}
			}
		}
		
		if (enemyHealth >= 50) {
			enemyHealth = 50;
			enemyHealthBar.width = maxHealthBarWidth;
			enemyHealthBar.x = windowWidth/2;
		}
		else
			{
				enemyHealthBar.width = enemyHealthBarWidth/(50/enemyHealth);
				enemyHealthBar.x = 180;
			}
		
		if (player.overlaps(enemy)) {
			if (playerInvincible == false) {
				player.remove();
				enemy.remove();
				
				enemyShots.removeAll();
				enemyHealthShots.removeAll();
				balls.removeAll();
				
				enemyHealthBar.remove();	

				enemyAlive = false;
				playerAlive = false;
				gameLoop = false;
			}
		}
	}

}