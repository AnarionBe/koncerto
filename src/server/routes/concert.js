import express from "express";
import multer from "multer";
import {
    listConcerts,
    addConcert,
    updateConcert,
    deleteConcert,
    getPoster,
} from "../actions/concert";

const router = express.Router();
const multParse = multer({dest: "/uploads"});

/*
 * URI: /api/concerts
 * METHOD: GET
 * ACTION: List concerts
 * PARAMS: query -> filters
 */
router.get("/", listConcerts);

/*
 * URI: /api/concerts
 * METHOD: POST
 * ACTION: Add concert to database
 * PARAMS: Concert informations
 */
router.post("/", multParse.single("poster"), addConcert);

/*
 * URI: /api/concerts/:id
 * METHOD: PUT
 * ACTION: Update target concert
 * PARAMS:  id -> concert id
 *          body -> concert informations
 */
router.put("/:id", multParse.single("poster"), updateConcert);

/*
 * URI: /api/concerts/:id
 * METHOD: DELETE
 * ACTION: Delete target concert
 * PARAMS: id -> concert id
 */
router.delete("/:id", deleteConcert);

/*
 * URI: /api/concerts/poster/:path
 * METHOD: GET
 * ACTION: Get the concert poster
 * PARAMS: query.poster -> path to the poster
 */
router.get("/poster", getPoster);

export default router;
