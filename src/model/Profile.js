const Database = require('../db/config');

module.exports = {
    async get() {
        const db = await Database();
        const data = await db.get("SELECT * FROM profile");

        await db.close();

        return {
            id: data.id,
            name: data.name,
            avatar: data.avatar,
            ["hours-per-day"]: data.hours_per_day,
            ["days-per-week"]: data.days_per_week,
            ["vacation-per-year"]: data.vacation_per_year,
            ["value-hour"]: data.value_hour,
            ["monthly-budget"]: data.monthly_budget
        }

    },

    async update(data) {
        const db = await Database();
        db.run(`UPDATE profile SET name = "${data.name}", avatar = "${data.avatar}", hours_per_day = ${data["hours-per-day"]}, 
        days_per_week = ${data["days-per-week"]}, vacation_per_year = ${data["vacation-per-year"]}, monthly_budget = ${data["monthly-budget"]}`);
        await db.close()
    }
};


