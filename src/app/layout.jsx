import Navebar from "@/components/navbar";
import "./globals.css";

import Footer from "@/components/footer";
import Loader from "@/components/loader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SessionProvider from "@/components/SessionProvider";
import Progress from "@/components/progress";
export const metadata = {
  title: "IGNOU products buy and sell",
  description: "IGNOU trusted plateform for buy and sell guess paper, notes, assignments",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gray-200 dark:bg-sky-900`}>
        <Progress />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        // transition="Bounce"
        />
        <SessionProvider >
          <Navebar />
          <div className="fixed bottom-1 right-1 w-24 rounded-lg h-8 flex items-center justify-center bg-sky-200 text-sm">Developement</div>
          <Loader />
          {children}
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
