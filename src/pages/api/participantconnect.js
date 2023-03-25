const rp = require("request-promise")
const csvtojson = require("csvtojson")

export default async function pConnect(req, res) {
  const csv = await rp(process.env.SHEET_URL)
  const json = await csvtojson().fromString(csv)

  res.status(200).json({
    paricipantDetails: json,
  })
}
