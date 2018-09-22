import AppError from 'exception/AppError';
import RestException from 'exception/RestException';

export default function handleError(error) {
    if (error instanceof AppError)
        throw new RestException(error.message);
    else
        console.log(error.message)
    throw new RestException('Unknown server error');
}