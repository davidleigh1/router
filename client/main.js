/*
https://themeteorchef.com/snippets/client-side-routing-with-flow-router/


*/

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.mainLayout.onCreated(function helloOnCreated() {
	// counter starts at 0
	// this.counter = new ReactiveVar(0);
});

Template.mainLayout.helpers({
	currentRoute() {
		//return Template.instance().counter.get();
		// this.route = new ReactiveVar(0);
		// console.log("currentRoute >> FlowRouter.getRouteName() : " + FlowRouter.getRouteName(), this.route);
		return FlowRouter.getRouteName();
	},
	toggleTheSlideMenu( booleanRequired ) {
		var toggleSlideMenu = $("input#toggleSlideMenu[type=checkbox]");
		if ( typeof booleanRequired != "undefined" ) {
			$(toggleSlideMenu).prop("checked", booleanRequired );
		} else {
			$(toggleSlideMenu).prop("checked", !toggleSlideMenu.prop("checked"));
		}
	}
});

Template.mainLayout.events({
	'click'(event, instance) {
		// var thisId = !event.target.id?"undefined":event.target.id;
		// console.log("debug only - '" + event.target.nodeName + "#"+ thisId +"' clicked!");
		// TODO - This cant be the right way to do this!!!
		// Template.mainLayout.__helpers.get('toggleTheSlideMenu')();
	},
	'keyup': function (evt) {
		// Catch ESC key to close menu!
		if (evt.which === 27) {
			console.log("mainLayout - escape clicked to close menu!");
			// TODO - This cant be the right way to do this!!!
			Template.mainLayout.__helpers.get('toggleTheSlideMenu')(false);
		}
	}
});

Template.content.events({
	'click'(event, instance) {
		var thisId = !event.target.id?"undefined":event.target.id;
		console.log("debug only - '" + event.target.localName + "#"+ thisId +"' clicked!");
		// TODO - Create a persistant var and only poll for click (or restrict outcome) if menu is visable
		// TODO - This can't be the right way to do this!!!
		Template.mainLayout.__helpers.get('toggleTheSlideMenu')(false);
	}
});


Template.slideNavMenu.helpers({
	navList() {
		navItems = [
			{
				url : "/",
				label : "Home"
			},
			{
				url : "/hello-world",
				label : "Hello World"
			},
			{
				url : "/products",
				label : "Product List"
			},
			{
				url : "/products/4417/Car-Shades",
				label : "Car Shades [4417]"
			},
			{
				url : "/products/8203/SUV-lights",
				label : "SUV Lights [8203]"
			},
			{
				url : "/products/7777/Snow Tyres",
				label : "Snow Tyres [7777]"
			},
			{
				url : "/products/8888/Jack Kits",
				label : "Jack Kits [8888]"
			},
			{
				url : "/pages/one",
				label : "pages > one"
			},
			{
				url : "/pages/two",
				label : "pages > two"
			},
			{
				url : "/documents",
				label : "Docs List"
			},
			{
				url : "/documents/123",
				label : "Doc 123 (read)"
			},
			{
				url : "/documents/123/edit",
				label : "Doc 123 (edit)"
			},
			{
				url : "/account/profile",
				label : "Account Profile"
			},
			{
				url : "/terms",
				label : "Terms of Service"
			}
		];
	return navItems;
	}
});

Template.slideNavMenu.events({
	'click a'(event, instance) {
		console.log("menu item clicked - " + event.target.innerText);
		// TODO - This cant be the right way to do this!!!
		Template.mainLayout.__helpers.get('toggleTheSlideMenu')(false);
	}
});



