import "./App.css"
import { useState } from 'react';
import { extendTheme, ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme,} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import mint from "./mint";
import navbar from "./navbar";

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function App() {
  const [account, setAccounts] = useState([])

  return <div className="App">
    <navbar accounts={accounts} setAccounts={setAccounts} />
    <mint accounts={accounts} setAccounts={setAccounts} />

  </div>;
}

export default App;