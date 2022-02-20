const Profile = require("../model/Profile");

module.exports = {
    async create(req, res) {
        res.render("profile", { profile: await Profile.get() })
    },

    update(req, res) {
        const data = req.body;
        const weeksPerYear = 52;
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
        const totalHoursOfWeek = data["hours-per-day"] * data["days-per-week"];
        const totalHoursOfMonth = totalHoursOfWeek * weeksPerMonth;

        data["value-hour"] = Math.trunc((data["monthly-budget"] / totalHoursOfMonth));

        Profile.update(data);

        res.redirect("/profile");
    }
};