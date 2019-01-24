var Dashboard = function() {
	
	var dashboardObj = {
		initialiseSpeedometer : function( speedoValue ){
			//init canvas
			var canvas = document.getElementById( "user-speedometer" );
			canvas.width  = 250;
			
			//render
			var opts = {
					lines: 12,
					angle: 0.05,
					lineWidth: 0.44,
					pointer: {
						length: 0.9,
						strokeWidth: 0.035,
						color: '#000000'
					},
					colorStart: '#64D864', 
					colorStop: '#64D864',  
					strokeColor: '#CC3333', 
					generateGradient: false
				};
				
			this.gauge = new Gauge( canvas ).setOptions( opts );
			this.gauge.maxValue = 100;
			this.gauge.set( speedoValue ); 
			$( '#user-speedometer-value' ).html( speedoValue + "%" );
		}
	};

	return dashboardObj;
}