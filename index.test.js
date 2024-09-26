const request = require("supertest");
const app = require("./src/app");
const Restaurant = require("./models");
const syncSeed = require("./seed");

let restQuantity;

beforeAll(async () => {
    await syncSeed();
    const restaurants = await Restaurant.findAll({});
    restQuantity = restaurants.length;
});

test("should return 200 on Get", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.statusCode).toBe(200);
});

test("should return an array of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("cuisine");
});

test("should return the correct number of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body.length).toEqual(restQuantity);
});

test("should return correct restaurant data", async () => {
    const response = await request(app).get("/restaurants");
    expect(Array.isArray(response.body)).toBe(true);
        expect.objectContaining({
            id: 1,
            name: "Applebees",
            location: "Texas",
            cuisine: "FastFood",
        })
    
});

test("should return correct restaurant", async () => {
    const response = await request(app).get("/restaurants/1");
 expect(response.body).toHaveProperty("id", 1);
});

test("should return larger restaurant array", async () => {
    const response = await request(app)
    .post("/restaurants")
    .send({ name: "qwe", location: "asd", cuisine: 'zxc'});
    expect(response.statusCode).toBe(200);
    const allRestaurants = await request(app).get("/restaurants");
    expect(allRestaurants.body.length).toEqual(restQuantity + 1);
});

test("should update first item in database", async () => {
    await request(app)
    .put("/restaurants/1")
    .send({ name: "qwe", location: "asd", cuisine: "zxc"});
    const restaurant = await Restaurant.findByPk(1);
    expect(restaurant.name).toEqual("qwe");
});

test("should delete db entry by id", async () => {
    await request(app).delete("/restaurants/1");
    const restaurants = await Restaurant.findAll({});
    expect(restaurants.length).toEqual(restQuantity);
    expect(restaurants[0].id).not.toEqual(1)
;})

test("should return an error if name is empty", async () => {
    const response = await request(app).post("/restaurants").send({
        name: "",
        location: "Texas",
        cuisine: "FastFood",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].msg).toBe("Name cannot be empty.");
});

test("should return an error if location is empty", async () => {
    const response = await request(app).post("/restaurants").send({
        name: "Applebees",
        location: "",
        cuisine: "FastFood",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].msg).toBe("Location cannot be empty.");
});

test("should return an error if cuisine is empty", async () => {
    const response = await request(app).post("/restaurants").send({
        name: "Applebees",
        location: "Texas",
        cuisine: "",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].msg).toBe("Cuisine cannot be empty.");
});