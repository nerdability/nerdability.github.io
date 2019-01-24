function Mobile(url) {
	var ui = UI(); 
	var mobileObj = {
		deleteMobileAppDrop: function(e){

			 if (e.stopPropagation)
			 {
			 e.stopPropagation()
			 }
			 if (e.preventDefault) 
			 {
			 	e.preventDefault(); // stops the browser from redirecting off to the text.
				
			 }
			 var rowId = (e.dataTransfer.getData("Text"));
			 mobileObj.deleteMobileApp(rowId);
			 return false;
			  
		},
		appendMobileApps : function(mobileApps,otherUser) {
			var metadata = [];
			metadata.push({ name: "name", label: "App Name", datatype: "string", editable: (otherUser=='false')});
			metadata.push({ name: "platform", label:"Platform", datatype: "string", editable: (otherUser=='false')});
			metadata.push({ name: "website", label: "Website", datatype: "string", editable: (otherUser=='false')});
			if(otherUser == "false"){
				metadata.push({ name: "action", label: "", datatype: "html", editable: false});
			}
			

			var data = [];
			var rowIndex = 0;
			$.each(mobileApps, function() {
				
				var values =  {
					name:this.name, 
					platform:this.platform,
					website:this.website
				};
				if(otherUser == "false"){
					values.action= "<a class=\"btn btn-mini btn-danger removeMobile\" href=\"#\" rowIndex="+rowIndex+" rId="+this.id+"> <i class=\"icon-trash icon-white\"></i> </a>"
				}
				data.push({id: this.id, values: values});
				rowIndex++;
			});
			
			$(".removeMobile").live('click', function() {
				Mobile(url).deleteMobileApp($(this).attr("rId"), $(this).attr("rowIndex"));
				return false;
			});

			mobilePortfolioGrid = new EditableGrid("MobileData", {
				enableSort: true,
				modelChanged: function(rowIndex, columnIndex, oldValue, newValue, row) {
		   	    	$.getJSON(url+'/resume/post/updateMobileApp', {newValue : newValue, app:row.id, columnIndex:columnIndex}, function(data) {});
		       	}
		 	});
			mobilePortfolioGrid.load({"metadata": metadata, "data": data});
			mobilePortfolioGrid.renderGrid("mobileAppPanel", "table table-striped table-hover table-condensed");
		},
		deleteMobileApp:function(mobileAppId, rowIndex){
			$.ajax({
				url: url+'/resume/post/deleteMobileApp', 
				data: {mobileAppEntry:mobileAppId},
				type: "POST",
				success: function(data) {
					mobilePortfolioGrid.remove(rowIndex);
				}
			});
			
			return false;
		}
	};
	return mobileObj;

}