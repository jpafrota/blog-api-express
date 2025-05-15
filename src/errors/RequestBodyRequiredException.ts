import { CustomException } from "./CustomException";

export default class RequestBodyRequiredException extends CustomException {
  constructor(message: string = "User not found.") {
    super({ httpStatusCode: 400, message });
  }
}
