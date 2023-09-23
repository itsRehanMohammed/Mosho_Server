const pincodes = (req, res) => {
  let pincodes_pin = [400088, 400021, 400089];
  res.status(200).json(pincodes_pin);
};

export default pincodes;
