const Job = require('../model/Job');
const Profile = require('../model/Profile');
const utils = require('../utils/jobUtils');

module.exports = {
    create(req, res) {
        res.render("job");
    },
    
    insert(req, res) {
        const data = req.body;
        const job_data = Job.get();
        const job_id = job_data.length === 0 ? 1 : job_data.length + 1;

        Job.insert({
            id: job_id,
            name: data.name,
            "daily-hours": data["daily-hours"],
            "total-hours": data["total-hours"],
            created_at: Date.now()
        });
    
        res.redirect("/");
    },
    
    
    edit(req, res) {
        const job_data = Job.get();
        const profile_data = Profile.get();
        const id = Number(req.params.id);
        const job = job_data.find(job => job.id === id);
        job.budget = utils.calculateBudget(job, profile_data.valueOfHour);
    
        res.render("job-edit", { job });
    },
    
    update(req, res) {
        const job_data = Job.get();
        const profile_data = Profile.get();
        const data = req.body;
        const id = Number(req.params.id);
        const jobIndex = job_data.findIndex(job => job.id === id);
        const job = job_data.find(job => job.id === id);

        const updatedJob = {
            ...job,
            name: data.name,
            ["daily-hours"]: data["daily-hours"],
            ["total-hours"]: data["total-hours"],
            budget: utils.calculateBudget(job, profile_data.valueOfHour)
        };

        Job.update(updatedJob, jobIndex);
    
        res.redirect(`/job/${id}`);
    },
    
    delete(req, res) {
        const id = Number(req.params.id);
        Job.delete(id);
        res.redirect("/");
    }
}

