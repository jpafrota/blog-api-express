export default class CustomException extends Error {
  httpStatusCode: number;

  constructor({
    httpStatusCode,
    message,
  }: {
    httpStatusCode: number;
    message: string;
  }) {
    super();
    this.message = message;
    this.httpStatusCode = httpStatusCode;
  }
}
