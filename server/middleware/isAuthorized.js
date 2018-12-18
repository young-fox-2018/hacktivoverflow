
function isAuthorized(req, res, next) {
    //check if the decoded user is the same as the one in req.body (AKA requester)
    if(req.user._id == req.body.userId) {
        next()
    } else {
        res.status(403).json({ message: "You are not authorized to create this article" })
    }
}

module.exports = isAuthorized