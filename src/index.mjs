import server from "./server.mjs";
const PORT = 3000;


server.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})