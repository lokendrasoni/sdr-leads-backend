const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    sent: {
        type: Number,
        default: 0
    },
    opened: {
        type: Number,
        default: 0
    },
    responded: {
        type: Number,
        default: 0
    },
    last_contacted_via: {
        type: String,
        required: true
    },
    activity_history: {
        type: Array
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

module.exports = mongoose.model("Lead", schema, "leads");