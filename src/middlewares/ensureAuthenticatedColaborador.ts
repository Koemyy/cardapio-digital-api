import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function EnsureAuthenticatedColaborador(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({
            message: "Sem token"
        })
    }

    try{
        verify(authToken, "31121311")

        return next();
    }catch(err){
        return response.status(401).json({
            message: "Token invalido"
        })
    }
}