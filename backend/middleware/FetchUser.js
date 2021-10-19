var jwt = require('jsonwebtoken');
const JWT_SECRET = ''

const FetchUser = (req, res,next) => {
    //get user from the jwt token and add id to the request
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({error :'Invalid token'});
    }try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    }catch(error){
        console.log(error.message);
        res.status(401).send("Invalid token");
    }
   
}

module.exports = FetchUser;