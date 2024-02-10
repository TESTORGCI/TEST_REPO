import databaseService from "../Middlewear/databaseService.js";
import User from "../Models/user.js";
import bcrypt from "bcrypt";


//POST METHOD FOR USER CREATION
const createUser = async(request, response) => {

    if (Object.keys(request.query).length !== 0) {
        return response.status(400).json({'error' : 'Request should not contain query parameters'});
    }
    else{
        try {
            const { first_name, last_name, password, username } = request.body;
            const newUser = await User.create({ first_name, last_name, username, password });
            const user = {
                "id": newUser.id,
                "first_name": newUser.first_name,
                "last_name": newUser.last_name,
                "username": newUser.username,
                "account_created": newUser.account_created,
                "account_updated": newUser.account_updated
            };
            response.status(201).json(user);

        } catch (error) {
            if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
                const errors = error.errors.map(err => err.message);
                console.log(errors);
                response.status(400).json({ errors }).send();
            }
            else{
                console.error('Error creating user:', error);
                response.status(400).json({ error: 'Please provide request body as required' });
            }
        }
    }
}

//GET METHOD TO FETCH USER DETAILS
const getUser = async(request, response) =>{

        if (Object.keys(request.query).length !== 0) {
            return response.status(400).json({'error' : 'Request should not contain query parameters'});
        }
        else if (request.get('Content-Length')) {
            return response.status(400).json({ 'error': 'Request body is not allowed' });
        }
        else{
            try{
                const { id, first_name, last_name, username, account_created, account_updated } = request.user;
                const userDetails = {
                    id,
                    first_name,
                    last_name,
                    username,
                    account_created,
                    account_updated
                };
                response.json(userDetails);
            }catch (error) {
                console.error('Error fetching user details:', error);
                response.status(400).json(error.message);
            }
        }
}


const updateUser = async(request, response) => {

    if (Object.keys(request.query).length !== 0) {
        return response.status(400).json({'error' : 'Request should not contain query parameters'});
    }

    console.log(request.body);

    if (!request.body || typeof request.body !== 'object' || Object.keys(request.body).length === 0) {
        return response.status(400).json({ message: 'Request does not has details to update' });
    }

    const getKeys = Object.keys(request.body);
    const allowUpdates = ['first_name', 'last_name', 'password'];

    const checkValidUpdate = getKeys.every(key => allowUpdates.includes(key));

    if(!checkValidUpdate){
        return response.status(400).json({error : 'Incorrect fields, please check request body'});
    }

    try{
        const { first_name, last_name, password } = request.body;
        // const hashedPassword = bcrypt.hashSync(password.toString(), 10);
        const { username } = request.user;
        const currentTime = new Date();

        const userUpdate = await User.update(
            {first_name : first_name, last_name : last_name, password:password, account_updated:currentTime},
            {where: {username}}
        );

        if(userUpdate){
            response.status(204).send();
        }
    } catch(error){
        response.status(400).json(error.message);
    }
}

export default {createUser, getUser, updateUser};