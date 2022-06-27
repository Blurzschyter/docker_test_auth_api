// import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api.js';

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    // this.statusCode = StatusCodes.BAD_REQUEST;
    this.statusCode = 400;
  }
}

export default BadRequestError;
