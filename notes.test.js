const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Note = require("../Models/notes");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { expect } = require("chai");


describe("Notes API", () => {
  let noteId;
  let token;
  let testUser;

  before(async () => {
    // ✅ Ensure DB connection
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_TEST_URI || process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // ✅ cleanup collections
    await Note.deleteMany({});
    await User.deleteMany({ email: "testuser@example.com" });

    // ✅ create test user
    testUser = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123", // plain text for test only
    });
    await testUser.save();

    // ✅ generate JWT token
    token = jwt.sign(
      { _id: testUser._id, email: testUser.email },
      process.env.JWT_Secret,
      { expiresIn: "1d" }
    );
  });

  after(async () => {
    // ✅ clean up DB + close connection
    await Note.deleteMany({});
    await User.deleteMany({ email: "testuser@example.com" });
    await mongoose.connection.close();
  });

  it("should create a note successfully", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", details: "Some details" });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("success", true);
    noteId = res.body.content?._id;
  });

  it("should fetch all notes", async () => {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("success", true);
  });

  it("should update a note successfully", async () => {
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Note" });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("success", true);
  });

  it("should return 404 if updating non-existing note", async () => {
    const res = await request(app)
      .put(`/api/notes/652b7a0e5a45f7b1a5e99999`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Does not exist" });

    expect(res.status).to.equal(404);
  });

  it("should delete a note successfully", async () => {
    const res = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("success", true);
  });

  it("should return 404 if deleting non-existing note", async () => {
    const res = await request(app)
      .delete(`/api/notes/652b7a0e5a45f7b1a5e88888`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
  });
});
