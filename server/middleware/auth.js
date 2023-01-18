import jwt from "jsonwebtoken";

const auth = (req, res, next) => { //authda biz requestden gelen hecneyi istifade elemirik
    //sadece bize token gelir frontdan ve biz o tokene gore useri cixardiriq ortaya ve req.userId yaradiriq ve deyirik beraberdi tokene gore mueyenlewmiw userin id-sine.
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (token) {
            const user = jwt.verify(token, 'test') // yoxla tokeni ve bu tokende olan istifadecini qaytar
            // userId yaradiriq
            req.userId = user?.id
        }
        next()
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}


// luboy zaprosda biz tokeni goture bilerik,cherez req.headers.authorization,(frontdada yazilmalidi Axiosda)



export default auth