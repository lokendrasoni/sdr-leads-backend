const mongoose = require("mongoose");
const connect = require("../services/connection");
const { faker } = require('@faker-js/faker');
const Lead = require("../models/leads");

connect(mongoose);
(async () => {
    const data = [];
    for (let i = 1; i <= 100; i++) {
        const name = faker.name.fullName();
        const company = faker.company.name();
        const email = faker.internet.email();
        const phone = faker.phone.number();
        const sent = faker.datatype.number({ max: 20 });
        const opened = sent && faker.datatype.number({ max: sent });
        const responded = opened && faker.datatype.number({ max: opened });
        const last_contacted_via = faker.helpers.arrayElement(['email', 'phone']);
        const activity_history = faker.helpers.arrayElements([{ source: "email", date: faker.date.between('2023-01-01T00:00:00.000Z', new Date()) }, { source: "phone", date: faker.date.between('2023-01-01T00:00:00.000Z', new Date()) }]);
        activity_history.push({ source: last_contacted_via, date: faker.date.between(activity_history[activity_history.length - 1].date, new Date()) });
        const created_at = faker.date.between('2023-01-01T00:00:00.000Z', activity_history[0].date);
        const updated_at = activity_history[activity_history.length - 1].date;

        data.push({
            name, company, email, phone, sent, opened, responded, last_contacted_via, activity_history, created_at, updated_at
        });
    }

    await Lead.insertMany(data);
    console.log("Added fake leads data");
})();