const leadsService = require("../services/leads");
const catchAsync = require("../utilities/catch-async");
const { sendResponse } = require("../utilities/responses");

exports.report = catchAsync(async (req, res) => {
    const data = await leadsService.report();
    
    return sendResponse(res, data);
});

exports.leads = catchAsync(async (req, res) => {
    const { page, limit, type, sortField, sortOrder } = req.query;

    const { data, pagination } = await leadsService.leads({ page, limit, type, sortField, sortOrder });
    
    return sendResponse(res, data, { pagination });
});