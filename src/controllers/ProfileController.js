const Profile = require("../model/Profile");

module.exports = {
    create(req, res) {
        res.render("profile", { profile: Profile.get() })
    },

    update(req, res) {
        const data = req.body;
        const weeksPerYear = 52;
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
        const totalHoursOfWeek = data["hours-per-day"] * data["days-per-week"];
        const totalHoursOfMonth = totalHoursOfWeek * weeksPerMonth;

        data.valueOfHour = Math.trunc((data["monthly-budget"] / totalHoursOfMonth));

        Profile.update(data);

        res.redirect("/profile");
    }
};