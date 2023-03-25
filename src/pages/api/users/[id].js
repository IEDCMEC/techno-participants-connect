import axios from "axios";

import SupabaseClient from "@/utils/SupabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const users = await SupabaseClient.from("register")
      .select("*, users(email) ")
      .eq("band_id", id);

    const response = await axios.get("/api/participantconnect");

    const participantsData = response.data;

    participantsData.forEach((participant) => {
      const user = users.find((user) => user.id === participant.id);
      if (user) {
        console.log("Do something");
      }
    });

    res.status(200).json(users);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
