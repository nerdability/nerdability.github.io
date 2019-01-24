function Login(){
	
	
	var loginRegistrationButtons =
		'<a style="margin-left: auto; margin-right: auto;" class="btn btn-primary btn-large" href="registercompany" id="company-registration"><b>Company?</b></a>'+
		'<span class="company-spacing"></span>'+
		'<a style="margin-left: auto; margin-right: auto;" class="btn btn-primary btn-large" href="register" id="developer-registration"><b> Developer ?</b></a>';
	var l = {
			setupBindings : function(){
				$('#reg-button').click(function(){
					$('#registration-container').empty(); 
					$('#registration-container').html(loginRegistrationButtons); 
				})
				
			}
	};
	
	return l ; 
}