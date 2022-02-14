let data =  [
    {
        id: 1,
        name: "Website",
        "daily-hours": 4,
        "total-hours": 2,
        created_at: Date.now()
    },
    {
        id: 2,
        name: "SaaS",
        "daily-hours": 6,
        "total-hours": 250,
        created_at: Date.now()
    }
];

module.exports = {
    get() {
        return data;
    },

    insert(newData) {
        data.push(newData);
    },

    update(newData, index) {
        data[index] = newData;
    },

    delete(id) {
        data = data.filter(job => job.id !== id);
    }
}