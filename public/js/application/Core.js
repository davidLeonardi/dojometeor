define(["dijit/_WidgetBase", "dojo/_base/declare", "dojo/aspect"], function(_WidgetBase, declare, aspect) {

	return declare([_WidgetBase], {


		startup: function(){
			this.inherited(arguments);
			this.setupRoutes();
		},

		setupRoutes: function(){

			if (Meteor.is_client) {

				console.debug("setting routes now");

				Meteor.Router.add({
					'/': 'home',

					'/welcome': 'welcome',

					'/posts/:id': function(id) {
						Session.set('postId', id);
						return 'post';
					}
				});

				Meteor.Router.filters({
					requireLogin: function(page) {
						var username = Session.get('username');
						if (username) {
							return page;
						} else {
							return 'sign_in';
						}
					}
				});

				Meteor.Router.filter('requireLogin', {only: 'welcome'})

				Template.post.helpers({
					id: function() { return Session.get('postId'); }
				})
			}


		},




	});

});