const bcrypt = require('bcryptjs');


module.exports = {

    registerUser: (req, res) => {
        //console log lets you know its coming through
        console.log(req.body)

        //bringing info from user from the front and into db
        //match const on front end
        const {username, password} = req.body
        const db = req.app.get('db')

        //check if username already exists in my db
        db.findUser(username).then((usersList) => {
            if(usersList.length > 0) {
                res.status(403).json({error: 'USERNAME_TAKEN'})
            } else {
                //hashes password and then sends the username to show its working
                bcrypt.hash(password, 12).then(newPassword => {
                    //create new user and put them in the database
                    db.addUser(username, newPassword).then(() => {
                        res.status(200).json(username)
                    })
                })
            }
        })
    },

    loginUser: (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        //if they dont exist
        db.findUser(username).then((user) => {
            if(!user.length){
                res.status(404).json({error: 'USER_DOES_NOT_EXIST'})
            } else {
                //checks user that we are talking about doesnt exist already 
                //only one user with the username and password
                bcrypt.compare(username, user[0].password).then(doesMatch => {
                    if(!doesMatch) {
                        res.status(403).json({error: 'USERNAME_OR_PASSWORD_INCORRECT'})
                    } else {
                        //creates session
                        //session: creates the cookie and has user info and cart
                        req.session.user = {
                            username: user[0].username,
                            cart: [],
                            total: 0
                        };
                        //sends back the response
                        res.status(200).json(req.session.user)
                    }
                })
            }
        })

    },

    //redux
    getUser: (req, res) => {
        //if your the user get info, to make sure they dont see items unless logged in
        if(req.session.user) {
            res.json(req.session.user)
        } else {
            res.status(401).json({error: 'PLEASE_LOGIN'})
        }

    },

    logout: (req, res) => {
        //logs out the user
        req.session.destroy(
            res.status(200).send(req.session)
        )
    }

}