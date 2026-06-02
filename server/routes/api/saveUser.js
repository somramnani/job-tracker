const express = require("express");
const { clerkClient, getAuth } = require("@clerk/express");
const prisma = require("../../utils/prismaClient");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const clerkUser = await clerkClient.users.getUser(userId);
    const primaryEmail =
      clerkUser.primaryEmailAddress?.emailAddress ||
      clerkUser.emailAddresses?.[0]?.emailAddress;

    if (!primaryEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

    const name =
      clerkUser.fullName ||
      `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
      clerkUser.username ||
      primaryEmail;

    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: { name, email: primaryEmail },
      create: { clerkId: userId, name, email: primaryEmail },
    });

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
