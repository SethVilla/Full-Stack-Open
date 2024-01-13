export class CustomError extends Error {
    constructor(name = "Custom error", message = "Custom Error Message", ...params) {
        super(...params);

        this.name = name;
        this.message = message

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
    }
}
