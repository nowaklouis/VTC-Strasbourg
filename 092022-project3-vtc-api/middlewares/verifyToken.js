const jwt = require("jsonwebtoken");
const config = require('../config/auth.config');

const verifyToken = (req, res, next) => {
    try {
      const authorizationHeader = req.get("Authorization");
  
      if (authorizationHeader == null) {
        throw new Error("Authorization header is missing");
      }
  
      const [type, token] = authorizationHeader.split(" ");
  
      if (type !== "Bearer") {
        throw new Error("Authorization header has not the 'Bearer' type");
      }
  
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: 'Unauthorized!',
          });
        }
        req.email = decoded.email;
        next();
      });
  
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(401);
    }
  };
  
module.exports = verifyToken;