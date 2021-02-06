const expect = require("chai").expect;
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

var app = require("../server");

describe("Materials Management API", function () {
  let id;
  describe("get all materials", function () {
    it("returns status 200", function (done) {
      chai
        .request(app)
        .get("/materials")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("returns status 404", function (done) {
      chai
        .request(app)
        .get("/materials1")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("add material", function () {
    it("should return body with name cesium", function (done) {
      chai
        .request(app)
        .post("/materials/add")
        .set("content-type", "application/json")
        .send({ name: "cesium" })
        .end(function (error, response, body) {
          expect(response.body.name).equals("cesium");
          id = response.body.id;
          done();
        });
    });
  });

  describe("edit material", function () {
    it("should return body with name gold", function (done) {
      chai
        .request(app)
        .put("/materials/edit/" + id)
        .set("content-type", "application/json")
        .send({ name: "gold" })
        .end(function (error, response, body) {
          expect(response.body[0].name).equals("gold");
          done();
        });
    });
  });

  describe("delete material", function () {
    it("returns status 200", function (done) {
      chai
        .request(app)
        .delete("/materials/delete/" + id)
        .set("content-type", "application/json")
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });
});
