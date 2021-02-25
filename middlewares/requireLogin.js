module.exports=(req, res, next)=>{//next is a callback
    if(!req.user){
        return res.status(401).send({error:'You must log in!'})//unauthorized
    }

    next();//else go on
}