function fetchIntro(url, otherUser, userName){

	$.ajax({
		url: url+'/resume/get/introFetch', 
		data: {otherUser:otherUser, userName:userName},
		type: "GET",
		tryCount : 0,
		retryLimit : 1,
		success: function(data) {
			var intro = eval(data);
			if (!jQuery.isEmptyObject(intro)){
				document.getElementById("introBlurb").innerHTML=intro.intro;
			}
		},
		error: function(data){
			this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                $.ajax(this);
                return;
            }            
            return;
		}
	});

	return false;
}