import noteModel from "../model/note.model.js";

export const create = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const note = await noteModel.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json({ message: "New note created successfully", note });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log("Error in create note: ", error);
  }
};

export const update = async (req, res) => {
  try {
    const {id} = req.params; 
    const {title, description} = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const note = await noteModel.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (!(note.user.toString() == req.user._id))
      return res.status(401).json({ message: "Unauthorized. You don't have access to update this note." });

    note.title = title;
    note.description = description;
    await note.save();

    res.json({ message: "Note updated successfully", note });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
    console.log("Error in update note: ", error);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const {id} = req.params; 
    const note = await noteModel.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (!(note.user.toString() == req.user._id))
      return res.status(401).json({ message: "Unauthorized. You don't have access to update this note." });

    await note.deleteOne();

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
    console.log("Error in delete note: ", error);
  }
};