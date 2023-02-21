const request = require("supertest");
let server;

describe("/courses", () => {
    beforeEach(() => {
        server = require("../../server");
    });
    afterEach(async () => {
        await server.close();
    });

    describe("GET /", () => {
        it("should return all courses", async () => {
            const res = await request(server).get("/courses");
            expect(res.status).toBe(200);
        });
    });

    describe("POST /", () => {
        it("should add a new course and delete it by id", async () => {
            const course = {
                depAddress: "99 rue du test, 67000 Strasbourg",
                destAddress: "22 avenue de la rue 67000 Strasbourg",
                date: "2023-01-03 09:19:59",
                client: "test",
                duration: 12,
                price: 23.2,
                distance: 22,
                status: "test",
            };

            const res = await request(server).post("/courses").send(course);
            expect(res.status).toBe(201);

            const result = await request(server).delete(
                `/courses/${res._body.id}`
            );
            expect(result.status).toBe(200);
        });
    });

    describe("DELETE /", () => {
        beforeEach(() => {
            server = require("../../server");
        });
        afterEach(async () => {
            await server.close();
        });

        it("should get an error when trying to delete an inexisting course", async () => {
            const res = await request(server).delete("/courses/9999999999");
            expect(res.status).toBe(403);
        });
    });
});

describe(" accept and decline /courses", () => {
    beforeEach(() => {
        server = require("../../server");
    });
    afterEach(async () => {
        await server.close();
    });

    it("should be able to accept a course", async () => {
        const course = {
            depAddress: "99 rue du test, 67000 Strasbourg",
            destAddress: "22 avenue de la rue 67000 Strasbourg",
            date: "2023-01-03 09:19:59",
            client: "test accept course",
            duration: 12,
            price: 23.2,
            distance: 22,
            status: "requested",
        };

        const res = await request(server).post("/courses").send(course);
        const acceptedCourse = await request(server)
            .put(`/courses/${res._body.id}`)
            .send({ validate: "accept" });
        expect(acceptedCourse.status).toBe(204);

        const updatedCourse = await request(server).get(
            `/courses/${res._body.id}`
        );
        expect(updatedCourse.body.status).toBe("accepted");

        await request(server).delete(`/courses/${res._body.id}`);
    });

    it("should be able to decline a course", async () => {
        const course = {
            depAddress: "99 rue du test, 67000 Strasbourg",
            destAddress: "22 avenue de la rue 67000 Strasbourg",
            date: "2023-01-03 09:19:59",
            client: "test decline course",
            duration: 12,
            price: 23.2,
            distance: 22,
            status: "requested",
        };

        const res = await request(server).post("/courses").send(course);
        const acceptedCourse = await request(server)
            .put(`/courses/${res._body.id}`)
            .send({ validate: "decline" });
        expect(acceptedCourse.status).toBe(204);

        const updatedCourse = await request(server).get(
            `/courses/${res._body.id}`
        );
        expect(updatedCourse.body.status).toBe("declined");

        await request(server).delete(`/courses/${res._body.id}`);
    });
});
