const Job = require('../model/Job');
const Profile = require('../model/Profile');
const utils = require('../utils/jobUtils');

module.exports = {
    create(req, res) {
        res.render("job");
    },
    
    async insert(req, res) {
        const data = req.body;
       
        Job.insert({
            name: data.name,
            "daily-hours": data["daily-hours"],
            "total-hours": data["total-hours"],
            created_at: Date.now()
        });
    
        res.redirect("/");
    },
    
    
    async edit(req, res) {
        const job_data = await Job.get();
        const profile_data = await Profile.get();
        const id = Number(req.params.id);
        const job = job_data.find(job => job.id === id);
        job.budget = utils.calculateBudget(job, profile_data["value-hour"]);
    
        res.render("job-edit", { job });
    },
    
    async update(req, res) {
        const job_data = await Job.get();
        const profile_data = await Profile.get();
        const data = req.body;
        const id = Number(req.params.id);

        const job = job_data.find(job => job.id === id);

        const newData = {
            id,
            name: data.name,
            ["daily-hours"]: data["daily-hours"],
            ["total-hours"]: data["total-hours"],
            budget: utils.calculateBudget(job, profile_data["value-hour"])
        };

        Job.update(newData);
    
        res.redirect(`/job/${id}`);
    },
    
    delete(req, res) {
        const id = Number(req.params.id);
        Job.delete(id);
        res.redirect("/");
    }
}

