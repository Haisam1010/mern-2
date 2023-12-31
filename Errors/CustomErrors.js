import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class Unauthenticated extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthenticated";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}


