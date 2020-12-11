import React from 'react';
import '../Dapp.css';
// import { Button } from './Button';
import './ThirdSection.css';
import { useContext, useState, useEffect} from 'react';
import { ethers } from 'ethers'
import { Web3Context } from 'web3-hooks'
import { PseudoStorageContext } from '../components/pages/Home'
import { PseudoStorage_address, PseudoStorage_abi } from '../contracts/PseudoStorage'

function ThirdSection() {
  
//     <div className='third-container'>
//       {/* <video src='./videos/video-1.mp4' autoPlay loop muted />   */}
//       <div className='second-btns'>
//        <form>
//             <input
//               className='footer-input'
//               name='pseudonyme'
//               type='name'
//               placeholder='Votre pseudonyme'
//             />
//             <Button buttonStyle='btn--outline'>Soumettre</Button>
//           </form> 
        
//       </div>
//     </div>
//   );
// }
const [web3State, login] = useContext(Web3Context)
const pseudoStorage = useContext(PseudoStorageContext)
const [PseudoStorage, setPseudoStorage] = useState(null);

const [getValue, setGetValue] = useState()
const [inputValue, setInputValue] = useState()
const mischAdress = '0x614dac7B79FdA3527879DD444DEe5d53E4D604e6'
const [isEnable, setIsEnable] = useState(false)
const [account, setAccount] = useState('0x0')
const [network, setNetwork] = useState(null)
const [balance, setBalance] = useState()


const handleOnClickGet = async () => {
  try {
    const res = await pseudoStorage.retrieve()
    setGetValue(res.toString())
  } catch (e) {
    console.log(e.message)
  }
}

const handleOnClickSet = async () => {
  const tx = await pseudoStorage.store(inputValue)
   
 }

/*
 // A voir:
 useEffect(() => {
  if (web3State.signer !== null) {
    setPseudoStorage(
      new ethers.Contract(
        PseudoStorage_address,
        PseudoStorage_abi,
        web3State.signer
      )
    )
  }
}, [web3State.signer])
  
*/

// connect metamask to app
useEffect(() => {
;(async () => {
  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const account = accounts[0] // tableau de 1 element
    setIsEnable(true)
    setAccount(account)
  } catch (e) {
    setIsEnable(false)
  }
})()
}, [])

useEffect(() => {
;(async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const network = await provider.getNetwork()
  const _balance = await provider.getBalance(mischAdress)
  const balance = ethers.utils.formatEther(_balance)
  setNetwork(network)
  setBalance(balance)
})()
}, [isEnable, mischAdress])



return (
  <>
  <div className="third-container">
    <h2>Network id: {web3State.chain_id}</h2>
    <h2>Network name: {web3State.network_name}</h2>
    <h2>MetaMask installed: {web3State.is_metamask ? 'yes' : 'no'}</h2>
    <h2>logged: {web3State.is_logged ? 'yes' : 'no'}</h2>
    <h2>{web3State.account}</h2>
    <h2>Balance: {web3State.balance}</h2>
    {!web3State.is_logged && (
      <>
        <button onClick={login}>login</button>
      </>
    )}
    {pseudoStorage && web3State.chain_id === 4 && (
      <>

          <button onClick={handleOnClickGet}>GET</button>
          <p>{getValue}</p>
          <button onClick={handleOnClickSet}>SET</button>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.currentTarget.value)
            }}
          />

      </>
    )}
    </div>
  </>
)
}


export default ThirdSection;