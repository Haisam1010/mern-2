import { Unauthenticated } from "../Errors/CustomErrors.js"
import { verifyJWT } from "../utils/tokenUtils.js"

export const authRout = (req,res,next)=> {
    const {token} = req.cookies
    if(!token) throw new Unauthenticated('Not authenticated')
    try {
        const {Userid,role} = verifyJWT(token)
        req.user = {Userid,role}
        next()
    } catch (error) {
        throw new Unauthenticated()
    }
  
}

export const authPermission = (...roles)=> {
    return(req,res,next)=> {
        if(!roles.includes(req.user.role)) throw new Unauthenticated('Not authorized')
        console.log(roles)
        next()
    }
}

