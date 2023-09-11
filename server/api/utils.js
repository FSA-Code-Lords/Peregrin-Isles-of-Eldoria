const requireUser  = (req, res, next) =>{
  //if user is logged is pass them through
  if(req.userId){
    next();
  }
  else{
    res.status(401).send({message: "User unauthorized"});
  }
}

const requireAdmin = (req, res, next) => {
  // Check if user is logged in as an admin
  if (req.userId && req.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Admin unauthorized" });
  }
}

module.exports = {
  requireUser,
  requireAdmin,
}