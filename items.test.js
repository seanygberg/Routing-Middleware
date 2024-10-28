// app.test.js
const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");

beforeEach(() => {
  items.length = 0; // Clear items array before each test
  items.push({ name: "popsicle", price: 1.45 });
});

afterAll(() => {
  items.length = 0; // Clear items array after all tests
});

describe("GET /items", () => {
  it("should return a list of shopping items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: "popsicle", price: 1.45 }]);
  });
});

describe("POST /items", () => {
  it("should add a new item to the shopping list", async () => {
    const newItem = { name: "cheerios", price: 3.4 };
    const res = await request(app).post("/items").send(newItem);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: newItem });
    expect(items).toContainEqual(newItem);
  });
});

describe("GET /items/:name", () => {
  it("should return an item by name", async () => {
    const res = await request(app).get("/items/popsicle");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: "popsicle", price: 1.45 });
  });

  it("should return 404 if item is not found", async () => {
    const res = await request(app).get("/items/nonexistent");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});

describe("PATCH /items/:name", () => {
  it("should update an item by name", async () => {
    const updatedItem = { name: "new popsicle", price: 2.45 };
    const res = await request(app).patch("/items/popsicle").send(updatedItem);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: updatedItem });
    expect(items).toContainEqual(updatedItem);
  });

  it("should return 404 if item to update is not found", async () => {
    const res = await request(app).patch("/items/nonexistent").send({ name: "new item" });
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});

describe("DELETE /items/:name", () => {
  it("should delete an item by name", async () => {
    const res = await request(app).delete("/items/popsicle");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
    expect(items).not.toContainEqual({ name: "popsicle", price: 1.45 });
  });

  it("should return 404 if item to delete is not found", async () => {
    const res = await request(app).delete("/items/nonexistent");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Item not found" });
  });
});
