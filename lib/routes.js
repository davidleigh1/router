/*
[ ] Close on click before navigation
*/

/* GLOBAL ROUTE RULES */

// FlowRouter.triggers.enter( [ enterFunction ] );
// FlowRouter.triggers.exit( [ exitFunction ] );

/* GLOBAL ROUTE RULES WITH FILTERS */

// Using only, this means to *only* call this function on these routes.
FlowRouter.triggers.enter( [ enterFunction ], {
	// Note using the names of routes so requires passing a name property when defining route
	except: [ 
		'somePage', 
		'anotherPage', 
		'thisPage'
		]
});

// Using except, this means to call this function on all routes *except* these.
FlowRouter.triggers.exit( [ exitFunction ], { 
	except: [ 
		'page', 
		'notThisPage', 
		'thatPage'
		]
});

// FlowRouter.triggers.exit( [ exitFunction ] );

function enterFunction() {
	console.log( "---> Entering route: " + FlowRouter.getRouteName() );
}

function exitFunction() {
	console.log( "<--- Exiting route: " + FlowRouter.getRouteName() );
}


/* ENDS -- GLOBAL ROUTE RULES WITH FILTERS */




FlowRouter.route('/', {
	name: 'home',
	action: function(params, queryParams) {
		console.log("This is the home page!", params, queryParams);
		BlazeLayout.render("mainLayout", {mainContent: "blogHome"});
	}
});

FlowRouter.route('/hello-world', {
	name: 'hello-world',
	action: function(params, queryParams) {
		console.log("This is 'hello world'!", params, queryParams);
		BlazeLayout.render("mainLayout", {mainContent: "blogPost"});
	}
});

// FlowRouter.route('/:postId', {
//   action: function() {
//     BlazeLayout.render("mainLayout", {mainContent: "blogPost"});
//   }
// });



/*
https://themeteorchef.com/snippets/client-side-routing-with-flow-router/
*/


/* ROUTE GROUP */

/*
http://app.com/documents
http://app.com/documents/:_id
http://app.com/documents/:_id/edit
*/

var products = FlowRouter.group({
	prefix: '/products',
	name: "catalog",
	triggersEnter: [function(context, redirect) {
		console.log( "We are in the catalog - running group triggers" );
	}]
});

// http://app.com/products
products.route( '/', {
	name: 'catalogRoot', // Optional route name
	action: function() {
		console.log( "We're viewing a list of products." );
		BlazeLayout.render("mainLayout", {mainContent: "productList"});
	}
});

// We'd assume two URLs here because we have two documents:
// http://app.com/documents/123456
// http://app.com/documents/654321

products.route( '/:_id/:_name', {
	name: 'productPage', // Optional route name
	action: function( params, queryParams ) {
			console.log( params._id, params, queryParams );
			// BlazeLayout.render( 'applicationLayout', ... );
			BlazeLayout.render("mainLayout", {mainContent: "productPage"});
		// 	BlazeLayout.render( 'applicationLayout', { 
		// 	header: 'headerTemplate',
		// 	sidebar: 'sidebarTemplate',
		// 	main: 'documentTemplate',
		// 	footer: 'footerTemplate'
		// }); 
	}
});




/* Trigger Tests for Groups */

var accountRoutes = FlowRouter.group({
	prefix: '/account',
	triggersEnter: [ function(){
		console.log( "ENTER ACCOUNT ROUTE!" );
	}],
	triggersExit: [ function(){
		console.log( "EXIT ACCOUNT ROUTE!" );
		alert( "Something to do on **ACCOUNT** route EXIT." );
	}]
});

accountRoutes.route( '/profile', {
	name: 'profile', // Optional route name
	action: function() {
		console.log( "Okay, we're on the /accounts/profile page!" );
		BlazeLayout.render("accountLayout", {mainContent: "accountProfile"}); 
	}
});

accountRoutes.route( '/terms', {
	name: 'termsOfService', // Optional route name
	// Note: here, we pass an anonymous function in an array, but this could also be a named function
	// like [ myFunction ], or, a single function called directly (no outer array). Using the array syntax, we
	// can call as many functions as we'd like on enter.

	triggersEnter: [ function() { 
		console.log( "Something to do on TERMS ENTER." ); 
	}],
	action: function() {
		// Do whatever we need to do when we visit http://app.com/terms.
		console.log( "Okay, we're on the account > Terms of Service page!" );
/*		BlazeLayout.render( 'applicationLayout', { 
			header: 'headerTemplate',
			sidebar: 'sidebarTemplate',
			main: 'termsOfService',
			footer: 'footerTemplate'
		});*/
		BlazeLayout.render("accountLayout", {mainContent: "termsOfService"}); 
	},
	triggersExit: [ function() { 
		alert( "Something to do on TERMS route EXIT." ); 
	}]

});








/* -------------------------------------------------------------------- */

FlowRouter.route('/one', {
	name: 'one',
	action: function(params, queryParams, name) {
		console.log("This is ONE: \n", params, queryParams);
	}
});

FlowRouter.route('/two', {
	name: 'two',
	action: function(params, queryParams, name) {
		console.log("This is TWO: \n", params, queryParams);
	}
});

FlowRouter.route('/help/:pageId', {
	name: 'help',
	action: function(params, queryParams, name) {
		console.log("This is HELP: \n", params, queryParams);
	}
});

FlowRouter.route('/pages/', {
	name: 'pagesRoot',
	action: function(params, queryParams) {
		console.log("This is page: " + params.pageId + "\n", params, queryParams);
	}
});

FlowRouter.route('/pages/:pageId', {
	name: 'page',
	action: function(params, queryParams) {
		console.log("This is page: " + params.pageId + "\n", params, queryParams);
		console.log("FlowRouter.getRouteName() : " + FlowRouter.getRouteName());
		console.log("FlowRouter.getParam('pageId') : " + FlowRouter.getParam("pageId"));
		console.log("FlowRouter.getQueryParam('hello') : " + FlowRouter.getQueryParam("hello"));
	}
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
	action() {
	BlazeLayout.render('mainLayout', {mainContent: 'App_notFound'});
	}
};
