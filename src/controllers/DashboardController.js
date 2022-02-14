const Job = require('../model/Job');
const Profile = require('../model/Profile');
const utils = require('../utils/jobUtils');

module.exports = {
    dashboard(req, res) {
        const job_data = Job.get();
        const profile_data = Profile.get();
        const status = {
            total: 0,
            progress: 0,
            done: 0
        };

        const jobs = job_data.map(job => {
            const remainingDays = utils.remainingDaysOfJob(job);
            const cssClass = remainingDays <= 0 ? "done" : "progress";
            status[cssClass] += 1;

            return {
                ...job,
                remainingDays,
                status,
                budget: utils.calculateBudget(job, profile_data.valueOfHour),
                cssClass
            }
        });

        res.render("index", { jobs, status });
    }
};