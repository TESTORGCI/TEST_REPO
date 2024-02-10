import DbContext from "../DataContext/DbContext.js";


// GET METHOD
const getHealth = async(request, response) => {

    const contentLength = parseInt(request.headers['content-length'], 10);

    if (Object.keys(request.query).length !== 0 || Object.keys(request.body).length !== 0 || contentLength >0) {
        response.setHeader('cache-control', 'no-cache, no-store, must-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('X-Content-Type-Options', 'nosniff');
        return response.status(400).send();
    }

    try{
        //CHECKS DATABASE CONNECTIVITY
        await DbContext.authenticate();
        response.setHeader('cache-control', 'no-cache, no-store, must-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.status(200).send();
    } catch (error) {
        response.setHeader('cache-control', 'no-cache, no-store, must-revalidate').status(503).send();
    }
};

// COMMON METHOD FOR ALL OTHER API METHODS
const methodNotAllowed = async(request, response) => {
    response.setHeader('cache-control', 'no-cache, no-store, must-revalidate');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    return response.status(405).send();
};


export default {getHealth, methodNotAllowed};