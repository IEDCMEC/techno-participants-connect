import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import logo from "../assets/logo.png"
import styles from "../styles/Error.module.css"
import { CustomTitle } from "../utils"
function UserNotPublic() {
  const router = useRouter()
  return (
    <>
      <CustomTitle title="Page Not Found" />
      <div className={styles.error_container}>
        <div className={styles.error_details}>
          <div className={styles.error_details_content}>Not Found </div>

          <div className={styles.error_details_content}>
            This user has not made his details public.
          </div>
          <div className={styles.error_details_content}>
            If you have not already, please follow this link to fill the form.
          </div>
        </div>
        <div className={styles.error_details_button}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdpADcr-G5z2aSVkfpl_g5qMgFBJw2P3pUgkbpi9YlE6H7kGg/viewform"
            style={{ color: "white", textDecoration: "none" }}
          >
            Form
          </a>
        </div>
      </div>
    </>
  )
}
export default UserNotPublic
