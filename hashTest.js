// import bcrypt from "bcryptjs";

// import bcrypt from "bcryptjs";

// const password = ""; // Replace with My password
// const saltRounds = 10; // Same as in your seeding script

// bcrypt.hash(password, saltRounds, function (err, hash) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Manually hashed password:", hash);
// });

// import bcrypt from "bcryptjs";

// const password = "";
// const hashedPasswordFromDb =
//   "$2a$10$ri1Rc6PXTYA1wyEdRgXLJuhnfc5ivGntJVyYZNLHiou4NqBbZrd06"; // Replace with your DB hash

// bcrypt.compare(password, hashedPasswordFromDb, function (err, result) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Do the password and hash match?", result);
// });

// import readline from "readline";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Enter password to hash: ", async (password) => {
//   try {
//     const bcrypt = (await import("bcrypt")).default;
//     const hash = await bcrypt.hash(password, 10);
//     console.log("Hashed Password:", hash);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     rl.close();
//   }
// });
