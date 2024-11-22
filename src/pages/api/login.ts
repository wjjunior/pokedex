import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (email === "test@example.com" && password === "password123") {
    res.status(200).json({ token: "dummy-token" });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
}
