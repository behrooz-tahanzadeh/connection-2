function Dot(x,y,ctx)
{
	this.ctx = ctx;
	
	this.rotation = Math.random();
	this.vr = (Math.random()/16)-(0.5/16);
	
	this.x = x;
	this.y = y;
	
	Main.Dots.push(this);
}//eoc




Dot.prototype.move = function()
{
	this.rotation += this.vr;
	
	this.ctx.moveTo(this.x+Main.DotsRadius, this.y);
	this.ctx.arc(this.x,this.y,Main.DotsRadius,0,2*Math.PI);
};//eof



Dot.prototype.getPoint2D = function()
{
	return new Point2D(this.x, this.y);
};//eof



Dot.prototype.isIncludeXY = function(x,y)
{
	return this.getPoint2D().distanceToXY(x,y) <= Main.DotsRadius;
};//eof