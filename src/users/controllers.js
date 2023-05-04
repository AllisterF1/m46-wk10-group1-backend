const User = require("./model")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    try { 
        console.log("next called and inside controller")

        // const user = await User.create({
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password
        // });

        const user = await User.create(req.body)
        res.status(201).json({
            message: "success",
            user: {username: req.body.username, email: req.body.email}
        })
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}


const login = async (req, res) => {
    try {
      if (req.authUser) {
        res.status(200).json ({
        message: "success",
        user: {
          username: req.authUser.username,
          email: req.authUser.email
        }
      })
      return
      }

      const token = await jwt.sign({id: req.user.id}, process.env.SECRET);
      
        res.status(200).json({
            message: "success",
            user: {
                username: req.user.username,
                email: req.user.email,
                token : token
            }
        })
        return
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
}


module.exports = {
    registerUser,
    login
}




