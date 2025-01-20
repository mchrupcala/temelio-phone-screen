const request = require("supertest");
const app = require("../app");

describe("Nonprofits API", () => {
  it("should create a new nonprofit", async () => {
    const res = await request(app).post("/nonprofits").send({
      name: "Company A",
      address: "123 Main Street",
      email: "companyA@gmail.com",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Company A");
    expect(res.body.address).toBe("123 Main Street");
    expect(res.body.email).toBe("companyA@gmail.com");
  });

  it("should get all nonprofits", async () => {
    const res = await request(app).get("/nonprofits");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].address).toBe("123 Main Street");
  });

  it("should a nonprofit by ID (email)", async () => {
    const res = await request(app).get("/nonprofits/companyA@gmail.com");

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Company A");
    expect(res.body.address).toBe("123 Main Street");
    expect(res.body.email).toBe("companyA@gmail.com");
  });
});
