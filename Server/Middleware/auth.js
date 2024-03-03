const jwt = require('jsonwebtoken');
const User = require('../model/User')
exports.auth = async (req, res, next) => {
    try {
        const token = req.headers["authtoken"]
        if (!token) {
            return res.status(401).send('No token')
        }
        const decoded = jwt.verify(token, 'jwtsecret')
        req.user = decoded.user
        next();
    } catch (error) {
        console.log(error)
        res.send('token Invalid').status(500)
    }
}
exports.adminCheck = async (req, res, next) => {
    try {
        console.log(req.user.username)
        const userAdmin = await User.findOne({ username: req.user.username })
            .select('-password')
            .exec()
        if (userAdmin.role !== 'admin') {
            res.status(403).send('Admin acess Denied')
        } else {
            next();
        }
    } catch (err) {
        console.log(err)
        res.status(403).send('Admin access Denied')
    }
}