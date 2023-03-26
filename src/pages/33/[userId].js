/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Loader } from "../../components"
import Image from "next/image"
import styles from "../../styles/User.module.css"
import logo from "../../assets/logo.png"
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaDev,
} from "react-icons/fa"
import { FiGlobe, FiPhoneCall } from "react-icons/fi"
import { HiPhone } from "react-icons/hi"
import Error from "../404"
import { CustomTitle } from "@/utils"
import axios from "axios"
import UserNotPublic from "@/components/UserNotPublic"
import SupabaseClient from "@/utils/SupabaseClient"

const UserProfile = () => {
  const router = useRouter()
  const { userId } = router.query
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState(false)
  const [participantConnect, setParticipantConnect] = useState([])

  async function fetchParticipantConnect() {
    setLoading(true)
    const res = await axios.get(`/api/users/${userId}`)

    const { data } = await SupabaseClient.from("participant_connect").select(
      "*"
    )

    setParticipantConnect(data)

    // data.forEach((participant) => {
    //   console.log("fsfds")

    //   users.forEach((u) => {
    //     if (participant.Email === u?.users?.email) {
    //       console.log(user.users)
    //     }
    //   })
    // })

    const { data: registerData } = await SupabaseClient.from("register")
      .select("*, users(*) ")
      .eq("band_id", userId)

    const selectedUser = registerData[0]?.users

    const json = data
    const selectedParticipantData = json.find(
      (participant) => participant.Email === selectedUser?.email
    )
    console.log(selectedParticipantData)
    setUser(selectedParticipantData)

    setLoading(false)
  }

  async function fetchUser() {
    setLoading(true)
    // const res = await axios.get(`/api/users/${userId}`)

    // if (res?.data?.user) {
    //   setUser(res.data.user)
    //   console.log(res.data.user)
    // }

    const { data } = await SupabaseClient.from("users").select("*")
    setUsers(data)
    setLoading(false)
  }

  async function getUser() {
    console.log(userId)

    console.log({ participantConnect, users })
  }
  useEffect(() => {
    fetchUser()
    fetchParticipantConnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  if (loading) return <Loader />


  return (
    // <div>{JSON.stringify(user)}</div>
    <>
      {user ? (
        <>
          {/* <CustomTitle title={user?.Name} /> */}
          <div className={styles.user_profile_container}>
            <div className={styles.user_profile_logo}>
              <Image src={logo} alt="" />
            </div>
            <div className={styles.user_profile_card_container}>
              {/* <div className={styles.user_profile_image_container}>
                <img
                  src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${user?.Email}`}
                  alt=""
                />
              </div> */}
              <div className={styles.user_profile_name}>{user?.Name}</div>

              {/* <div
                className={styles.user_profile_designation}
                style={{
                  textAlign: "center",
                  lineHeight: "1.5",
                }}
              >
                {user?.organization}
              </div>
              {user?.grad_year && (
                <div
                  className={styles.user_profile_designation}
                  style={{
                    textAlign: "center",
                    lineHeight: "1.5",
                  }}
                >
                  Graduation Year : <b>{user?.grad_year}</b>
                </div>
              )} */}
              <div className={styles.user_profile_about}>
                {user?.["About you"]}
              </div>
              {user?.Email && !view && (
                <div
                  className={styles.user_profile_email_button}
                  onClick={() => setView(!view)}
                >
                  View Email
                </div>
              )}
              {view && (
                <div className={styles.user_profile_email}>{user?.Email}</div>
              )}

              <div className={styles.user_profile_social_icons}>
                {/* {user?.twitter && (
              <FaTwitter
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user?.twitter, "_blank");
                }}
              />
            )}
            {user.instagram && (
              <FaInstagram
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user.instagram, "_blank");
                }}
              />
            )}
            {user.portfolio && (
              <FiGlobe
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(user.portfolio, "_blank");
                }}
              />
            )} */}
                {user?.["WhatsApp/Mobile Number"] && (
                  <HiPhone
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(
                        `tel:${user?.["WhatsApp/Mobile Number"]}`,
                        "_blank"
                      )
                    }}
                  />
                )}
                {user?.["LinkedIn URL"] && (
                  <FaLinkedinIn
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(user?.["LinkedIn URL"], "_blank")
                    }}
                  />
                )}
                {user?.["GitHub URL"] && (
                  <FaGithub
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(user?.["GitHub URL"], "_blank")
                    }}
                  />
                )}
                {user?.devfolio && (
                  <FaDev
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(user?.devfolio, "_blank")
                    }}
                  />
                )}
              </div>
            </div>
            <div
              className={styles.user_profile_about}
              style={{
                color: "white",
              }}
            >
              If you are the owner of this profile and would like to update your
              profile, please fill{" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdpADcr-G5z2aSVkfpl_g5qMgFBJw2P3pUgkbpi9YlE6H7kGg/alreadyresponded"
                style={{ color: "white" }}
              >
                this form
              </a>
              .
            </div>
          </div>
        </>
      ): <UserNotPublic />}
    </>
  )
}

export default UserProfile
