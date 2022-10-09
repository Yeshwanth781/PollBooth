import logo from './logo.svg';
import './App.css';
import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon, RepeatClockIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import Card from './components/card/card'
import CircleIcon from './components/circleIcon';
import getTeams from './fetchData';
import { Wrap, WrapItem } from '@chakra-ui/react'
import { Divider, StackDivider } from '@chakra-ui/react'
import { background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading } from '@chakra-ui/react'
import { Formik } from 'formik'
import { Get_Teams } from './fetchData';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Teams from './screens/teams';
import Vote from './screens/vote';
import Polls from './screens/polls';
import Login from './screens/login';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setname] = useState('');
  useEffect(() => {
    console.log("In App Component", location.state);
    if (location.state !== null) {
      setname(location.state.name)
    } else navigate('/');
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <VStack
        w={'100%'}
        h={'100%'}
        bg={'rgb(46, 44, 44)'}
        p={50}
        pt={5}
        align={'strech'}
        spacing={5}
      >
        <div className='header'>
          <Text>Hi!! {name}..</Text>
        </div>
        <div className='appContainer'>
          <HStack
            pl={4}
            pt={3}
          >
            <CircleIcon boxSize='16' color='red' icon={<ArrowBackIcon w={3} h={3} />} func={() => window.history.back()} />
            <CircleIcon color='yellow' icon={<RepeatClockIcon w={3} h={3} />} func={() => window.location.reload()} />
            <CircleIcon boxSize='8' color='rgb(52, 109, 82)' icon={<ArrowForwardIcon w={3} h={3} />} func={() => window.history.forward()} />
          </HStack>
          <Routes>
            <Route path='/' element={<Teams />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/polls' element={<Polls />} />
            <Route path='/vote' element={<Vote />} />
          </Routes>
        </div>
      </VStack>
    </div>
  );
}

export default App;
