const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const ROLES = require('../config/roles');

module.exports = {
    login(req, res) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user)
            {
                console.log(err);
                res.status(400);
                return res.json({ Message: info.Message });
            } else
            {
                req.login(user, { session: false }, (err) => {
                    if (err)
                    {
                        res.status(400);
                        console.log(err);
                    } else
                    {
                        jwt.sign({ username: user.username, role: user.role, ID: user._id }, process.env.jwt, { expiresIn: "1d" }, function (err, token) {
                            res.status(200);

                            var temp = -1;

                            switch (user.role)
                            {
                                case 'admin':
                                    temp = 0;
                                    break;
                                case 'manager':
                                    temp = 1;
                                    break;
                                case 'groundskeeper':
                                    temp = 2;
                                    break;
                                case 'reception':
                                    temp = 3;
                                    break;
                                case 'customer':
                                    temp = 4;
                                    break;
                            }
                            return res.json({ JWT: token, role: temp });
                        })
                    }
                });
            }
        })(req, res)
    },

    getUser(req, res, next) {
        const username = req.user.username;

        user.findOne({ username: username })
            .then((result) => {
                if (!result)
                {
                    res.status(400);
                    res.send({ Message: 'user not found' });
                } else
                {
                    res.status(200);
                    res.send(result);
                }
            }).catch(next);
    },

    createCustomer(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        const role = ROLES.ROLES.Customer;

        User.findOne({ username: username })
            .then((result) => {
                if (result === null)
                {
                    var user = new User({ username: username, password: password, role: role });

                    user.save()
                        .then((result) => {
                            res.status(200);
                            res.send({ Message: 'user created', resultId: result._id });
                        })
                } else
                {
                    res.status(422);
                    res.send({ Message: 'username is taken' });
                }
            })
    },

    createAdmin(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        const role = ROLES.ROLES.Admin;

        User.findOne({ username: username })
            .then((result) => {
                if (result === null)
                {
                    var user = new User({ username: username, password: password, role: role });

                    user.save()
                        .then((result) => {
                            res.status(200);
                            res.send({ Message: 'user created', resultId: result._id });
                        })
                } else
                {
                    res.status(422);
                    res.send({ Message: 'username is taken' });
                }
            })
    },

    deleteUser(req, res, next) {
        const username = req.user.username;
        const password = req.body.password;

        User.findOne({ username: username })
            .then((result) => {
                if (result !== null)
                {
                    if (result.comparePassword(password))
                    {
                        result.remove();
                        res.status(200);
                        res.send({ Message: 'user deleted' });
                    } else
                    {
                        res.status(400);
                        res.send({ Message: 'Username or password did not match' });
                    }
                } else
                {
                    res.status(400);
                    res.send({ Message: 'Username or password did not match' });
                }
            }).catch(next);
    }
}