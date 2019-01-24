function shareProfile(url, otherUser, userName){
	var twitter = $('#twitter').is(':checked'); 
	var facebook = $('#facebook').is(':checked'); 
	var linkedin = $('#linkedin').is(':checked'); 
	
	
	$.getJSON(url+'/social/shareProfile', {otherUser : otherUser, userName : userName, linkedin: linkedin, twitter: twitter, facebook:facebook}, function(data) {
		disablePopup("#socialShareBackground", "#socialSharePopup");
		$('#socialShared').append("<div class=\"alert alert-success\">Yay! You shared your profile with your friends!</div>");
	});
	return false;
}