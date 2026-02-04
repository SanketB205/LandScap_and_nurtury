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
export const demo = async (req, res) => {
  try {
    res.send("hii")
  } catch (error) {
    res.send(error.message);
  }
};