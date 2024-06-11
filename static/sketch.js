let enemy, player, floor, roof, leftwall, rightwall, balls, enemyShots, speedUp,sizeUp,timeUp,timeStop,guardian,guardianPowerUp,guardianCount, walls, sword,swinger, swordHitBox, ballPowerUps, swordPowerUps,lasers, shotsShot, shotsHit;

let gameLoop = false;

let playerInvincible = false;

shotsShot = 0;
shotsHit = 0;
scoreMillis = 0;
newGameMillis = 0;
userAccel = 0.1;
drag = 1;
totalMillis = 0;
milliChecker = 0;
lastShot = 0;
baseSpeed = 1;
shotTime = 200; //200
shotSpeed = 0;
shotSize = 20;
playerAlive = true;

laserMilliChecker =0;
laserLastShot =0;
enemyMilliChecker = 0;
enemyMilliCheckerHealth = 0;
enemyMilliCheckerBurst = 0;
enemyMilliCheckerSnipe = 0;
enemyRPM = 500;
enemyShotSize = 30;
enemyShotSpeed = 0;
enemyHealth = 50;
enemyHealthBarWidth = 200;
enemyAlive = true;
lastEnemyShot = 0;
lastEnemyHealthShot = 0;
lastEnemyBurstShot = 0;
lastEnemySnipeShot = 0;

maxEnemyHealth = 50;
maxHealthBarWidth = 1200;

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
	score = ((shotsShot+1)/(shotsHit+1))*shotsShot;
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
		// print('error')
	}
}
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(40);
	
	frameRate(90);
	
	noStroke();
	
	enemyShots = new Group();
	enemyShots.color = color(255, 100, 100);
	enemyShots.stroke = color(255,100,100);
	enemyShots.layer = 2;
	
	enemyHealthShots = new Group();
	enemyHealthShots.color = color(255, 100, 200);
	enemyHealthShots.stroke = color(255,100,200);
	enemyHealthShots.layer = 1;
	
	balls = new Group();
	balls.color = 255;
	lasers = new Group();
	
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
	
	userAccel = 0.5;
	drag = 0.2;
	totalMillis = 0;

	milliChecker = 0;
	lastShot = 0;
	baseSpeed = 1;
	shotSpeed = windowWidth/96;
	shotSize = windowWidth/72;
	playerAlive = true;

	enemyMilliChecker = 0;
	enemyMilliCheckerHealth = 0;
	enemyMilliCheckerBurst = 0;
	enemyMilliCheckerSnipe = 0;
	enemyHealth = 50;
	enemyAlive = true;
	enemyShotSize = windowWidth/48;
	enemyShotSpeed = windowWidth/120;
	lastEnemyShot = 0;
	lastEnemyHealthShot = 0;
	lastEnemyBurstShot = 0;
	lastEnemySnipeShot = 0;
	
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
	scoreSender = false;

	weapon = "laser";
		if(swordHitBox)
		{
			swordHitBox.remove();
		}
	swordHitBox = new Sprite(-200,-200,80,75, 'n');
	swordHitBox.stroke = 40
	swordHitBox.color =40

	guardians = new Group();
	guardians.diameter = 10;
	speedUp = new Sprite(-400,400,50,50, "none");
	sizeUp = new Sprite(-500,400,50,50, "none");
	timeUp = new Sprite(-600,400,50,50, "none");
	timeStop = new Sprite(-700,400,50,50, "none");
	lengthUp= new Sprite(-400,400,50,50, "none");
	guardianPowerUp = new Sprite(-800,400,50,50, "none");
	guardian = new Sprite(0,0,0,0, "none");
	if(sword)
		{
	sword.remove();
		}
	if(swinger)
		{
			swinger.remove();
		}
	ballPowerUps= [speedUp,sizeUp,timeUp, guardianPowerUp];
	swordPowerUps = [lengthUp, guardianPowerUp];
	spawnSword();
	swinger.offset.x = (swinger.width*0.5);
	
	player = new Sprite(windowWidth/2,windowHeight/2,windowWidth/48,windowWidth/48);
	player.color = 40;
	
	leftSide = random(100,windowWidth/4);
	rightSide = random(windowWidth/2 + 200, windowWidth);
	spawnLocations = [];

	spawnLocations.push(leftSide);
	spawnLocations.push(rightSide);

	spawnLocation = random(spawnLocations);
	
	enemy = new Sprite(spawnLocation,random(0,windowHeight-100),windowWidth/14, windowWidth/14)
	enemy.color = 40;
	
	enemyHealthBarBorder = new Sprite(windowWidth/2,40, windowWidth-236, 20, "none");
	enemyHealthBarBorder.color = 40;
	enemyHealthBarBorder.stroke = 255;
	enemyHealthBarBorder.layer = 1;
	
	enemyHealthBar = new Sprite(windowWidth/2, 40, windowWidth-240, 16, "none");
	enemyHealthBar.color = color(255, 100, 100);
	enemyHealthBar.stroke = color(255,100,100);
	enemyHealthBar.layer = 2;
}

function draw() {
	
	if (gameLoop === false) {
	
		menu();
		scores();
		
	}
	
	if (gameLoop === true) {
		cursor(CROSS);
		
		dash();
		scores();
		shotSpeedUp();
		shotTimeDown();
		shotSizeUp();
		playerMovement();
		timeStoping();
		guardianUP();
		swordLengthUp();
		
		if (weapon == "sword")
			{
		swordBehavior();
			}
		if (weapon == "balls")
			{
				shootBall();
			}
		if (weapon == "laser")
			{
				shootLaser();
			}
		
		playerMovement();

		enemyBehavior();

		stroke(255);
		strokeWeight(2);

		player.rotateTowards(mouse, 0.8, 0);

		clear();
	}
}


