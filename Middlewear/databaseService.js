import DbContext from "../DataContext/dbContext.js"

const databaseService = async(request, response, next) => {
    try{
        await DbContext.authenticate();
        next();
    }catch(error){
        response.status(503).json();
    }
}

export default databaseService;
