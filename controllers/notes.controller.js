import noteModel from "../model/note.model.js";

export const create = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const note = await noteModel.create({ title, description, user: req.user._id });

    res.status(201).json({message: "New note created successfully", note});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log("Error in create note: ", error);
  }
};

export const update = async (req, res) => {
    try {
        const id = req.prams;
        res.json({id});
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    console.log("Error in update note: ", error);
    }
}
