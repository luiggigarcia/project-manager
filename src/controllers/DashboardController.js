const Job = require('../model/Job');
const Profile = require('../model/Profile');
const utils = require('../utils/jobUtils');

module.exports = {
    dashboard(req, res) {
        const job_data = Job.get();
        const profile_data = Profile.get();
        const status = {
            total: job_data.length,
            progress: 0,
            done: 0
        };

        let freeHours = 0;
        // hours-per-day - daily-hours

        const jobs = job_data.map(job => {
            const remainingDays = utils.remainingDaysOfJob(job);
            const cssClass = remainingDays <= 0 ? "done" : "progress";
            status[cssClass] += 1;
            freeHours = (cssClass == "progress") ? Number(profile_data["hours-per-day"]) - Number(job["daily-hours"]) : 0;

            return {
                ...job,
                remainingDays,
                budget: utils.calculateBudget(job, profile_data.valueOfHour),
                cssClass
            }
        });

        res.render("index", { jobs, status, profile: profile_data, freeHours });
    }
};