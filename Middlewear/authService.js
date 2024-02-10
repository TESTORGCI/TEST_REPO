import User from "../Models/user.js";
import bcrypt from "bcrypt";

const basicAuthentication = async(request, response, next) => {
    
    const authHeader = request.headers['authorization'];

    //TO ENSURE APPLICATION ONLY ACCPETS BASE AUTHENTICATION
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return response.status(401).json({'error' : 'Unauthorized'});
    }

    const base64Creds = authHeader.split(' ')[1];
    //console.log(base64Creds);

    const creds = Buffer.from(base64Creds, 'base64').toString('ascii');
    //console.log(creds);

    const [username, password] = creds.split(':');

    try {
        const user = await User.findOne({ where: { username } });
        //console.log(!bcrypt.compareSync(password, user.password));
        if (!bcrypt.compareSync(password, user.password)) {
          return response.status(401).json({'error' : 'Incorrect credentials'});
        }
        
        //MAP USER TO THE REQUEST OBJECT
        request.user = user;
        next();

    } catch (error) {
        console.error('Authentication error:', error);
        response.status(400).json({'error':'Bad Request'});
    }

}

export default basicAuthentication;