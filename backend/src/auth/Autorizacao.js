import jwt from "jsonwebtoken";

export default function (request, response, next) {
    const { autorizacao } = request.headers;
    
    if (!autorizacao) {
        return response.status(401).json("Token ausente!");
    }
  
    const token = autorizacao.replace('Bearer ', '').trim();
    
    try {
        
        const { isAdmin } = jwt.verify(token, process.env.SECRET_KEY_JWT);
  
        if (!isAdmin){
            return response.status(403).json("Proibido!");
        }
        
        return next();
    } catch (error){
        return response.status(401).json("Token inválido!");
    }

}