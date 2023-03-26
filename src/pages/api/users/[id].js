import axios from "axios";
const fs = require("fs");
import SupabaseClient from "@/utils/SupabaseClient";

const rp = require("request-promise");
const csvtojson = require("csvtojson");

// export default async function pConnect(req, res) {
//   const csv = await rp(process.env.SHEET_URL)
//   const json = await csvtojson().fromString(csv)

//   res.status(200).json({
//     paricipantDetails: json,
//   })
// }

export default async function handler(req, res) {
  const csv = await rp(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSbEEYtGwtAz0kzVpoe5qVtOVO1aamYvk3EIqdgSPtHAaGp-2iiDgSppp08Jyu7WuuAaBxbQvTVqrVF/pub?output=csv"
  );
  const json = await csvtojson().fromString(csv);

  // fs.writeFile("jsonData", JSON.stringify(json), function (err) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log("The file was saved!")
  // })
  // console.log(json)
  //const json = require("./jsonData")
  // console.log(json)

  const { id } = req.query;
  const { data } = await SupabaseClient.from("register")
    .select("*, users(*) ")
    .eq("band_id", id);

  // console.log(data);

  if (req.method === "GET") {
    try {
      const selectedUser = data[0]?.users;
      const selectedParticipantData = json.find((participant) => {
        return participant.Email === selectedUser?.email;
      });

      res.status(200).json({ user: selectedParticipantData });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
