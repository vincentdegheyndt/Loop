module.exports=(req, res, next)=>{//next is a callback
    if(req.user.credits<1){
        return res.status(403).send({error:'not enough credits!'})
    }

    next();//else go on
}