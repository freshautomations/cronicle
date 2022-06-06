import passport from "../../../lib/saml";

Class.subclass( Page.Base, "Page.Callback", {
	
	onInit: function() {
	},
	
	onActivate: function(args) {
		// page activation
		if (app.user) {
			// user already logged in
			setTimeout( function() { Nav.go(app.navAfterLogin || config.DefaultPage) }, 1 );
			return true;
		}
		else {
			passport
				.authenticate('saml', { failureRedirect: '/', failureFlash: true }), (req, res, next) => {
				const xmlResponse = req.body.SAMLResponse;
				const parser = new Saml2js(xmlResponse);
				req.samlUserObject = parser.toObject();
				next();
			};
			(req, res) => userLogin.createUserSession(res, req));
		}
		
		return true;
	},
	
} );
