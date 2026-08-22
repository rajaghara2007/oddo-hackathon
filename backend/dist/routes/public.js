"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const public_1 = require("../controllers/public");
const router = (0, express_1.Router)();
router.get("/trips", public_1.getPublicTrips);
router.get("/trips/:id", public_1.getPublicTripById);
exports.default = router;
