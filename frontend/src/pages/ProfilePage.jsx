import React from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/style";

import ProfileSideBar from "../components/Profile/ProfileSidebar.jsx";
import ProfileContent from "../components/Profile/ProfileContent.jsx";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-83.75">
          <ProfileSideBar active={active} setActive={setActive} /> 
        </div>
        <ProfileContent />
      </div>
    </div>
  );
};

export default ProfilePage;
