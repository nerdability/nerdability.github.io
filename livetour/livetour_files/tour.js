var tour = new Tour();
jQuery(function($) {
	tour.addStep({
		element: "#user-intro",
	    placement: "bottom",
		title: "Welcome to NerdAbility!",
		content: "This first section is just a free-text introduction blurb - you can put any text you like here to " +
				"describe a bit about yourself (you can add many more custom sections later on, so don't worry " +
				"too much about getting everything you want to say in here!"
	});
	tour.addStep({
		element: "#user-avatar",
	    placement: "left",
		title: "Your Avatar",
		content: "We offer integration with Gravatar - so if you setup a Gravatar profile pic using your registered email " +
				"then it will show up here (StackExchange also use Gravatar - so if you have an avatar when you login on a " +
				"StackExchange site then this will be the same)"
	});
	tour.addStep({
		element: "#user-skills",
	    placement: "right",
		title: "Your skills",
		content: "Here you are free to add any relevant skills you like - you can also add your interest level in the " +
				"technology and years spend working with it."
	});
	tour.addStep({
		element: "#user-score",
	    placement: "left",
		title: "Your NerdScore",
		content: "Based on the content you add to your profile and the amount of cool third party stuff you link up, we calculate " +
				"your NerdScore to help you see how you fare against your friends and peers."
	});
	tour.addStep({
		element: "#user-projects",
	    placement: "right",
		title: "Your Projects",
		content: "Link up your GitHub, BitBucket or GoogleCode accounts and we will list your public projects here along " +
				"with the description and a link to the repository. If you connect to GitHub, we will also list any technologies " +
				"that you have worked on in your GitHub projects."
	});
	tour.addStep({
		element: "#stackScore",
	    placement: "left",
		title: "Your StackOverflow Flair",
		content: "If you setup your account to connect with StackOverflow, we will pull down and display your StackOverflow \"Flair\""
	});
	tour.addStep({
		element: "#blogArticles",
	    placement: "left",
		title: "Your Blogs",
		content: "You can also register the RSS feed of any of your relevant blogs, and we will display the latest 5 blog post titles " +
				"here."
	});
	tour.addStep({
		element: "#geekListBubble",
	    placement: "left",
		title: "GeekList",
		content: "If you are a member of the Geek community Geeklist, then you can connect your accounts and we will display your recent \"Cards\" " +
				"along with stats like number of views and number of High-Fives received for them."
	});
	tour.addStep({
		element: "#mobileAppPanel",
	    placement: "right",
		title: "Mobile App Portfolio",
		content: "Add details and links to your entire mobile app portfolio for any mobile platform"
	});
	tour.addStep({
		element: "#bragBubble",
	    placement: "left",
		title: "Bragging!",
		content: "Bragging is your chance to shout about what you are most proud of! Post tweet sized messages of your achievements and triumphs!"
	});
	tour.addStep({
		element: "#workExperiencePanel",
	    placement: "right",
		title: "Your Career So Far",
		content: "As you would expect in a traditional CV, we also allow you to add your full career history - but to save you time, you can " +
				"also link up your account with your LinkedIn profile and import these details in a flash!"
	});
	tour.addStep({
		element: "#register-link",
	    placement: "bottom",
		title: "Convinced now?",
		content: "So that's the tour so far! If you like what you see and want to make your CV awesome with all your skills and projects, then sign up now!" + 
				"<br/><br/><a id='reg-button-old' style='text-align:center;margin-left: auto; margin-right:auto' class='btn btn-primary btn-large' href='/register'>Sign up now!</a>"
	});
	
	
	if ( tour.autoRestart()) {
		tour.start();
	}
	
	$( "#startProfileTour" ).click(function(e){
		e.preventDefault();
		if ( tour.ended() ) {
			tour.restart();
		}else{
			tour.start();
		}
	});
});