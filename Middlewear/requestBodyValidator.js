import express from "express";

const validateJSONPayload = async(request, response, next) => {
    try{
        express.json(request.body);
        next();
    } catch(error){
        response.status(400).json({ error: 'Invalid JSON payload' });
    }
}

export default validateJSONPayload;