const bcrypt = require("bcryptjs");


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      const hash = bcrypt.hashSync("password", 10); // 2 ^ n

      return knex('user').insert([
        { email: 'admin@email.com', password: hash, username: "SMP Admin1", about: "This is the main admin account.", avatar_url: "https://www.chsbuffalo.org/sites/default/files/styles/crop_230x230/public/default_images/profile-default_0.jpg?itok=DTiAzsNA" },
        { email: 'testuser@email.com', password: hash, username: "SMP Admin2", about: "This is the sub admin account.", avatar_url: "https://www.chsbuffalo.org/sites/default/files/styles/crop_230x230/public/default_images/profile-default_0.jpg?itok=DTiAzsNA" },
        { email: 'SMPuser@email.com', password: hash, username: "SMP Admin3", about: "This is the sub admin account.", avatar_url: "https://www.chsbuffalo.org/sites/default/files/styles/crop_230x230/public/default_images/profile-default_0.jpg?itok=DTiAzsNA" }
      ]);
    });
};
