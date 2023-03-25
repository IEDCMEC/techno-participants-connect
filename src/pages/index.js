import Image from "next/image";
import React from "react";
import { Loader } from "../components";
import styles from "../styles/Users.module.css";
import logo from "../assets/logo.png";
import { useRouter } from "next/router";
import { CustomTitle } from "../utils";
import axios from "axios";

function Users() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  async function fetchEvents() {
    setEvents([]);
    setLoading(false);
    // await axios.get("/api/events").then((res) => {
    //   setEvents(res.data);
    //   setLoading(false);
    // });
  }

  React.useEffect(() => {
    fetchEvents();
  }, []);
  if (loading) return <Loader />;

  return (
    <>
      <CustomTitle title="Events" />
      <div className={styles.users_container}>
        <div className={styles.users_profile_logo}>
          <Image src={logo} alt="" />
        </div>
        <div
          className={styles.user_container_cards}
          style={{
            minHeight: "50vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {events.length === 0 ? (
            <div className={styles.no_users}  style={{
              textAlign:"center",
              lineHeight:1.5
            }}>
              Scan A QR to View the Profile..
            </div>
          ) : (
            events.map((event, index) => (
              <div
                key={index}
                className={styles.user_card_container_1}
                onClick={() => {
                  router.push(`/${event.id}`);
                }}
              >
                <div className={styles.user_card_container_details}>
                  <div className={styles.user_card_id}>
                    Event ID : <b>{event?.id}</b>
                  </div>
                  <div className={styles.user_card_name}>
                    {event.event_name}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Users;
