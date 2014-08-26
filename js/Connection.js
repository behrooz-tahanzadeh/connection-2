function Connection(a,b,ctx)
{
	this.a = a;
	this.b = b;
	
	this.ctx = ctx;
	
	this.d = Math.random()*250+70;
	
	Main.Connections.push(this);
}//eoc




Connection.prototype.move = function()
{
	var ap = this.a.getPoint2D();
	var bp = this.b.getPoint2D();
	
	var arp = ap.pointAtAngleDist(this.a.rotation, this.d);
	var brp = bp.pointAtAngleDist(this.b.rotation, this.d);
	
	this.ctx.moveTo(this.a.x, this.a.y);
	
	this.ctx.bezierCurveTo
	(
		arp.x, arp.y,
		brp.x, brp.y,
		this.b.x, this.b.y
	);
	
};//eof
