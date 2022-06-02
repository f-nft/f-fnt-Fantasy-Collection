import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

const { active, account, library, connector, activate, deactivate } = useWeb3React()
async function connect() {
  try {
    await activate(injected)
  } catch (ex) {
    console.log(ex)
  }
}
{active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
async function disconnect() {
  try {
    deactivate()
  } catch (ex) {
    console.log(ex)
  }
}
<button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
function getLibrary(provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
  
}

export default MyApp