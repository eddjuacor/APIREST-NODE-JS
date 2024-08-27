import jwt from 'jsonwebtoken'
const secret = process.env.SECRET; 


export function generateToken(req, res){

    const { id: sub, name } = {id: "gloria", name: "guillermo"}
    
    const token = jwt.sign({
        sub,
        name,
        exp: Date.now() + 60 * 1000
    }, secret)
    res.send({ token })

}



export function authToken(req, res){
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token, secret)

        if(Date.now() > payload.exp){
            return res.status(401).send({ error: "token expired"})
        }

        res.send("im private")
    } catch (error) {
        res.status(401).send({ error: error.message})
    }
}

