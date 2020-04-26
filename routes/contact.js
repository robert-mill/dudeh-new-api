const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Contacts, validate } = require("../models/contact");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await Contacts.find().select("-__v");
  res.send(contacts);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let contact = new Contacts({
    heading: req.body.heading,
    body: req.body.body,
  });
  contact = await contact.save();

  res.send(contact);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const contact = await Contacts.findByIdAndUpdate(
    req.params.id,
    {
      heading: req.body.heading,
      body: req.body.body,
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
  const contact = await Contacts.findByIdAndRemove(req.params.id);

  if (!contact)
    return res.status(404).send("The contact with the given ID was not found.");

  res.send(contact);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const contact = await Contacts.findById(req.params.id).select("-__v");

  if (!contact)
    return res.status(404).send("The contact with the given ID was not found.");

  res.send(contact);
});

module.exports = router;
