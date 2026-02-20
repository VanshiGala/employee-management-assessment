import User from "./models/User.js";

const seedAdmin = async () => {
  try {
    const admin = await User.findOne({ email: "admin@gmail.com" });

    if (admin) {
      admin.password = "admin123"; // plain text
      await admin.save(); // model will hash it
      console.log("Admin password updated");
      return;
    }

    await User.create({
      email: "admin@gmail.com",
      password: "admin123", // plain text
    });

    console.log("Admin user seeded successfully");
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
};

export default seedAdmin;