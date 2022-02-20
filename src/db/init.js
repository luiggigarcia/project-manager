const Database = require('./config');

(async () => {
    try {
        const db = await Database();

        const jobTable = `
    CREATE TABLE job (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
    );
`;

        const profileTable = `
    CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        hours_per_day INT,
        days_per_week INT,
        vacation_per_year INT,
        value_hour INT,
        monthly_budget INT
    );
`;

        await Promise.all([
            db.exec(jobTable),
            db.exec(profileTable),
        ]);

        const job01 = `INSERT INTO job (name, daily_hours, total_hours) VALUES ("E-commerce", 8, 75)`;
        const job02 = `INSERT INTO job (name, daily_hours, total_hours) VALUES ("Institutional Website", 6, 45)`;

        const profile01 = `INSERT INTO profile (name, avatar, hours_per_day, days_per_week, vacation_per_year, value_hour)
                           VALUES ("John Miller", "https://source.unsplash.com/random", 6, 5, 4, 85);`;

        await Promise.all([
            db.run(job01),
            db.run(job02),
            db.run(profile01)
        ]);

       await db.close();


    } catch (msg) {
        console.error(msg);
    }
})();