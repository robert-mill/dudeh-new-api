const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { ContactRequest, validate } = require("../models/contactRequest");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await ContactRequest.find().select("-__v");
  res.send(contacts);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let contact = new ContactRequest({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    bodyText: req.body.bodyText,
  });
  contact = await contact.save();

  res.send(contact);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const contact = await ContactRequest.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      bodyText: req.body.bodyText,
    },
    {
      new: true,
    }
  );

  if (!contact)
    return res.status(404).send("The contact with the given ID was not found.");

  res.send(contact);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const contact = await ContactRequest.findByIdAndRemove(req.params.id);

  if (!contact)
    return res.status(404).send("The contact with the given ID was not found.");

  res.send(contact);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const contact = await ContactRequest.findById(req.params.id).select("-__v");

  if (!contact)
    return res.status(404).send("The contact with the given ID was not found.");

  res.send(contact);
});

module.exports = router;
