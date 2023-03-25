import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loader } from "../../components";
import styles from "../../styles/Users.module.css";
import logo from "../../assets/logo.png";
import { useRouter } from "next/router";
import { CustomTitle } from "../../utils";
import axios from "axios";
function Users() {
  const router = useRouter();

  const { eventId } = router.query;
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  async function getUsers() {
    setUsers([])
    setLoading(false)
    // if (eventId) {
    //   setLoading(true);
    //   const response = await axios.get(`/api/events/${eventId}`);
    //   setUsers(response.data);
    //   console.log(response)
    //   setLoading(false);
    // }
  }
  useEffect(() => {
    getUsers();
  }, [eventId]);
  if (loading) return <Loader />;
  return (
    <>
          <CustomTitle title="Users" />

      <div className={styles.users_container}>
        <div className={styles.users_profile_logo}>
          <Image src={logo} alt="" />
        </div>
        {/* <input
          type="text"
          placeholder="Search Developers"
          className={styles.search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        /> */}
        <div className={styles.user_container_cards} style={{
          height:"50vh",
          display:"flex",
          justifyContent:"center"
        }}>
          {users.length === 0 && (
            <div className={styles.no_users} style={{
              textAlign:"center",
              lineHeight:1.5
            }}>
              Scan A QR to View the Profile..
            </div>
          )}
          {users.map((user, index) =>
            user.band_id ? (
              <div
                key={index}
                className={styles.user_card_container}
                onClick={() => {
                  router.push(`/${user.band_id}`);
                }}
              >
                <div className={styles.user_card_image_container}>
                  <img
                    src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${user.users.email}`}
                    alt=""
                  />
                </div>
                <div className={styles.user_card_container_details}>
                  <div className={styles.user_card_id}>
                    Techno ID : <b>{user?.band_id}</b>
                  </div>
                  <div className={styles.user_card_name}>{user.users.name}</div>
                  {/* <div className={styles.user_card_designation}>
                    {user?.designation.toLowerCase().includes("team")
                      ? user?.designation
                      : `Team ${user?.designation}`}
                  </div> */}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

export default Users;
