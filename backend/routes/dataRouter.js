const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const recordsController = require("../controllers/recordsController");
const { validateName } = require("../controllers/validation");

router.get("/images", dataController.fetchAllImages);
router.get(
    "/images/:imageId/characters",
    dataController.fetchCharactersByImageId
);
router.get("/images/:imageId/records", recordsController.fetchRecordsByImageId);
router.post(
    "/images/:imageId/records",
    validateName,
    recordsController.createRecord
);
router.get("/images/:imageId", dataController.fetchImageById);
router.post("/characters/verify", dataController.checkCoordinate);

module.exports = router;
