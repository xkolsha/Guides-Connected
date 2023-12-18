import bcrypt from "bcryptjs";

const password = "admin071023"; // Replace with My password
const saltRounds = 10; // Same as in your seeding script

bcrypt.hash(password, saltRounds, function (err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Manually hashed password:", hash);
});

// import bcrypt from "bcryptjs";

// const password = "admin071023";
// const hashedPasswordFromDb =
//   "$2a$10$ri1Rc6PXTYA1wyEdRgXLJuhnfc5ivGntJVyYZNLHiou4NqBbZrd06"; // Replace with your DB hash

// bcrypt.compare(password, hashedPasswordFromDb, function (err, result) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Do the password and hash match?", result);
// });
