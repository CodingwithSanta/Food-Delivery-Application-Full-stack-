const bcrypt = require('bcrypt');

const hash = "$2b$10$F5Dabhq44kEQqAfol4Ngb.1Av7hPx/Q97veRoJ37F79WpUEjUp5xS"; // Stored hash
const password = "password"; // Password to verify

bcrypt.compare(password, hash, (err, result) => {
  if (result) {
    console.log("Password matches!");
  } else {
    console.log("Password does not match.");
  }
});
