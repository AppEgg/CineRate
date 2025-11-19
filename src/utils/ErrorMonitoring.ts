import { logger } from "./logger";
import { AppError } from "./errors";

// interface yaradiriq erroru log etdiyimiz zaman lazim olan melumatlari saxlayacaq

interface ErrorContext {
    correlationId : string // Requestin Id -si
    error : Error | AppError // Error obyekti
    url: string // hansi url-de error olub
    method : string // hansi http method ? 
    statusCode : number // http status code
    userId?: string // kim error alib ?
    query?: Record<string, any> // url-de query parametrleri
    params?: Record<string, any> // route parametrleri: /users/:id
    body?: Record<string, any> 
}

// bu class her error-da cagirilir ve butun melumatlari loga yazacaq

export class ErrorMonitoring {
    static trackError(context : ErrorContext) : void {
        const logData ={
            // error melumatlari 
            errorMessage : context.error.message ,
            errorName: context.error.name ,
            errorStack : context.error.stack,

            // request melumatlari
            correlationId : context.correlationId ,
            url : context.url ,
            method : context.method ,
            statusCode : context.statusCode ,

            // requestin detallari 

            queryParams : context.query ,
            routeParams : context.params ,
            requestBody : context.body,

            userId : context.userId || "unkonwn" ,
            timestamp: new Date().toISOString()
        }

        if(context.statusCode >= 500){
            logger.error(logData , `SERVER ERROR : ${context.error.message}`)
        }
        else{
            logger.warn(logData , `CLIENT ERROR : ${ context.error.message}`)
        }
    }
}