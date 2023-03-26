import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import logo from "../assets/logo.png"
import styles from "../styles/UserNotPublic.module.css"
import { CustomTitle } from "../utils"
function UserNotPublic() {
  const router = useRouter()
  return (
    <>
      <CustomTitle title="Page Not Found" />
      <div className={styles.error_container}>
        <div className={styles.error_details}>
          <h3
            className={styles.error_details_heading}
            style={{ textAlign: "center" }}
          >
            Details Not Public
          </h3>

          <div
            className={styles.error_details_content}
            style={{
              padding: "0 3rem",
              textAlign: "center",
            }}
          >
            This profile has not been made public. If you are the owner of this
            band, please fill your details in{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdpADcr-G5z2aSVkfpl_g5qMgFBJw2P3pUgkbpi9YlE6H7kGg/viewform"
              style={{ color: "white", textAlign: "center" }}
            >
              this form
            </a>{" "}
            to make it visible here.
          </div>
        </div>
      </div>
    </>
  )
}
export default UserNotPublic
