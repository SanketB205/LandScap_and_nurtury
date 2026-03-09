import Contactus from "../models/Contactus.js";

export const createContactus = async (req, res) => {
  try {
    const contactus = new Contactus(req.body);
    await contactus.save();
    res.status(201).json(contactus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContactus = async (req, res) => {
  try {
    const contacts = await Contactus.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteContactus = async (req, res) => {
  try {
    const contact = await Contactus.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const demo = async (req, res) => {
  try {
    res.send("hii");
  } catch (error) {
    res.send(error.message);
  }
};