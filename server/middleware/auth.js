import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        let decodedData
        if (token) {
            decodedData = jwt.verify(token, 'test')

            // yserId yaradiriq
            req.userId = decodedData?.id
        }
        next()
    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

export default auth