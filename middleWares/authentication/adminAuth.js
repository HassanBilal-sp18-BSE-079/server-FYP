const { User } = require('../../model/userModel');

let adminAuth = async (req, res, next) => {

    // console.log(req.user);

    let user = await User.findOne({ _id: req.user.userId });

    console.log(user);

    if (user.role !== 'admin') {
        return res.send('not authorized to access');
    }

    next();
}

module.exports = adminAuth;