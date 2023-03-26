import SupabaseClient from "@/utils/SupabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const events = await SupabaseClient.from("event_list")
      .select()
      .then((data) => {
        return data.data;
      });
    res.status(200).json(events);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
