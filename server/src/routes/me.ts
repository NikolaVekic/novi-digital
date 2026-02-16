import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { UserModel } from "../models/User.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const user = await UserModel.findById(req.session.userId).select(
    "firstName lastName email",
  );
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  res.json({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

export default router;
