/*
	
	Aurthor: Andrea Carpi (https://www.andreacarpi.it)
	v: 2.0
	
*/
var debug = false;
if (window.location.href.includes(".webex.com")) {
	var basebar = false;
	var sliderBTNw = false;
	document.body.onkeyup = function(e) {
	    if (e.keyCode == 32) {
	        try { document.getElementById("playOrPause").click(); } catch (e) {};
	    } 
	    if (e.keyCode == 37) { 
	        try { updateSteps("SX"); } catch (e) {};
	    }
	    if (e.keyCode == 38) { 
	        try { updateSpeed("FASTER"); } catch (e) {};
	    } 
	    if (e.keyCode == 39) {
	        try { updateSteps("DX"); } catch (e) {};
	    }
	    if (e.keyCode == 40) {
	        try { updateSpeed("SLOWER"); } catch (e) {};
	    }
	    if  (e.keyCode ==70) {
	        try { document.getElementById("fullScreen").click(); } catch (e) {};
	    }
	}

	var step = 10;
	function updateSteps(desired = "DX") {
		if (!basebar) {
			try {
				basebar = document.getElementById("baseBar");
				sliderBTNw = document.getElementsByClassName("el-slider__button-wrapper")[0];
			} catch (e) { console.warn("0", e);}
		}
		try {
			try { $("#screen").simulate("drag-n-drop", {dx: 1}); } catch (e) { if (debug) { console.warn(e); }};
			setTimeout(function () {
				var timePieces = document.getElementById("timeIndicator").innerHTML.split("&nbsp;/&nbsp;")[1].split(":");
				let [hh, mm, ss] = [0, 0, 0];
				if (timePieces.length == 1) {
					ss = timePieces[0];
				} else if (timePieces.length == 2) {
					mm = timePieces[0];
					ss = timePieces[1];
				} else if (timePieces.length == 3) {
					hh = timePieces[0];
					mm = timePieces[1];
					ss = timePieces[2];
				}
				var max = parseInt(hh)*60*60 + parseInt(mm)*60 + parseInt(ss);
				var dx = basebar.getBoundingClientRect().width* (step/max);
				setTimeout(function () {
					$(sliderBTNw).simulate("drag-n-drop", {dx: (desired == "DX")?dx:-dx});
				} , 20);
			}, 20)
		} catch (e) { console.warn("1", e); }
	}
	function updateSpeed(speed = "FASTER") {
		try {
			try { $("#screen").simulate("drag-n-drop", {dx: 1}); } catch (e) { if (debug) { console.warn(e); }};
	
			setTimeout(function () {
				try { document.getElementById("playerSetting").click();	} catch (e) {};
				
				setTimeout(function () {
					try { document.getElementById("toSpeedSetting").click(); } catch (e) {};
					setTimeout(function () {
						var speeds = document.getElementsByClassName("icon-ng-check speed-item");
						var disabledSpeeds = document.getElementsByClassName("icon-ng-check speed-item disabled"); 
						var b = new Set(disabledSpeeds);
						var selectedSpeed = [...speeds].filter(x => !b.has(x))[0];
						var i = 0;
						var speedIndex = 0;
						
						for (var i = 0; i < speeds.length; i++) {
							if (speeds[i].id == selectedSpeed.id) {
								speedIndex = i;
							}
						}
						
						try {
							if (speedIndex < speeds.length -1 && speed == "FASTER") {
								speeds[speedIndex+1].click();
							} else if (speedIndex > 0 && speed == "SLOWER") {
								speeds[speedIndex-1].click();
							}
						} catch (e) {};
						
						setTimeout(function () {
							try { document.getElementById("playerSetting").click();	} catch (e) {};
						}, 100);
					} , 60);
				} , 60);
			}, 20)
		} catch (e) {}
	}
}



