import CustomError from "./CustomError.js";

export default class UserNotFoundError extends CustomError {
  constructor(message: string = "User not found.") {
    super({ httpStatusCode: 400, message });
  }
}
