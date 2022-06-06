// Cronicle Server SAML login
// Copyright (c) 2022 Greg Szabo
// Released under the MIT License

const passport = require("passport");
const passportSaml = require("passport-saml");

passport.deserializeUser((user, done) => {
    done(null, user);
});

// SAML strategy for passport -- Single IPD
const strategy = new passportSaml.Strategy(
    {
        entryPoint: process.env.SSO_ENTRYPOINT,
        issuer: process.env.SSO_ISSUER,
        callbackUrl: process.env.SSO_CALLBACK_URL,
        cert: process.env.SSO_CERT,
    },
    (profile, done) => done(null, profile),
);

passport.use(strategy);
passport.initialize();
passport.session();

module.exports = passport;
