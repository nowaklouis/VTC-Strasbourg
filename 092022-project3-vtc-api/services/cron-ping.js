const cron = require("node-cron");
const db = require("../models");
const { Op } = require("sequelize");
const Course = db.course;

const today = new Date();
const todayPlusOneHour = addHours(today, 1);

console.log(db);

const updatePastCourses = async () => {
    await Course.update(
        { status: "realised" },
        {
            where: {
                date: { [Op.lt]: todayPlusOneHour },
                status: "accepted",
            },
        }
    );
};

//changer à toutes les heures
cron.schedule("* * * * *", function () {
    console.log("running a task every hour");
    updatePastCourses();
});

function addHours(date, hours) {
    date.setHours(date.getHours() + hours);
    return date;
}

module.exports = updatePastCourses;
