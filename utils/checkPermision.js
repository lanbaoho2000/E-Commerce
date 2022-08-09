const CustomError = require("../errors");

const checkPermision = (incomingUser, foundUserId) => {
  if (incomingUser.role === "admin") return;
  if (incomingUser.userId === foundUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route"
  );
};

module.exports = { checkPermision };
