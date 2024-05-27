const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/authMiddleware");
const propertyController = require("../controller/propertyController");

router.post(
  "/createProperty",
  validateToken,
  propertyController.createProperty
);

router.get(
  "/getAllProperties",
  validateToken,
  propertyController.getAllProperties
);

router.put(
  "/updateProperty/:id",
  validateToken,
  propertyController.updateProperty
);

router.put("/likeProperty/:id", validateToken, propertyController.likeProperty);

router.delete(
  "/deleteProperty/:id",
  validateToken,
  propertyController.deleteProperty
);

router.get(
  "/getPropertyById/:id",
  validateToken,
  propertyController.getPropertyById
);

module.exports = router;
