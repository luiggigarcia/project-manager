const express = require('express');
const routes = express.Router();

const profile = {
    name: "Luiggi",
    avatar: "",
    "monthly-budget": 4500,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 10
};

const jobs = [];

routes.get("/", (req, res) => res.render(`${__dirname}/views/index`));
routes.get("/job", (req, res) => res.render(`${__dirname}/views/job`));
routes.post("/job", (req, res) => {
    const job_data = req.body;
    const job_id = jobs.length === 0 ? 1 : jobs.length + 1;

    jobs.push({
        id: job_id,
        name: job_data.name,
        "daily-hours": job_data["daily-hours"],
        "total-hours": job_data["total-hours"],
        created_at: Date.now()
    });
    
    res.redirect("/");
});
routes.get("/job/edit", (req, res) => res.render(`${__dirname}/views/job-edit`));
routes.get("/profile", (req, res) => res.render(`${__dirname}/views/profile`, { profile }));

module.exports = routes;