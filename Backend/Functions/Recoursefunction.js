import Resources from "../Models/Resources.js";

const PostResource = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debug log
    const {
      ResourceTitle,
      ResourceDescription,
      ResourceType,
      ResourceLink,
      ResourceCategory,
      Postername,
      Posteremail,
    } = req.body;

    if (
      !ResourceTitle ||
      !ResourceDescription ||
      !ResourceCategory ||
      !ResourceType ||
      !ResourceLink ||
      !Postername ||
      !Posteremail
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const resource = new Resources({
      ResourceTitle,
      ResourceDescription,
      ResourceType,
      ResourceLink,
      ResourceCategory,
      Postername,
      Posteremail,
    });

    await resource.save();
    return res
      .status(201)
      .json({ message: "Resource submitted successfully", resource });
  } catch (err) {
    console.log("Error in posting resource:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const ApproveResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (status === "rejected") {
      const resource = await Resources.findByIdAndDelete(id);

      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      return res.status(200).json({ message: "Resource rejected and deleted" });
    }

    const resource = await Resources.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    return res.status(200).json({ message: "Resource approved", resource });
  } catch (err) {
    console.log("Error in updating resource status:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const GetResources = async (req, res) => {
  try {
    const resources = await Resources.find();
    return res.status(200).json(resources);
  } catch (err) {
    console.log("Error in getting resources:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const GetResourcesCategory = async (req, res) => {
  try {
      const categories = await Resources.distinct("ResourceCategory");
    return res.status(200).json(categories);
  } catch (err) {
    console.log("Error in getting resources:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const SearchResourcesbyTitle = async (req, res) => {
  try {
    const resources = await Resources.find({ ResourceTitle: req.params.title });
    return res.status(200).json(resources);
  } catch (err) {
    console.log("Error in getting resources:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const SearchResourcesbyCategory = async (req, res) => {
  try {
    const resources = await Resources.find({
      ResourceCategory: req.params.category,
    });
    return res.status(200).json(resources);
  } catch (err) {
    console.log("Error in getting resources:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  PostResource,
  ApproveResource,
  GetResources,
  GetResourcesCategory,
  SearchResourcesbyTitle,
  SearchResourcesbyCategory,
};
