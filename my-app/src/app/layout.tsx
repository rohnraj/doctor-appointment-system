import "./globals.css";
import IsAuthProvider from "./components/useContext/ContextProvider";
import { ToastContainer, Bounce } from 'react-toastify';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>MedCare</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"/>
      </head>
      <body>
        <IsAuthProvider>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            />
          {children}
        </IsAuthProvider>
      </body>
    </html>
  );
}
