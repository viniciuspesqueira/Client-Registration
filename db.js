require("dotenv").config()
const mysql = require("mysql2/promise")

async function connect() {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    // database user
    user: process.env.user,
    // user password
    password: process.env.password,
    database: "crud",
  })

  console.log("Conectou no MySQL!")
  global.connection = connection
  return global.connection
}

connect()

async function selectClients() {
  const conn = await connect()
  const [rows] = await conn.query("SELECT * FROM crud.clients;")
  return rows
}

async function insertClient(client) {
  const conn = await connect()
  const sql = "INSERT INTO crud.clients(name, age, state) VALUES(?, ?, ?);"
  return await conn.query(sql, [client.name, client.age, client.state])
}

async function selectClient(idclient) {
  const conn = await connect()
  const sql = "SELECT * FROM crud.clients WHERE idclient=?"
  const [rows] = await conn.query(sql, [idclient])
  return rows && rows.length > 0 ? rows[0] : {}
}

async function updateClient(idclient, clients) {
  const conn = await connect()
  const sql = "UPDATE crud.clients SET name=?, age=?, state=? WHERE idclient=?"
  return await conn.query(sql, [
    clients.name,
    clients.age,
    clients.state,
    idclient,
  ])
}

async function deleteClient(idclient) {
  const conn = await connect()
  return await conn.query("DELETE FROM crud.clients WHERE idclient=?;", [
    idclient,
  ])
}

module.exports = {
  selectClients,
  insertClient,
  updateClient,
  selectClient,
  deleteClient,
}
