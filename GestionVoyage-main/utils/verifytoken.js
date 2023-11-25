

const jwt = require('jsonwebtoken');

const checkVerify = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;
    next();
  });
};
 const verifyUser=(req,res,next)=>{
    checkVerify(req,res,next),()=>{
        if(req.user.id ===req.params.id || req.user.role==='admin')
        {
            next();
        }else{
             res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        }
    }
const verifyAdmin=(req,res,next)=>{
        checkVerify(req,res,next),()=>{
            if(req.user.role==='admin')
            {
                next();
            }else{
                 res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }
            }
        }    

module.exports = { checkVerify, verifyUser, verifyAdmin };
