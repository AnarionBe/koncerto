import express from "express";
import multer from "multer";
import {addPlace, getPlaces, updatePlace} from "../actions/place";

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

/*
 * URI: /api/places/:id
 * METHOD: PUT
 * ACTION: Update target place
 * PARAMS:  id -> place id
 *          body -> place informations
 */
router.put("/:id", multParse.none(), updatePlace);

export default router;
