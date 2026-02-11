// // AppLayout.js
// import Header from "./Header";
// import Footer from "./Footer";


// function AppLayout({ children }) {
//   return (
//     <div className="min-h-screen flex flex-col ">
//       {/* Header */}
//       <Header />

//       {/* Main content grows to fill remaining space */}
//       <main className="flex-grow">
//         {children}
       
//       </main>

//       {/* Footer sticks to bottom */}
//       <Footer />
//     </div>
//   );
// }

// export default AppLayout;


import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";

function AppLayout({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content grows to fill remaining space */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer sticks to bottom */}
      {/* Footer को conditional कर सकते हैं अगर चाहें */}
      {isAuthenticated ? <Footer /> : <Footer />} 
    </div>
  );
}

export default AppLayout;
