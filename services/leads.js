const Lead = require("../models/leads");
const generatePagination = require("../utilities/generate-pagination")

exports.report = async () => {
    const query = [
        {
            $facet: {
                all_leads: [
                    {
                        $count: "total"
                    }
                ],
                cold_leads: [
                    {
                        $match: {
                            sent: { $gte: 1 },
                            opened: 0,
                            responded: 0
                        }
                    },
                    {
                        $set: {
                            month: {
                                $month: "$created_at"
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$month",
                            total: {
                                $sum: 1
                            }
                        }
                    }
                ],
                warm_leads: [
                    {
                        $match: {
                            sent: { $gte: 1 },
                            opened: { $gte: 1 },
                            responded: 0
                        }
                    },
                    {
                        $set: {
                            month: {
                                $month: "$created_at"
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$month",
                            total: {
                                $sum: 1
                            }
                        }
                    }
                ],
                hot_leads: [
                    {
                        $match: {
                            sent: { $gte: 1 },
                            opened: { $gte: 1 },
                            responded: { $gte: 1 }
                        }
                    },
                    {
                        $set: {
                            month: {
                                $month: "$created_at"
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$month",
                            total: {
                                $sum: 1
                            }
                        }
                    }
                ]
            }
        },
        {
            $set: {
                all_leads: {
                    $ifNull: [
                        {
                            $arrayElemAt: ["$all_leads.total", 0]
                        },
                        0
                    ]
                }
            }
        }
    ];

    const data = await Lead.aggregate(query);

    const all_leads = data[0].all_leads;
    const cold_leads = {
        all: data[0].cold_leads.reduce((a, b) => a + b.total, 0),
        monthly: data[0].cold_leads.reduce((old, curr) => {
            old[curr._id] = curr.total;
            return old
        }, {})
    };
    const warm_leads = {
        all: data[0].warm_leads.reduce((a, b) => a + b.total, 0),
        monthly: data[0].warm_leads.reduce((old, curr) => {
            old[curr._id] = curr.total;
            return old
        }, {})
    };
    const hot_leads = {
        all: data[0].hot_leads.reduce((a, b) => a + b.total, 0),
        monthly: data[0].hot_leads.reduce((old, curr) => {
            old[curr._id] = curr.total;
            return old
        }, {})
    };

    return {
        all_leads, cold_leads, warm_leads, hot_leads
    };
};

exports.leads = async ({ type, page, limit, sortField, sortOrder }) => {
    let match = {};
    switch (type) {
        case "cold":
            match = {
                sent: { $gte: 1 },
                opened: 0,
                responded: 0
            };
            break;
        case "warm":
            match = {
                sent: { $gte: 1 },
                opened: { $gte: 1 },
                responded: 0
            }
            break;
        case "hot":
            match = {
                sent: { $gte: 1 },
                opened: { $gte: 1 },
                responded: { $gte: 1 }
            };
            break;
    }

    const { skip, sort } = generatePagination.getPagination({ page, limit, sortField, sortOrder });

    const query = [
        {
            $match: match
        },
        {
            $facet: {
                all: [
                    {
                        $sort: sort
                    },
                    {
                        $limit: limit
                    },
                    {
                        $skip: skip
                    },
                    {
                        $set: {
                            id: "$_id"
                        }
                    },
                    {
                        $unset: ["_id", "__v"]
                    }
                ],
                total: [
                    {
                        $count: "total"
                    }
                ]
            }
        },
        {
            $set: {
                total: {
                    $ifNull: [
                        {
                            $arrayElemAt: [
                                "$total.total", 0
                            ]
                        }, 0
                    ]
                }
            }
        }
    ];

    const data = await Lead.aggregate(query);

    const all = data[0].all;
    const total = data[0].total;

    const pagination = generatePagination({ page, limit, skip, total });

    return {
        data: all,
        pagination
    }
};