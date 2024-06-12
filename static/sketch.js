let enemy, player, floor, roof, leftwall, rightwall, balls, enemyShots, speedUp,sizeUp,timeUp,timeStop,guardian,guardianPowerUp,guardianCount, walls, sword,swinger, swordHitBox, enemyHealthBar;

let gameLoop = false;

let playerInvincible = false;

let newBossSpawn = true;
let bossHasSpawned = false;

scoreSender = false;
shotsHit = 0;
shotsShot = 0;
topSpeed = 15;
userDecel = 0.5;
baseSpeed = 1;
drag = 0.3;
totalMillis = 0;
milliChecker = 0;
lastShot = 0;
shotTime = 200;
shotSpeed = 0;
shotSize = 20;
playerAlive = true;

laserMilliChecker =0;
laserLastShot =0;

enemyMilliChecker = 0;
enemyMilliCheckerHealth = 0;
enemyMilliCheckerBurst = 0;
enemyMilliCheckerSnipe = 0;
enemyRPM = 300;
enemyShotSize = 30;
enemyShotSpeed = 0;
enemyAlive = true;

numSpreadShots = 16;

lastEnemyShot = 0;
lastEnemyHealthShot = 0;
lastEnemyBurstShot = 0;
lastEnemySnipeShot = 0;

enemyCanSpawn = false;

maxEnemyHealth = 50;
maxHealthBarWidth = 1200;

enemyHealth = maxEnemyHealth;
enemyHealthBarWidth = maxHealthBarWidth;

dashChecker = 0;
lastDash = 0;
dashDistance = 100;
hoshiplatinum = true;
enemySpeed = 5;
guardianCount = 0;
timeCounter =0;
lastStop = 0;
stopInterval = 2000;
swingerAngle = 0;
swingTime = 0;

weapon = "balls";

o = 0;

fr = 60;
function sendData()
{
	$.post("/scoresave",
	{
		"score" : score
	});
}
function scores()
{
	if (playerAlive == false && scoreSender == false)
		{
	score = int(((shotsShot+1)/(shotsHit+1))*shotsShot);
	sendData();
	scoreSender = true;
	print("data SENT!")
		}
	if (playerAlive == true && scoreSender == true)
		{
			scoreSender = false
			print("data not sent yet")
		}
	else
	{
		//  print('error')
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	noStroke();
	
	lastEnemySpawn = 0;
	
	ballsButton = new Button((windowWidth/2) - 200,windowHeight/2 - 250,120,40,"BALLS",10);
	swordButton = new Button((windowWidth/2) - 60,windowHeight/2 - 250,120,40,"SWORD",10);
	laserButton = new Button((windowWidth/2) + 80,windowHeight/2 - 250,120,40,"LASER",10);
	
	settingsButton = new Button((windowWidth/2) - 60,windowHeight/2 + 200,120,40,"SETTINGS",10);
	
	fps60Button = new Button((windowWidth/2) - 200,windowHeight/2 - 200,120,40,"60",10);
	fps90Button = new Button((windowWidth/2) - 60,windowHeight/2 - 200,120,40,"90",10);
	fps144Button = new Button((windowWidth/2) + 80,windowHeight/2 - 200,120,40,"144",10);
	
	fullscreenOnButton = new Button(windowWidth/2 - 100,windowHeight/2,120,40,"60",10);
	fullscreenOffButton = new Button(windowWidth/2 + 100,windowHeight/2,120,40,"60",10);
	
	backButton = new Button((windowWidth/2) - 60,windowHeight/2 + 100,120,40,"BACK",10);
	
	enemyShots = new Group();
	enemyShots.color = color(255, 100, 100);
	enemyShots.stroke = color(255,100,100);
	enemyShots.layer = 2;
	
	enemyHealthShots = new Group();
	enemyHealthShots.color = color(100, 200, 200);
	enemyHealthShots.stroke = color(100, 200, 200);
	enemyHealthShots.layer = 1;
	
	lasers = new Group();
	
	balls = new Group();
	balls.color = 255;
	
	push();
	noStroke();
	floor = new Sprite();
	floor.y = windowHeight;
	floor.w = windowWidth;
	floor.h = 5;
	floor.collider = "static";
	floor.color = 255;
	
	roof = new Sprite();
	roof.y = 0;
	roof.w = windowWidth;
	roof.h = 5;
	roof.collider = "static";
	roof.color = 255;
	
	leftwall = new Sprite();
	leftwall.x = 0;
	leftwall.y = windowHeight/2;
	leftwall.w = 5;
	leftwall.h = windowHeight;
	leftwall.collider = "static";
	leftwall.color = 255;
	
	rightwall = new Sprite();
	rightwall.x = windowWidth;
	rightwall.y = windowHeight/2;
	rightwall.w = 5;
	rightwall.h = windowHeight;
	rightwall.collider = "static";
	rightwall.color = 255;
	pop();
}

function restart() {	
	topSpeed = (60/fr) * topSpeed;
	userDecel = (60/fr) * userDecel;
	baseSpeed = (60/fr) * baseSpeed;
	drag = (60/fr) * drag;
	totalMillis = 0;
	milliChecker = 0;
	lastShot = 0;
	shotSpeed = windowWidth/96;
	shotSize = windowWidth/72;
	playerAlive = true;
	
	dashChecker = 0;
	lastDash = 0;
	dashDistance = 100;
	hoshiplatinum = true;
	enemySpeed = 5;
	guardianCount = 0;
	timeCounter =0;
	lastStop = 0;
	stopInterval = 2000;
	swingerAngle = 0;
	swingTime = 0;
	
	o = 0;
	
	swordHitBox = new Sprite(-200,-200,80,75, 'n');
	swordHitBox.stroke = 40
	swordHitBox.color =40

	guardians = new Group();
	guardians.diameter = 10;
	speedUp = new Sprite(-400,400,50,50, "none");
	sizeUp = new Sprite(-500,400,50,50, "none");
	timeUp = new Sprite(-600,400,50,50, "none");
	timeStop = new Sprite(-700,400,50,50, "none");
	guardianPowerUp = new Sprite(-800,400,50,50, "none");
	guardian = new Sprite(0,0,0,0, "none");
	lengthUp= new Sprite(-400,400,50,50, "none");
	
	ballPowerUps= [speedUp,sizeUp,timeUp, guardianPowerUp];
	swordPowerUps = [lengthUp, guardianPowerUp];
	
	spawnSword();
	swinger.offset.x = 25;
	
	player = new Sprite(windowWidth/2,windowHeight/2,windowWidth/48,windowWidth/48);
	player.color = 40;
	player.stroke = 255;
	player.strokeWeight = 2;
	
	enemyHealthBar = new Sprite(windowWidth/2, 40, windowWidth-240, 16, "none");
	enemyHealthBar.color = color(255, 100, 100);
	enemyHealthBar.stroke = color(255,100,100);
	enemyHealthBar.strokeWeight = 2;
	enemyHealthBar.layer = 2;
	
	enemyHealthBarBorder = new Sprite(windowWidth/2, 40, windowWidth-236, 20, "none");
	enemyHealthBarBorder.color = 40;
	enemyHealthBarBorder.stroke = 255;
	enemyHealthBarBorder.strokeWeight = 2;
	enemyHealthBarBorder.layer = 1;
}

function draw() {
	frameRate(fr);
	background(40);

	if (playerAlive === false) {
		if(sword) {	
			sword.remove();
		}
		if(swinger) {
			swinger.remove();
		}
	}
	
	if (gameLoop === false) {
		scores();
		UI();
	}
	
	if (gameLoop === true) {
		scores();
		cursor(CROSS);
		
		checkBossHealth();
		
		dash();
		shotSpeedUp();
		shotTimeDown();
		shotSizeUp();
		playerMovement();
		timeStoping();
		guardianUP();
		swordLengthUp();
		
		if (weapon == "sword") {
			swordBehavior();
		}
		
		if (weapon == "balls") {
			shootBall();
		}
		
		if (weapon == "laser")
			{
				shootLaser();
			}
		
		// print(frameRate())
		
		playerMovement();
		
		if (newBossSpawn === true) {
			newBossSpawn = false;
			bossHasSpawned = true;
			enemySpawn();
		}
		
		if(bossHasSpawned === true) {
			enemySpawnTime = millis() - lastEnemySpawn;

			enemySpawnFlashTime = millis() - lastEnemySpawnFlash;

			if (enemyCanSpawn) {
				enemy.stroke = color(255);
				enemy.collider = "dynamic";
				enemyHasSpawned = false;
				enemyBehavior();
			}

			else {
				if (o <= 255) {
					enemy.stroke = color(255, o);
					o += 0.25 * deltaTime;
				}
				
				else {
					enemyCanSpawn = true;
					lastEnemySpawn = millis();
					o = 0;
				}
			}
		}
		
		if (enemyAlive === false) {
			enemy.remove();
			enemyShots.removeAll();
			enemyHealthShots.removeAll();
			
			newBossSpawn = true;
		}
		
		if (enemyCanSpawn == false && balls.length >= 0) {
			balls.removeAll();
		}
		
		if (playerAlive === false) {
			player.remove();
			balls.removeAll();
			
			enemy.remove();
			enemyShots.removeAll();
			enemyHealthShots.removeAll();
			enemyHealthBar.remove();
		}

		player.rotateTowards(mouse, 0.8, 0);

		// clear();
	}
}
class Button {
	constructor(x,y,w,h,text,textY) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.text = text;
		this.textY = textY;
		this.fill = (30);
	}
	
	isClicked() {
		let hit = false;
		
		hit = collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h);
		
		if(hit == true){
			return true;
		} 
		
		else{
			return false;
		}
	}
	
	draw() {
		let hit1 = false;
		
		hit1 = collidePointRect(mouseX, mouseY, this.x, this.y, this.w, this.h);
		
		if(hit1 == true){
			this.fill = color(80);
		} 
		
		else{
			this.fill = (30);
		}
		
		push();
			stroke(255);
			strokeWeight(2);
			fill(this.fill);
			rect(this.x,this.y,this.w,this.h,10);
		pop();
		
		push();
			fill(255);
			strokeWeight(1);
			textAlign(CENTER);
			textSize(20);
			text(this.text,this.x, this.y+this.textY, this.w, this.h);
		pop();
	}
}