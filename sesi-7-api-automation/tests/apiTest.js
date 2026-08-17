const { describe } = require("mocha");
const assert = require("assert");
const { expect } = require("chai");
const { request } = require("http");

let token;

before(async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: "admin",
          password: "admin",
        }),
      }
    );
    const data = await response.json();
    token = data.token;
  });

describe("Test List User", function () {
  it("Get User List", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).to.equal(200);
    // Mencetak Response Body
    const data = await response.json();
    expect(data.users[0].username).to.eql("Ridhwan");
  });
});

describe("Test Add User", function () {
  it("Success Add User", async function () {
    const username = "seonhokim";
    const age = 33;
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          age: age
        }),
      }
    );

    expect(response.status).to.equal(201);
    // Mencetak Response Body
    const data = await response.json();
    expect(data.message).to.eql(`User successfully added, Hi ${username}!`);
  });

  it("Failed Add User", async function () {
    const username = "";
    const age = 33;
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          age: age
        }),
      }
    );

    expect(response.status).to.equal(400);

    // Mencetak Response Body
    const data = await response.json();
    expect(data.error).to.eql("Missing username or age");
  });
});
  
