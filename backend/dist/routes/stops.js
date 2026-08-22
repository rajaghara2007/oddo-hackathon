"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stops_1 = require("../controllers/stops");
const auth_1 = require("../middlewares/auth");
const activities_1 = __importDefault(require("./activities"));
const router = (0, express_1.Router)({ mergeParams: true });
router.use(auth_1.authenticate);
router.get("/", stops_1.getStops);
router.post("/", stops_1.createStop);
router.patch("/:id", stops_1.updateStop);
router.delete("/:id", stops_1.deleteStop);
router.use("/:stopId/activities", activities_1.default);
exports.default = router;
