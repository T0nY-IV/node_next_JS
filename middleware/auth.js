const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        const decoded = jwt.verify(token, process.env.TOKEN);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
};

module.exports = auth; 