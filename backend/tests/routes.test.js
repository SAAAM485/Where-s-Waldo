const request = require("supertest");
const app = require("../app");

test("GET /api/images - should return all images", (done) => {
    request(app)
        .get("/api/images")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            done();
        });
});

test("GET /api/images/:imageId - should return image by ID", (done) => {
    const imageId = 1;
    request(app)
        .get(`/api/images/${imageId}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body.success).toBe(true);
            expect(res.body.data.id).toBe(imageId);
            done();
        });
});

test("GET /api/images/:imageId/characters - should return characters by image ID", (done) => {
    const imageId = 1;
    request(app)
        .get(`/api/images/${imageId}/characters`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            done();
        });
});

test("GET /api/images/:imageId/records - should return records by image ID", (done) => {
    const imageId = 1;
    request(app)
        .get(`/api/images/${imageId}/records`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            done();
        });
});

test("POST /api/images/:imageId/records - should create a new record", (done) => {
    const imageId = 1;
    const newRecord = {
        imageId: imageId,
        name: "Test User",
        score: 100,
    };
    request(app)
        .post(`/api/images/${imageId}/records`)
        .send(newRecord)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe(newRecord.name);
            done();
        });
});
test("POST /api/characters/verify - should verify character coordinates", (done) => {
    const verificationData = {
        id: 1,
        x: 0.5,
        y: 0.5,
    };
    request(app)
        .post("/api/characters/verify")
        .send(verificationData)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body.success).toBe(true);
            expect(typeof res.body.success).toBe("boolean");
            done();
        });
});
test("POST /api/characters/verify - should return 400 for invalid coordinates", (done) => {
    const verificationData = {
        id: 1, // Adjust this ID based on your test data
        x: -0.5, // Invalid coordinate
        y: 1.5, // Invalid coordinate
    };
    request(app)
        .post("/api/characters/verify")
        .send(verificationData)
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body.success).toBe(false);
            expect(res.body.error.code).toBe("INVALID_COORDINATE");
            done();
        });
});
test("GET /api/images/:imageId/characters - should return 404 for non-existent image", (done) => {
    const imageId = 9999; // Non-existent image ID
    request(app)
        .get(`/api/images/${imageId}/characters`)
        .expect("Content-Type", /json/)
        .expect(404)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body.success).toBe(false);
            expect(res.body.error.code).toBe("IMAGE_NOT_FOUND");
            done();
        });
});
test("POST /api/images/:imageId/records - should return 400 for invalid record data", (done) => {
    const imageId = 1;
    const invalidRecord = {
        imageId: imageId,
        name: "", // Invalid name
        score: -50, // Invalid score
    };
    request(app)
        .post(`/api/images/${imageId}/records`)
        .send(invalidRecord)
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body.success).toBe(false);
            expect(res.body.error.code).toBe("VALIDATION_ERROR");
            done();
        });
});
test("GET /api/images/:imageId - should return 404 for non-existent image", (done) => {
    const imageId = 9999; // Non-existent image ID
    request(app)
        .get(`/api/images/${imageId}`)
        .expect("Content-Type", /json/)
        .expect(404)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body.success).toBe(false);
            expect(res.body.error.code).toBe("IMAGE_NOT_FOUND");
            done();
        });
});
