import { CustomException } from "./CustomException";

export default class UserAlreadyExistsException extends CustomException {
  constructor(message: string = "User already exists.") {
    super({ httpStatusCode: 409, message });
  }
}
