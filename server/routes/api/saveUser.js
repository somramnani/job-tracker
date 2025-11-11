const express = require("express");
const { requireAuth } = require("@clerk/express");
const prisma = require("../../utils/prismaClient");

const router = express.Router();

router.post("/", requireAuth(), async (req, res) => {
  try {
    const { userId, emailAddresses, firstName, lastName } = req.auth.user;

    const name = `${firstName || ""} ${lastName || ""}`.trim();
    const email = emailAddresses[0].emailAddress;

    await prisma.user.upsert({
      where: { clerkId: userId },
      update: { name, email },
      create: { clerkId: userId, name, email },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
