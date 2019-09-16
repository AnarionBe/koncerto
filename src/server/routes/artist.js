import express from "express";
import multer from "multer";
import {
    addArtist,
    listArtists,
    updateArtist,
    getPoster,
} from "../actions/artist";

const router = express.Router();
const multParse = multer({dest: "/uploads"});

/*
 * URI: /api/artists
 * METHOD: POST
 * ACTION: Add artist to database
 * PARAMS: artist informations
 */
router.post("/", multParse.single("poster"), addArtist);

/*
 * URI: /api/atrists
 * METHOD: GET
 * ACTION: List artists
 * PARAMS: query -> filters
 */
router.get("/", listArtists);

/*
 * URI: /api/artists/:id
 * METHOD: PUT
 * ACTION: Update target artist
 * PARAMS:  id -> artist id
 *          body -> artist informations
 */
router.put("/:id", multParse.single("poster"), updateArtist);

/*
 * URI: /api/artists/poster
 * METHOD: GET
 * ACTION: Get the artist poster
 * PARAMS: query.poster -> path to the poster
 */
router.get("/poster", getPoster);

export default router;
