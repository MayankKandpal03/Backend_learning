// Error handler file to handle app error and async error

// Custom App error class
export class AppError extends Error {
    constructor(
        message, 
        statusCode,
        errors=[],
        stack = ""
    ){
    super(message);               
    this.status = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;
    this.isOperational = true; // Helps avoid server crashes and marks the error expected
    if(stack){
        this.stack = stack
    }
    else{
        Error.captureStackTrace(this, this.constructor); // To make debugging easier and make stack trace clean and readable
    }
  }
}

// Async error handler -> Async wrap
export const asyncWrap = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
        .catch(next);
}};
