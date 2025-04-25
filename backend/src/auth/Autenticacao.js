import jwt from "jsonwebtoken";


export default function (request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json("Token ausente!");
    }
  
    const token = authorization.replace('Bearer ', '').trim();

    try {
        const { usuarioId } = jwt.verify(token, process.env.SECRET_KEY_JWT);
  
        if (!usuarioId){
            return response.status(401).json("Não Autorizado!");
        }
        
        return next();
    } catch (error){
        return response.status(401).json("Token inválido!");
    }

}