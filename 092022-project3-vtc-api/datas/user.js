const bcrypt = require("bcryptjs");

module.exports = async (db) => {
    const User = db.user;

    await User.create({
        id: 1,
        email: "admin@admin.com",
        hashedpassword: bcrypt.hashSync("loulou"),
        lastname: "Aycetin",
        firstname: "Durdu",
        phone: "0902050104",
        birthday: "1996-07-30",
        adress: "8 rue de las vegas",
        zipcode: "67000",
        city: "Strasbourg",
        country: "france",
        offer: false,
        role: 1,
    });

    await User.create({
        id: 2,
        email: "fitschyann@gmail.com",
        hashedpassword: bcrypt.hashSync("client"),
        lastname: "Kutuk",
        firstname: "Yavuz",
        phone: "0802050104",
        birthday: "1996-07-30",
        adress: "8 rue de Brisach",
        zipcode: "671000",
        city: "Strasbourg",
        country: "france",
        offer: true,
        role: 3,
    });

    await User.create({
        id: 3,
        email: "nowak.louis@gmail.com",
        hashedpassword: bcrypt.hashSync("loulou"),
        lastname: "Novak",
        firstname: "Louis",
        phone: "0802050104",
        birthday: "1996-07-30",
        adress: "8 rue de Brisach",
        zipcode: "671000",
        city: "Strasbourg",
        country: "france",
        offer: true,
        role: 3,
    });

    await User.create({
        id: 4,
        email: "je.suis.geoffrey.hach@gmail.com",
        hashedpassword: bcrypt.hashSync("geoff"),
        lastname: "Hach",
        firstname: "Geoffrey",
        phone: "0802050104",
        birthday: "1996-07-30",
        adress: "10 rue de las vegas",
        zipcode: "58212",
        city: "chessy",
        country: "france",
        offer: true,
        role: 3,
    });
};
