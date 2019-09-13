import express from "express";
import multer from "multer";
import {addPlace, getPlaces} from "../actions/place";

const router = express.Router();
const multParse = multer();

/*
 * URI: /api/places
 * METHOD: POST
 * ACTION: Add place to database
 * PARAMS: Place informations
 */
router.post("/", multParse.none(), addPlace);

/*
 * URI: /api/places
 * METHOD: GET
 * ACTION: List places
 * PARAMS: query -> filters
 */
router.get("/", getPlaces);

export default router;
