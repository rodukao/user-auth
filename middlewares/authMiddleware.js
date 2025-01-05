const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    //Get token from the header
    const token = req.header('Authorization');
    console.log(token)

    if(!token){
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    try{
        // Remove 'Bearer ' from the token
        const actualToken = token.split(' ')[1];

        //Verify token
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

        //Add user info to the request object
        req.user = decoded;

        next(); //Proceed to the next middleware/controller
    } catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
};

module.exports = authMiddleware;