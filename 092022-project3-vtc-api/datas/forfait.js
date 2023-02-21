module.exports = async (db) => {
    const Forfait = db.forfait;
    await Forfait.create({
        departure: "Strasbourg",
        destination: "Entzheim",
        title: "Navette aéroport d'Entzheim",
        price: 40,
    });

    await Forfait.create({
        departure: "Strasbourg",
        destination: "Mulhouse",
        title: "Navette aéroport de Mulhouse",
        price: 150,
    });
    await Forfait.create({
        departure: "Strasbourg",
        destination: "Stuttgart",
        title: "Navette aéroport de Stuttgart",
        price: 150,
    });
    await Forfait.create({
        departure: "Strasbourg",
        destination: "Frankfurt",
        title: "Navette aéroport de Frankfurt",
        price: 300,
    });
};
