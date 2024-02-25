import jwt from "jsonwebtoken";

const generateTokenAndSetCoockie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent xss attack cross-site scriptingattacks
    sameSite: true, // csfr attacks cross-site request forgery attack
  });
};

export default generateTokenAndSetCoockie;
