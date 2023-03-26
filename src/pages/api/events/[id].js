import SupabaseClient from "@/utils/SupabaseClient";

export default async function handler(req, res) {
  if ((req.method === "GET")) {
    const { id } = req.query;
    const users = await SupabaseClient.from("register")
      .select("*, users(*)")
      .eq("event_id", 
        parseInt(id)
      );

    res.status(200).json(users.data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
