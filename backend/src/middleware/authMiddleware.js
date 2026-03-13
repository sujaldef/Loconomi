import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access token required',
        data: null,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            status: 'error',
            message: 'Token expired',
            data: null,
          });
        }
        return res.status(403).json({
          status: 'error',
          message: 'Invalid token',
          data: null,
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Authentication error',
      data: null,
    });
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions',
        data: null,
      });
    }
    next();
  };
};

const authorizeOwner = (req, res, next) => {
  const userId = req.params.id;
  if (req.user.id !== userId) {
    return res.status(403).json({
      status: 'error',
      message: 'Unauthorized: Can only modify your own data',
      data: null,
    });
  }
  next();
};

export { authenticateToken, authorizeRole, authorizeOwner };
