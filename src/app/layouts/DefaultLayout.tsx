import AuthModal from "../auth/components/AuthModal";
import ProfileModal from "../auth/components/ProfileModal";
import Header from "../header/Header";
import Main from "../main/components/Main";
import Sidebar from "../sidebar/components/Sidebar";

const DefaultLayout = ({ className = "", ...other }) => {
  return (
    <div className="bg-mesh-gradient flex h-screen flex-col">
      <ProfileModal />
      <AuthModal />
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default DefaultLayout;
