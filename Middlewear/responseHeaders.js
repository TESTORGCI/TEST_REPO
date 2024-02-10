const defaultHeaders = (request, response, next) => {

    //SETTING DEFAULT RESPONSE HEADERS
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept,Origin');
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Content-Encoding', 'gzip, deflate, br');


    next();
}


export default defaultHeaders;