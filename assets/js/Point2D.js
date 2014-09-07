function Point2D(x,y)
{
	this.x = x;
	this.y = y;
}//eoc



/**
 * Return a new Point2D at a given Angle and Distance from current point
 * @param a Angle in radians
 * @param d Distance number
 * @returns {Point2D}
 */
Point2D.prototype.pointAtAngleDist = function(a,d)
{
	var dx = Math.cos(a)*d;
	var dy = Math.sin(a)*d;
	
	return new Point2D(this.x+dx, this.y+dy);
};//eof




Point2D.prototype.distanceToXY = function(x,y)
{
	return Math.sqrt(Math.pow(this.x-x, 2) + Math.pow(this.y-y, 2));
};//eof