Main = 
{
	canvas:false,
	canvasX:false,
	
	intervalTime:20,
	intervalID:-1,
		
	DotsRadius:3,
	Dots:[],
	Connections:[],
	
	pageW:0,
	pageH:0,
	
	help:true,
	
	BgOpacity:1,
	
	dragDotIndex:-1,
	
	
	
	init:function()
	{
		this.canvas = jQuery('#drawingArea').eq(0);
		
		this.pageW = jQuery(window).width();
		this.pageH = jQuery(window).height();
		
		this.canvas.get(0).width = this.pageW;
		this.canvas.get(0).height = this.pageH;
		
		this.canvasX = this.canvas.get(0).getContext("2d");
		
		this.canvas.click(Main.canvasClick);
		this.canvas.mousedown(Main.canvasMouseDown);
		this.canvas.mousemove(Main.canvasMouseMove);
		this.canvas.mouseup(Main.canvasMouseUp);
		
		jQuery("div#pp").click(Main.pp);
		
		this.intervalID = setInterval(this.loop, this.intervalTime);
		
		jQuery('input#tail').change(Main.tailChange);
		
		jQuery(window).keydown(Main.windowOnKeyDown);
		jQuery(window).keyup(Main.windowOnKeyUp);
	},
	
	canvasMouseDown: function(e)
	{
		if(e.ctrlKey && Main.dragDotIndex == -1)
		{
			for(var i=0; i<Main.Dots.length; ++i)
			{
				if(Main.Dots[i].isIncludeXY(e.pageX,e.pageY))
				{
					Main.dragDotIndex = i;
					return;
				}
			}
		}
	},
	
	
	canvasMouseMove: function(e)
	{
		if(Main.dragDotIndex != -1)
		{
			Main.Dots[Main.dragDotIndex].x = e.pageX;
			Main.Dots[Main.dragDotIndex].y = e.pageY;
		}
	},
	
	
	canvasMouseUp: function(e)
	{
		Main.dragDotIndex = -1;
	},
	
	
	windowOnKeyDown: function(e)
	{
		switch (e.keyCode)
		{
		case Keyboard.Right:
			var v = parseFloat(jQuery('input#tail').val())+(e.shiftKey?0.1:0.01);
			jQuery('input#tail').val(v);
			Main.tailChange(null);
			
			break;
			
		case Keyboard.Left:
			var v = parseFloat(jQuery('input#tail').val())-(e.shiftKey?0.1:0.01);
			jQuery('input#tail').val(v);
			Main.tailChange(null);
			
			break;
			
		case Keyboard.Space:
			Main.pp();
			break;
		
		case Keyboard.Ctrl:
			jQuery('body').css('cursor', 'move');
			break;
			
		default:
			console.log(e.keyCode);
		}
	},
	
	windowOnKeyUp: function(e)
	{
		switch (e.keyCode)
		{
		case Keyboard.Ctrl:
			jQuery('body').css('cursor', 'copy');
			break;
		}
	},
	
	
	tailChange:function(e)
	{
		Main.BgOpacity = jQuery('input#tail').val();
	},
	
	
	
	
	canvasClick: function(e)
	{
		if(e.ctrlKey) return;
		
		if(Main.help)
		{
			Main.help = false;
			jQuery("div#help").remove();
		}
		
		var d = new Dot(e.pageX, e.pageY, Main.canvasX);
		
		var dl = (Main.Dots.length-1)*Math.random();
		if(dl==0 && Main.Dots.length>1) dl = 1;
		
		var isAnyConnection = false;
		
		for(var i=0; i<Main.Dots.length-1; ++i)
		{
			if(Math.random()<0.3)
			{
				new Connection(d,Main.Dots[i],Main.canvasX);
				isAnyConnection = true;
			}
		}
		
		if(!isAnyConnection && Main.Dots.length>=2)
		{
			var i = (Main.Dots.length-1)*Math.random();
			i = parseInt(i);
			
			new Connection(d,Main.Dots[i],Main.canvasX);
		}
	},
	
	
	
	
	loop: function()
	{
		var ctx = Main.canvasX;
		
		ctx.fillStyle = "rgba(255,255,255,"+Main.BgOpacity+")";
		ctx.fillRect(0,0,Main.pageW, Main.pageH);
		
		
		ctx.beginPath();
		ctx.lineWidth = "1";
		
		for(var i=0; i<Main.Dots.length; ++i)
			Main.Dots[i].move();
		
		ctx.fillStyle = "Black";
		ctx.fill();
		
		for(var i=0; i<Main.Connections.length; ++i)
			Main.Connections[i].move();
		
		ctx.stroke();
	},
	
	
	
	
	pp: function()
	{
		if(Main.intervalID == -1)
		{
			Main.intervalID = setInterval(Main.loop, Main.intervalTime);
			jQuery("div#pp").html('pasue');
		}
		else
		{
			clearInterval(Main.intervalID);
			Main.intervalID = -1;
			jQuery("div#pp").html('play');
		}
	}
};//eo Main{}


jQuery(document).ready(function(){
	Main.init();
});