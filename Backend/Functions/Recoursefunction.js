import Resources from "../Models/Resources.js";

// Function to calculate average rating based on reviews
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

// Post a new resource
const PostResource = async (req, res) => {
  try {
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

// Post a new review for a resource
const PostReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewText, rating, reviewerEmail } = req.body;

    const resource = await Resources.findById(id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    resource.Reviews.push({
      review: reviewText,
      rating,
      reviewerEmail,
    });

    resource.ResourceAverageRating = calculateAverageRating(resource.Reviews);

    await resource.save();

    return res
      .status(201)
      .json({ message: "Review added successfully", resource });
  } catch (err) {
    console.log("Error in posting review:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Approve or reject a resource
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

// Update a resource's details
const UpdateResource = async (req, res) => {
  try {

    const { id } = req.params;
    const updateFields = req.body;

    if (!id) {
      return res.status(400).json({ message: "Resource ID is required" });
    }

    const updatedResource = await Resources.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }
         console.log("Resource updated successfully:", updatedResource);
    return res
      .status(200)
      .json({ message: "Resource updated successfully", updatedResource });
  } catch (err) {
    console.log("Error in updating resource:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all resources with limited fields
const GetResources = async (req, res) => {
  try {
    const resources = await Resources.find().select(
      "ResourceTitle ResourceDescription _id"
    );
    return res.status(200).json(resources);
  } catch (err) {
    console.log("Error in getting resources:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get a specific resource by ID
const GetSpecificResourcesbyid = async (req, res) => {
  try {
    const resources = await Resources.findById(req.params.id);

    if (!resources) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (resources.Reviews.length > 0 && resources.ResourceAverageRating === 0) {
      resources.ResourceAverageRating = calculateAverageRating(
        resources.Reviews
      );
      await resources.save();
    }

    return res.status(200).json(resources);
  } catch (err) {
    console.log("Error in getting resources:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get distinct resource categories
const GetResourcesCategory = async (req, res) => {
  try {
    const categories = await Resources.distinct("ResourceCategory");
    return res.status(200).json(categories);
  } catch (err) {
    console.log("Error in getting resources:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Search resources by title
const SearchResourcesbyTitle = async (req, res) => {
  try {
    const resources = await Resources.find({
      ResourceTitle: req.params.title,
    });
    return res.status(200).json(resources);
  } catch (err) {
    console.log("Error in getting resources:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Search resources by category
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
  PostReview,
  ApproveResource,
  UpdateResource,
  GetResources,
  GetResourcesCategory,
  SearchResourcesbyTitle,
  GetSpecificResourcesbyid,
  SearchResourcesbyCategory,
};
