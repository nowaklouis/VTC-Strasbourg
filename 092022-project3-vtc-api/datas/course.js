module.exports = async (db) => {

    const Course = db.course;
    await Course.create({
        id: 1,
        depAddress: "23 rue de la Haye, Strasbourg",
        destAddress: "122 boulevard de la Victoire, Strasbourg",
        date: new Date("February 10, 2023 13:15:30"),
        clientId: 1,
        passengers: 2,
        duration: 12,
        price: 20,
        distance: 40,
        status: "declined",
        id_stripe: "pm_1MXqOEIxGyWakY24yzuhz3xZ",
    });

  await Course.create({
    depAddress: "23 rue de la Haye, Strasbourg",
    destAddress: "11 presqu'île Malraux, Strasbourg",
    date: Date.now(),
    clientId: 2,
    passengers: 1,
    duration: 12,
    price: 20,
    distance: 40,
    status: "requested",
    id_stripe: "pm_1MXqOEIxGyWakY24yzuhz3YU",
  });

  await Course.create({
    depAddress: "2 rue du Havre, Strasbourg",
    destAddress: "22 rue déserte, Strasbourg",
    date: Date.now(),
    clientId: 1,
    passengers: 3,
    duration: 12,
    price: 20,
    distance: 40,
    status: "requested",
    id_stripe: "pm_1MXqOEIxGyWakY24yzuhz3fR",
  });
  await Course.create({
    depAddress: "41 rue de Benfeld, Strasbourg",
    destAddress: "7 rue des peupliers, Strasbourg",
    date: Date.now(),
    clientId: 4,
    passengers: 3,
    duration: 12,
    price: 440,
    distance: 40,
    status: "accepted",
    id_stripe: "pm_1MXqOEIxGdsakY24yzuhz3xZ",
  });
  await Course.create({
    depAddress: "23 rue de la Haye, Strasbourg",
    destAddress: "122 boulevard de la Victoire, Strasbourg",
    date: new Date("February 2, 2023 13:15:30"),
    clientId: 4,
    passengers: 2,
    duration: 12,
    price: 20,
    distance: 40,
    status: "realised",
    id_stripe: "pm_1MXqOEIxGyWakY24yzuhz3xZ",
  });
  await Course.create({
    depAddress: "34 avenue de la forêt noire, Strasbourg",
    destAddress: "11 boulevard de la Marne, Strasbourg",
    date: new Date("January 2, 2023 13:15:30"),
    clientId: 4,
    passengers: 2,
    duration: 12,
    price: 20,
    distance: 40,
    status: "realised",
    id_stripe: "pm_1MXqOEIxGyWakY24yzuhz3xZ",
  });
};
