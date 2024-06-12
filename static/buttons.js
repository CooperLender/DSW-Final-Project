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