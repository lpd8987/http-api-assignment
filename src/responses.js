const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

//HTML Responses
const getIndex = (request, response) => {
    respond(request, response, 200, index, 'text/html');
};

const getStyle = (request, response) => {
    respond(request, response, 200, style, 'text/css');
};

//Response Function
const respond = (request, response, code, content, type) => {
  response.writeHead(code, { 'Content-Type': type });
  response.write(content);
  response.end();
};

//Statuses
//200
const success = (request, response) => {
    //Check if returning XML
    if(request.headers.accept === "text/xml")
    {
        let responseXml = "<response>";
        responseXml += "<message>This is a successful response</message>";
        responseXml += "</response>";

        respond(request, response, 200, responseXml, request.headers.accept);
    }
    //Return JSON
    else if(request.headers.accept === "application/json" || request.headers.accept === undefined) {
        const responseJSON = {
            message: "This is a successful response."
        }
        respond(request, response, 200, JSON.stringify(responseJSON), request.headers.accept);
    }
    else{
        //Should only trigger if attempting to go directly to the URL or other type of input received.
        request.headers.accept = "application/json";
        const responseJSON = {
            message: "This is a successful response."
        }
        respond(request, response, 200, JSON.stringify(responseJSON), request.headers.accept);
    }
};

//400
const badRequest = (request, response, params) => {
    //check if the query param is present
    if(!params.valid)
    {
        //Check if returning XML
        if(request.headers.accept === "text/xml")
        {
            let responseXml = "<response>";
            responseXml += "<message>Missing valid query parameter set to true.</message>";
            responseXml += "<id>badRequest</id>";
            responseXml += "</response>";
    
            respond(request, response, 400, responseXml, request.headers.accept);
        }
        //Return JSON
        else if(request.headers.accept === "application/json" || request.headers.accept === undefined) {
            const responseJSON = {
                message: "Missing valid query parameter set to true.",
                id: "badRequest"
            }
        
            respond(request, response, 400, JSON.stringify(responseJSON), request.headers.accept);
        }
        else{
            //Should only trigger if attempting to go directly to the URL or other type of input received.
            request.headers.accept = "application/json";
            const responseJSON = {
                message: "Missing valid query parameter set to true.",
                id: "badRequest"
            }
        
            respond(request, response, 400, JSON.stringify(responseJSON), request.headers.accept);
        }
    }
    else //send a 200 status code
    {
        //Should only trigger if attempting to go directly to the URL or other type of input received.
        request.headers.accept = "application/json";
        const responseJSON = {
            message: "This request has the required parameters",
        }
    
        respond(request, response, 200, JSON.stringify(responseJSON), request.headers.accept);
    }
};

//401
const unauthorized = (request, response, params) => {
    //check if the query param is present
    if(params.loggedIn !== "yes")
    {
        //Check if returning XML
        if(request.headers.accept === "text/xml")
        {
            let responseXml = "<response>";
            responseXml += "<message>Missing loggedIn query parameter set to yes.</message>";
            responseXml += "<id>unauthorized</id>";
            responseXml += "</response>";
        
            respond(request, response, 401, responseXml, request.headers.accept);
        }
        //Return JSON
        else if(request.headers.accept === "application/json" || request.headers.accept === undefined) {
            const responseJSON = {
                message: "Missing loggedIn query parameter set to yes.",
                id: "unauthorized"
            }
            
            respond(request, response, 401, JSON.stringify(responseJSON), request.headers.accept);
        }
        else{
            //Should only trigger if attempting to go directly to the URL or other type of input received.
            request.headers.accept = "application/json";
            const responseJSON = {
                message: "Missing loggedIn query parameter set to yes.",
                id: "unauthorized"
            }
            
            respond(request, response, 401, JSON.stringify(responseJSON), request.headers.accept);
        }
    }
    else //send a 200 status code
    {
        //Should only trigger if attempting to go directly to the URL or other type of input received.
        request.headers.accept = "application/json";
        const responseJSON = {
            message: "You have successfully viewed the content.",
        }
        
        respond(request, response, 200, JSON.stringify(responseJSON), request.headers.accept);
    }
};

//403
const forbidden = (request, response) => {
    //Check if returning XML
    if(request.headers.accept === "text/xml")
    {
        let responseXml = "<response>";
        responseXml += "<message>You do not have access to this content.</message>";
        responseXml += "<id>forbidden</id>";
        responseXml += "</response>";
    
        respond(request, response, 403, responseXml, request.headers.accept);
    }
    //Return JSON
    else if(request.headers.accept === "application/json" || request.headers.accept === undefined) {
        const responseJSON = {
            message: "You do not have access to this content",
            id: "forbidden"
        }
        
        respond(request, response, 403, JSON.stringify(responseJSON), request.headers.accept);
    }
    else{
        //Should only trigger if attempting to go directly to the URL or other type of input received.
        request.headers.accept = "application/json";
        const responseJSON = {
            message: "You do not have access to this content",
            id: "forbidden"
        }
        
        respond(request, response, 403, JSON.stringify(responseJSON), request.headers.accept);
    }
};

//404
const notFound = (request, response) => {
    //Check if returning XML
    if(request.headers.accept === "text/xml")
    {
        let responseXml = "<response>";
        responseXml += "<message>The page you are looking for was not found</message>";
        responseXml += "<id>notFound</id>";
        responseXml += "</response>";

        respond(request, response, 404, responseXml, request.headers.accept);
    }
    //Return JSON
    else if (request.headers.accept === "application/json" || request.headers.accept === undefined) {
        const responseJSON = {
            message: "The page you are looking for was not found.",
            id: "notFound"
        }
        
        respond(request, response, 404, JSON.stringify(responseJSON), request.headers.accept);
    }
    else{
        //Should only trigger if attempting to go directly to the URL or other type of input received.
        request.headers.accept = "application/json";
        const responseJSON = {
            message: "The page you are looking for was not found.",
            id: "notFound"
        }
        
        respond(request, response, 404, JSON.stringify(responseJSON), request.headers.accept);
    }
};

//500
const internalError = (request, response) => {
    //Check if returning XML
    if(request.headers.accept === "text/xml")
    {
        let responseXml = "<response>";
        responseXml += "<message>Internal Server Error. Something went wrong.</message>";
        responseXml += "<id>internalError</id>";
        responseXml += "</response>";
    
        respond(request, response, 500, responseXml, request.headers.accept);
    }
    //Return JSON
    else if(request.headers.accept === "application/json" || request.headers.accept === undefined) {
        const responseJSON = {
            message: "Internal Server Error. Something went wrong.",
            id: "internalError"
        }
            
        respond(request, response, 500, JSON.stringify(responseJSON), request.headers.accept);
    }
    else{
        //Should only trigger if attempting to go directly to the URL or other type of input received.
        request.headers.accept = "application/json";
        const responseJSON = {
            message: "Internal Server Error. Something went wrong.",
            id: "internalError"
        }
            
        respond(request, response, 500, JSON.stringify(responseJSON), request.headers.accept);
    }
};

//501
const notImplemented = (request, response) => {
    //Check if returning XML
    if(request.headers.accept === "text/xml")
    {
        let responseXml = "<response>";
        responseXml += "<message>A get request for this page has not been implemented yet. Check again later for updated content.</message>";
        responseXml += "<id>notImplemented</id>";
        responseXml += "</response>";
        
        respond(request, response, 501, responseXml, request.headers.accept);
    }
    //Return JSON
    else if(request.headers.accept === "application/json" || request.headers.accept === undefined) {
        const responseJSON = {
            message: "A get request for this page has not been implemented yet. Check again later for updated content.",
            id: "notImplemented"
        }
            
        respond(request, response, 501, JSON.stringify(responseJSON), request.headers.accept);
    }
    else{
        //Should only trigger if attempting to go directly to the URL or other type of input received.
        request.headers.accept = "application/json";
        const responseJSON = {
            message: "A get request for this page has not been implemented yet. Check again later for updated content.",
            id: "notImplemented"
        }
            
        respond(request, response, 501, JSON.stringify(responseJSON), request.headers.accept);
    }
};


module.exports = {
    getIndex,
    getStyle,
    respond,
    success,
    badRequest,
    unauthorized,
    forbidden,
    internalError,
    notImplemented, 
    notFound
};