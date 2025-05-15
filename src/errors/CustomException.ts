export abstract class CustomException extends Error {
  httpStatusCode: number;

  constructor({
    httpStatusCode,
    message,
  }: {
    httpStatusCode: number;
    message: string;
  }) {
    super();
    this.message = message; // inherited from `Error`
    this.httpStatusCode = httpStatusCode;
  }
}
