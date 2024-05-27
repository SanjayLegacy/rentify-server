const db = require("../models");
const asyncHandler = require("express-async-handler");

const Property = db.property;

const getPropertyById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const property = await Property.findOne({ where: { id: id } });

  if (!property) {
    res.status(404);
    throw new Error(`Property not found = ${id}`);
  }

  res.status(200).send(property);
});

const getAllProperties = asyncHandler(async (req, res) => {
  const listOfProperties = await Property.findAll();

  res.status(200).json(listOfProperties);
});

const createProperty = asyncHandler(async (req, res) => {
  const {
    name,
    place,
    area,
    address,
    bedrooms,
    bathrooms,
    price,
    amenities,
    description,
    nearByColleges,
    nearByHospitals,
    likes,
  } = req.body;

  const newProperty = await Property.create({
    name: name,
    place: place,
    area: area,
    address: address,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    price: price,
    amenities: amenities,
    nearByColleges: nearByColleges,
    nearByHospitals: nearByHospitals,
    description: description,
    likes: likes,
    createdBy: req.user.id,
  });

  if (newProperty) {
    res.status(200).json("Property created successfully!");
  }
});

const updateProperty = asyncHandler(async (req, res) => {
  const {
    name,
    place,
    area,
    address,
    bedrooms,
    bathrooms,
    price,
    amenities,
    nearByColleges,
    nearByHospitals,
    description,
  } = req.body;
  const propertyId = req.params.id;
  const property = await Property.findOne({ where: { id: propertyId } });

  if (property) {
    await Property.update(
      {
        name: name,
        place: place,
        area: area,
        address: address,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        price: price,
        amenities: amenities,
        nearByColleges: nearByColleges,
        nearByHospitals: nearByHospitals,
        description: description,
      },
      { where: { id: propertyId } }
    );
    res.status(200).json("Property updated successfully!");
  }
});

const likeProperty = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;
  const property = await Property.findOne({ where: { id: propertyId } });

  if (property) {
    await Property.update(
      {
        likes: property.likes + 1,
      },
      { where: { id: propertyId } }
    );
    res.status(200).json("Property liked successfully!");
  }
});

const deleteProperty = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;
  await Property.destroy({ where: { id: propertyId } });
  res.status(200).json("Property deleted successfully");
});

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  likeProperty,
  deleteProperty,
};
