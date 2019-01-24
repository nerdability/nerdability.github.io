function Resume(url,otherUser,userName){
	
	var removeBlog = function(data){
		var id = event.target.id;
		var self = this; 
		$.post(url+'/resume/post/removeBlog', {id:id,otherUser:otherUser,userName:userName}, function(data) {
			$(self).remove(); 
		});
		
	};
	var manageMode = false; 
	var r = {
			fetchJobs: function(){
				
				$.ajax({
					url: url+'/resume/get/jobs', 
					data: {otherUser:otherUser, userName:userName},
					type: "GET",
					tryCount : 0,
					retryLimit : 1,
					success: function(data) {
						var jobs = eval(data);
						if (!jQuery.isEmptyObject(jobs)){
							Jobs(url).appendJobs(jobs,otherUser); 
						}else if (otherUser != "true"){
							Jobs(url).appendJobs([],otherUser); 
							var newRow = "<div class=\"alert \">Start adding your career history now..</div>";
							document.getElementById("workEmptyMsg").innerHTML=newRow;
						} else {
							$('#jobsBubble').hide();
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
			},
			fetchEducation: function(){

				$.ajax({
					url: url+'/resume/get/education', 
					data: {otherUser:otherUser, userName:userName},
					type: "GET",
					tryCount : 0,
					retryLimit : 1,
					success: function(data) {
						var education = eval(data);
						if (!jQuery.isEmptyObject(education)){
							Education(url).appendEducation(education,otherUser); 
						}else if (otherUser!= "true"){
							Education(url).appendEducation([],otherUser);
							var newRow = "<div class=\"alert \">Start adding your education details..</div>";
							document.getElementById("educationEmptyMsg").innerHTML=newRow;
						} else {
							$('#educationBubble').hide();
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
			},
			fetchSkills: function(){
				$.ajax({
					url: url+'/resume/get/skills', 
					data: {otherUser:otherUser, userName:userName},
					type: "GET",
					tryCount : 0,
					retryLimit : 1,
					success: function(data) {
						var skills = data;
						if (!jQuery.isEmptyObject(skills)){
							$.each(skills, function() {
								var thisId = this.id; 
								var newRow = " <span id=\"" + this.id + "\"class=\"label label-info label-padded label-killable\"> "+this.skill+" </span> &nbsp";
								$('#skills').append(newRow);
								if (this.interest!=null && this.interest!=""){
									var skillMsg = "<b>Length of Experience:</b> " + this.experience + "; <br/><b>Level of Interest:</b> " + this.interest;
									$('#'+this.id).popover({title:"Skill Details", content:skillMsg});
								}
								
								$('#'+this.id).click(function(){
									if(manageMode){
										$('#'+thisId).popover('hide');
										r.removeSkill(thisId);
									}
								});
							});
						}else if (otherUser != "true"){
							var newRow = "<div class=\"alert \">Connect to GitHub or start adding skills now</div>";
							document.getElementById("skills").innerHTML=newRow;
						} else {
							$('#skillsBubble').hide();
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
			},
			fetchBlogs: function(){
				$.ajax({
					url: url+'/resume/get/blogs', 
					data: {otherUser:otherUser, userName:userName,numberOfBlogs:3},
					type: "GET",
					tryCount : 0,
					retryLimit : 1,
					success: function(data) {
						var blogData = eval(data);
						if (!jQuery.isEmptyObject(blogData) && blogData.articles.length>0){
							r.appendBlogs(blogData);
						}else if (otherUser != "true"){
							var newRow = "<div class=\"alert \">Add some blogs and improve your nerdscore!</div>";
							document.getElementById("blogArticles").innerHTML=newRow;
						} else {
							$('#blogBubble').hide();
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
			},
			appendBlogs: function(blogData){
				$.each(blogData.articles, function() {
					
					if(this.articleDescription!=null)
					{
						var newRow = ""+this.articleTitle+":<i><a href="+this.articleLink+">"+this.articleDescription+"</a></i>&nbsp<br/><br/>";
					}
					else
					{
						 newRow = "<a href="+this.articleLink+"> "+this.articleTitle+"</a> &nbsp <br/><br/>";
					}
					$('#blogArticles').append(newRow);
				});
				
				$.each(blogData.blog,function(){
					var html = '<li><button type="submit" id="'+this.id+'" class="btn-block removeBlog btn btn-primary"><i class=" icon-remove icon-white"></i>'+this.blogUrl+'</button><br/></li>';
					$('#removeButtonsForBlogs').append(html); 
				})
				$('.removeBlog').click(removeBlog); 
			},
			fetchMobileApps: function() {
				$.ajax({
					url: url+'/resume/get/mobileApps', 
					data: {otherUser:otherUser, userName:userName},
					type: "GET",
					tryCount : 0,
					retryLimit : 1,
					success: function(data) {
						var mobileApps = eval(data);
						if (!jQuery.isEmptyObject(mobileApps)){
								Mobile(url).appendMobileApps(mobileApps,otherUser);
						}else if (otherUser != "true"){
							Mobile(url).appendMobileApps([],otherUser);
							var newRow = "<div class=\"alert \">Starting adding apps you have created now!</div>";
							document.getElementById("mobileEmptyMsg").innerHTML=newRow;
						} else {
							$('#mobileBubble').hide();
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
			},
			addSkill: function(){
				var newSkill = $("#newSkill").val();
				var experience = $("#experience").val();
				var interest = $("#interest").val();
				$.ajax({
					url: url+'/resume/post/addSkill', 
					data: {newSkill : newSkill, experience:experience, interest:interest},
					type: "POST",
					success: function(data) {
						data = jQuery.parseJSON(data);
						$('#skills').append("<span id=\""+data.id+"\" class=\"label label-info label-padded label-killable\"> "+data.value+" </span> &nbsp");
						$('#'+data.id).click(function(){
							if(manageMode){							
								r.removeSkill(data.id);
							}
						});
					}
				});
				
				return false;
			},
			manageSkills: function(){
				manageMode = !manageMode ; 
				$('#skills .label-killable').each(function(){
					var child = $(this); 
					var html = child.html(); 
					if(!manageMode){
						$('#skills .killable-tag').remove();
					}else{
						child.html(child.html()+ "<i class='killable-tag icon-remove icon-white'></i>");
					}
					
				}); 
				
			},
			addBlog: function(){
				var newBlogUrl = $("#newBlogUrl").val();

				$.ajax({
					url: url+'/resume/post/addBlog', 
					data: {blogUrl:newBlogUrl},
					type: "POST",
					success: function(data) {
						data = jQuery.parseJSON(data);
						r.appendBlogs(data);
					}
				});
				return false;
			},removeBlog: function(id){

				$.ajax({
					url: url+'/resume/post/removeBlog', 
					data: {blogId:id},
					type: "POST",
					success: function(data) {
						$('#'+id).remove();
					}
				});
				return false;
			},removeSkill: function(id){

				$.ajax({
					url: url+'/resume/post/removeSkill', 
					data: {skillId:id},
					type: "POST",
					success: function(data) {
						$('#'+id).remove();
					}
				});
				
				return false;
			},
			addRole: function(){
				var roleName = $("#roleName").val();
				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				var company = $("#company").val();
				var companyUrl = $("#companyUrl").val();
				var description = $("#roleDescription").val();

				$.ajax({
					url: url+'/resume/post/addRole', 
					data: {roleName:roleName,startDate:startDate,endDate:endDate,company:company,companyUrl:companyUrl,description:description},
					type: "POST",
					success: function(data) {
						data = jQuery.parseJSON(data);
						var numRows = workExpGrid.getRowCount();
						var newRow = {
								title:data.roleName, 
								startdate:data.startDate,
								enddate:data.endDate, 
								company:data.company, 
								action:"<a class=\"btn btn-mini btn-danger removeRole\" href=\"#\" rowIndex="+numRows+" rId="+data.id+"> <i class=\"icon-trash icon-white\"></i> </a>"
						};
						numRows = numRows==0? 0 : numRows-1;
						workExpGrid.insertAfter(numRows, data.id, newRow);
					
						document.getElementById("workEmptyMsg").innerHTML="";
						$("#experienceShowBox").hide('fast');
					}
				});
				return false;
			},
			addEducation: function(){
				var certification = $("#certification").val();
				var subject = $("#subject").val();
				var date = $("#date").val();
				var school = $("#school").val();

				$.ajax({
					url: url+'/resume/post/addEducation', 
					data: {certification:certification,subject:subject,date:date,school:school},
					type: "POST",
					success: function(data) {
						data = jQuery.parseJSON(data);
						var numRows = educationGrid.getRowCount();
						var newRow = {
								certification:data.certification, 
								subject:data.subject,
								date:data.date, 
								school:data.school, 
								action:"<a class=\"btn btn-mini btn-danger removeEducation\" href=\"#\" rowIndex="+numRows+" rId="+data.id+"> <i class=\"icon-trash icon-white\"></i> </a>"
						};
						numRows = numRows==0? 0 : numRows-1;
						educationGrid.insertAfter(numRows, data.id, newRow);
						document.getElementById("educationEmptyMsg").innerHTML="";
						$("#educationShowBox").hide('fast');
					}
				});
				return false;
			},
			addMobileApp: function(){
				var appName = $("#appName").val();
				var platform = $("#platform").val();
				var website = $("#website").val();

				$.ajax({
					url: url+'/resume/post/addMobileApp', 
					data: {appName:appName,platform:platform,website:website},
					type: "POST",
					success: function(data) {
						data = jQuery.parseJSON(data);
						var numRows = mobilePortfolioGrid.getRowCount();
						var newRow = {
								name:data.name, 
								platform:data.platform,
								website:data.website,  
								action:"<a class=\"btn btn-mini btn-danger removeMobile\" href=\"#\" rowIndex="+numRows+" rId="+data.id+"> <i class=\"icon-trash icon-white\"></i> </a>"
						};
						numRows = numRows==0? 0 : numRows-1;
						mobilePortfolioGrid.insertAfter(numRows, data.id, newRow);
						document.getElementById("mobileEmptyMsg").innerHTML="";
						$("#mobileShowBox").hide('fast');
					}
				});
				return false;
			},
			addCustomSection: function(){
				var title = $("#sectionHeading").val();
				var customText = $("#customText").val();
				$.ajax({
					url: url+'/resume/post/addCustomSection', 
					data: {title:title, content:customText},
					type: "POST",
					success: function(data) {
						data = jQuery.parseJSON(data);
						r.appendCustomSection(data);
						$("#sectionHeading").val("");
						$("#customText").val("");
						$("#customParasShowBox").hide();
					}
				});
				return false;
			},
			removeCustomSection: function(id){

				$.ajax({
					url: url+'/resume/post/removeCustomSection', 
					data: {customSectionId:id},
					type: "POST",
					success: function(data) {
						$('#'+id).remove();
					}
				});
				
				return false;
			}
			,
			appendCustomSection: function(section){
				if(section!=null){
					var errorBtn =""; 
					if (otherUser != "true"){
						errorBtn = '<a id="customErrRemove'+section.id+'" class="btn btn-small btn-danger removeBtn" href="#"><i class="icon-trash icon-white"></i> Remove Section </a>';
					}
					var newRow = "<div id='"+section.id+"' class='removable-custom-div rounded_panel txt_lightgrey'>" +
							"<div class='top-rounded-panel grey-bg'>" +
								"<h1 id='customTitle_"+section.id+"' class='edit_custom_title_area' title='Click to edit...'>" + section.sectionTitle + "</h1>" +
							"</div>" +
							"<div class='content-rounded-panel'>" + 
								"<div id='customContent_"+section.id+"' class='edit_custom_area' title='Click to edit...'>" + section.sectionContent + "</div>" + 
									"<br/>" +
									errorBtn+
								"</div>" +
							"</div>";
					$('#newCustomSections').append(newRow);
					if (otherUser != "true"){
						$('#customErrRemove'+section.id).click(function(){
							r.removeCustomSection(section.id); 
						});
					}
				}
				
			},
	}
	
	return r ; 
}

