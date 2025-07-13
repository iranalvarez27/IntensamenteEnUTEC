import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
// import Process from './components/Process';
// import SourceCode from './components/SourceCode';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Videos />
      <Gallery />
      {/* <Process /> */}
      {/* <SourceCode /> */}
      <Footer />
    </div>
  );
}

export default App;