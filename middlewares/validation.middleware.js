const { AppError } = require("../helpers/utils");

const validationMiddleware =
  (schema, keyword = "body") =>
  (req, res, next) => {
    const { error } = schema.validate(req[keyword]);

    if (error && error.details && error.details.length > 0) {
      return next(new AppError(400, error.details[0].message));
    }

    next();
  };

module.exports = validationMiddleware;
