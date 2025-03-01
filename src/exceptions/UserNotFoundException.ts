import CustomException from "./CustomException.js";

export default class UserNotFoundException extends CustomException {
  constructor(message: string) {
    super({ httpStatusCode: 400, message });
  }
}
