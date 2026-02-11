// // src/pages/Home.jsx
// import React from 'react';
// import ErrorBoundary from '../components/ErrorBoundary';
// import Hero from '../components/Hero';
// // import ProgramsShowcase from '../components/ProgramsShowcase';
// import FacilitiesShowcase from '../components/FacilitiesShowcase';
// import AppLayout from '../components/AppLayout';
// import ImageRotator from '../components/ImageRotator';

// const Home = () => {
//   return (
//     <AppLayout>
//       <ErrorBoundary>
//       <div className="min-h-screen bg-black">
//         <ImageRotator />
//         <Hero />
//         {/* <ProgramsShowcase /> */}
//         <FacilitiesShowcase />
//         {/* Add other sections as needed */}
//       </div>
//     </ErrorBoundary>
//     </AppLayout>
//   );
// };

// export default Home;


// src/pages/Home.jsx
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Hero from '../components/Hero';
import FacilitiesShowcase from '../components/FacilitiesShowcase';
import ImageRotator from '../components/ImageRotator';


const Home = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black">
        <ImageRotator />
        <Hero />
        <FacilitiesShowcase />
        {/* Add other sections as needed */}
      </div>
    </ErrorBoundary>
  );
};

export default Home;