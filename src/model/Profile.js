let data =  {
    name: "Luiggi",
    avatar: "",
    "monthly-budget": 4500,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 10,
    valueOfHour: 90
};

module.exports = {
    get() {
        return data;
    },

    update(newData) {
        data = newData;
    }
};