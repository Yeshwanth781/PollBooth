import logo from './logo.svg';
import './App.css';
import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import Card from './components/card/card'
import CircleIcon from './components/circleIcon';
import getTeams from './fetchData';
import { Wrap, WrapItem } from '@chakra-ui/react'
import { Divider, StackDivider } from '@chakra-ui/react'
import { background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading } from '@chakra-ui/react'
import { Formik } from 'formik'
import { Get_Teams } from './fetchData';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Teams from './screens/teams';
import Vote from './screens/vote';
import Polls from './screens/polls';
function App() {

  return (
    <BrowserRouter>
      <Routes>

      <Route path='/' element={<Teams/>}/>
      <Route path='/teams' element={<Teams/>}/> 
      <Route path='/polls' element={<Polls/>}/>
      <Route path='/vote' element={<Vote/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
