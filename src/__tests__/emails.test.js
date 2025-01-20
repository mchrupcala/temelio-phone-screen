const request = require("supertest");
const app = require("../app");

describe("Emails API", () => {
  it("should send bulk emails", async () => {
    await request(app).post("/nonprofits").send({
      name: "Company A",
      email: "companyA@test.com",
      address: "123 Main Street",
    });

    const res = await request(app)
      .post("/emails")
      .send({
        nonProfitEmails: ["companyA@test.com"],
        template: "Sending money to nonprofit { name } at address { address }",
        sender: "tester@gmail.com",
        subject: "Testing 1..2...3...",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(1);
  });

  it("should get all sent emails", async () => {
    const res = await request(app).get("/emails");
    expect(res.body.length).toBe(1);
  });
});
