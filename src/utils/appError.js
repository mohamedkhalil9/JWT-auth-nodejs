class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage
try {
  throw new AppError('Custom error message', 400);
} catch (error) {
  if (error instanceof AppError) {
    console.error(`AppError: ${error.message} (status: ${error.statusCode})`);
  } else {
    console.error('An unexpected error occurred:', error);
  }
}

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
    this.isOperational = true;
  }
}

module.exports = ApiError;

