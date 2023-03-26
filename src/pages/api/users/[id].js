import axios from "axios"
const fs = require("fs")
import SupabaseClient from "@/utils/SupabaseClient"

const rp = require("request-promise")
const csvtojson = require("csvtojson")

// export default async function pConnect(req, res) {
//   const csv = await rp(process.env.SHEET_URL)
//   const json = await csvtojson().fromString(csv)

//   res.status(200).json({
//     paricipantDetails: json,
//   })
// }

export default async function handler(req, res) {
  const csv = await rp(process.env.SHEET_URL)
  const json = await csvtojson().fromString(csv)

  // fs.writeFile("jsonData", JSON.stringify(json), function (err) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log("The file was saved!")
  // })
  // console.log(json)
  //const json = require("./jsonData")
  console.log(json)
  const { id } = req.query
  const { data } = await SupabaseClient.from("register")
    .select("*, users(*) ")
    .eq("band_id", id)

  if (req.method === "GET") {
    console.log(data[0])
    const selectedUser = data[0]?.users
    console.log({ selectedUser })

    const selectedParticipantData = json.find(
      (participant) => participant.Email === selectedUser?.email
    )

    console.log({ selectedParticipantData })
    res.status(200).json({ user: selectedParticipantData })
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
