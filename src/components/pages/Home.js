import React from 'react';
import '../../Dapp.css';
import FirstSection from '../FirstSection';
import Footer from '../Footer';
import SecondSection from '../SecondSection';
import ThirdSection from '../ThirdSection';
import ForthSection from '../ForthSection';

import {
  PseudoStorage_address,
  PseudoStorage_abi,
} from '../../contracts/PseudoStorage';
import { useContract } from '../../hooks/useContract';


export const PseudoStorageContext = React.createContext(null)

function Home() {
  const pseudoStorage = useContract(PseudoStorage_address, PseudoStorage_abi)

  return (
    <>
      <FirstSection />
      <SecondSection/>
      <PseudoStorageContext.Provider value={pseudoStorage}>

      <ThirdSection/>
      </PseudoStorageContext.Provider>

      <Footer />
    </>
  );
}

export default Home;