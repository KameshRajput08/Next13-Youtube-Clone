import ClientOnly from "./components/ClientOnly";
import ExtendedMenu from "./components/ExtendedMenu";
import Menu from "./components/Menu";
import Login from "./components/Modals/LoginModel";
import Register from "./components/Modals/RegisterModel";
import Upload from "./components/Modals/UploadModel";
import CustomizeModal from "./components/Modals/CustomizeModal";
import Navbar from "./components/Navbar";
import "./globals.scss";
import { Open_Sans } from "next/font/google";
import { getCurrentUser } from "./actions/getCurrentUser";

const Sans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Youtube Clone",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={Sans.className}>
        <div className={`w-screen h-screen relative overflow-hidden`}>
          <ClientOnly>
            <ExtendedMenu id={user?._id ? user._id : null} />
            <Navbar profile={user?.image ? user.image : null} />
            <Login />
            <Register />
            <Upload />
            <CustomizeModal />
          </ClientOnly>
          <div className={`w-screen flex h-[calc(100vh-48px)] overflow-hidden`}>
            <ClientOnly>
              <Menu />
            </ClientOnly>
            <div className={`flex-[7] overflow-y-scroll`}>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
