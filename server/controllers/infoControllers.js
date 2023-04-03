import districtsModel from "../models/districtsModel.js";
export const districtController = async (req, res) => {
  try {
    const state = req.params.state;
    if (state === undefined) {
      return { _id: 0, district: "Select a state first" };
    }
    const doc = await districtsModel.findOne({ state });
    return res.status(200).json({ doc });
  } catch (error) {
    console.log(`District Fetching Error: ${error}`.bgRed.white);
    return res.status(501).json({ message: "Districts Not Found" });
  }
};

export const stateController = async (req, res) => {
  const states = await districtsModel.find({}, "state");
  res.status(200).json(states);
  return;
};
