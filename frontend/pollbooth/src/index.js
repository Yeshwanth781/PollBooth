import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CircleIcon from './components/circleIcon';
import { background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <div style={{width:'100vw',height:'100vh'}}>
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
                    <Text>Hi!! Yeshwanth..</Text>
                </div>
                <div className='appContainer'>
                    <HStack
                        pl={4}
                        pt={3}
                    >
                        <CircleIcon boxSize='16' color='red' 
                        icon={<CloseIcon w={2} h={2} />} />
                        <CircleIcon boxSize='8' color='yellow' icon={<MinusIcon w={3} h={3} />} />
                        <CircleIcon color='rgb(52, 109, 82)' icon={<CheckIcon w={3} h={3} />} />
                    </HStack>
                    <App />
                </div>
            </VStack>
        </div>

    </ChakraProvider >
);
