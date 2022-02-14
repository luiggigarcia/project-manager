module.exports = {
    remainingDaysOfJob(job) {
        const remainingDays = Math.trunc(job["total-hours"] / job["daily-hours"]);
        const creationDate = new Date(job.created_at);
        const finalDay = creationDate.getDate() + remainingDays;
        const deadline = creationDate.setDate(finalDay);
        const timeDiff = deadline - Date.now();
        const dayInMs = 86400000;
        const dayDiff = Math.floor(timeDiff / dayInMs);
        return dayDiff;
    },
    
    calculateBudget(job, valueOfHour) {
        return (valueOfHour * job["total-hours"]).toFixed(2)
    }
};