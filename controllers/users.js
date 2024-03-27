const User = require('../models/user');

module.exports.renderRegisterForm = async (req, res) => {
    res.render('user/register');
}

module.exports.postRegisteredForm = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'welcome to Yelpcamp');
            res.redirect('/makeGrounds');
        })

    } catch (e) {
        req.flash('success', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLoginForm = async (req, res) => {
    res.render('user/login')
}

module.exports.postLoginForm = async (req, res) => {
    req.flash('success', 'Welcome back');
    const redirect = req.session.returnTo 
    console.log(redirect)
    res.redirect(redirect);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash('success', 'Logged out')
        res.redirect("/makeGrounds");
    });
}