import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import { Pollcard } from '../components/card/optioncard';
import AddForm from '../components/forms/addform';
import CircleIcon from '../components/circleIcon';
import getTeams from '../fetchData';
import { background, Button, ChakraProvider, color, Text, Stack, HStack, VStack, Box, Center, Heading, Wrap, WrapItem  } from '@chakra-ui/react'
import { Formik } from 'formik'
import { Get_Teams, Get_Options, Cast_Vote } from '../fetchData';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { useSearchParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'
function Vote() {
    const [options, set_options] = useState([]);
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const id=location.state.id;
    const pollname = location.state.title;
    const [changed,setchanged]=useState(false);
    const [selectedid, set_selected] = useState(0);
    const option = options.map((item) => {
        return (
            <Pollcard title={item.optionname} id={item.optionid} selectedoption={selectedid} set_selected={set_selected} />
        )
    }
    )
    const fetch=async ()=>{
        await Get_Options({ set_options, id: parseInt(location.state.id) });
        console.log('Options',options);
    }
    useEffect(async () => {
        fetch();
    }, [changed])
    const toast = useToast()
    return (
        <VStack
            color={'rgb(174, 231, 235)'}
            flex={1}
            wrap
            pt={10}
            alignItems={'center'}
            w={'100%'}
            h={'100%'}
            spacing={10}
        >
            <HStack spacing={0} justify={'center'}>
                <Center>
                    <Heading>{pollname}</Heading>
                </Center>
                <Button
                    left={320}
                    bg={'#164fd7'}
                    onClick={onOpen}
                >Add Option</Button>
            </HStack>
            <Wrap spacing={10} p={10} direction='column' bg={'blackAlpha.400'} borderRadius={10} overflowY={'auto'} minH={'auto'} maxHeight={'70%'}>
                {(option.length===0)?
                (<Heading color={'red'}>No options Availiable to vote</Heading>):option
                }
            </Wrap>

            <HStack spacing={40}>
            <Button colorScheme='green' isDisabled={selectedid == 0} onClick={
                async () => {
                    await Cast_Vote({ id: selectedid });
                    toast({
                        title: 'Voted',
                        description: `We have recieved your vote.`,
                        duration: 3000, 
                        position: 'bottom-right',
                        variant: 'left-accent',
                        status: 'success',
                        isClosable: true,
                    })
                }   
            }>
                Vote
            </Button>
            <Button colorScheme='red' isDisabled={selectedid == 0} onClick={
                () => {
                    set_selected(0);
                }   
            }>
                Clear Selction
            </Button>

            </HStack>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent bg={'gray.800'} color={'white'}>
                    <ModalHeader>Add Option</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >
                    <AddForm onClose={onClose} id={id} desc='option' fetch={setchanged}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </VStack>

    );
}

export default Vote;
