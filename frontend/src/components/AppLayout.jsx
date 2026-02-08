// AppLayout.js
import Header from "./Header";
import Footer from "./Footer";


function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <Header />

      {/* Main content grows to fill remaining space */}
      <main className="flex-grow">
        {children}
       
      </main>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
}

export default AppLayout;
