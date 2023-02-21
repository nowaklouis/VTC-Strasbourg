module.exports = async (db) => {
    const Price = db.price;
    await Price.create({
        name: "kmPrice",
        value: 2,
    });
    await Price.create({
        name: "hourPrice",
        value: 90,
    });
};
