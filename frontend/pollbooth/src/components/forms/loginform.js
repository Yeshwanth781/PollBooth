import {
    useToast,
    Button,
    HStack,
    Heading,
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
import { Add_Option, Add_Poll, Add_Team, Login } from '../../fetchData';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from "react-router-dom";
import SignupForm from './signupform';
export default function LoginForm() {
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [details, setdetails] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const mclose = () => {
        onClose();
    }
    useEffect(() => {
        console.log('from useeffect', details);
        if (details.length !== 0) {
            toast(
                {
                    status: 'success',
                    variant: 'left-accent',
                    position: 'bottom-right',
                    title: `Welcome to Macarena,Get Ready to be Hackedd :)${details}`,
                    isClosable: true,
                }
            )
            navigate(
                '/app/teams',
                {
                    state: {
                        id: parseInt(details[0]['id']),
                        name: details[0]['name'],
                    }
                }
            )
            setLoading(false);
        } else if (isLoading == true) {
            toast(
                {
                    status: 'error',
                    variant: 'left-accent',
                    position: 'bottom-right',
                    title: `Please Check your credentials or try signing up :)${details}`,
                    isClosable: true,
                }
            )
            setLoading(false);
        }
    }, [details]);
    return (
        <div>
            <Heading color={'pink.400'} textAlign='center' pb={10} pt={0}>Login</Heading>
            <FormControl>
                <FormLabel color={'white'}>User Name</FormLabel>
                <Input placeholder={'username'} onChange={(event) => {
                    setemail(event.target.value)
                }} value={email} color='blue.200' />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel color={'white'}>password</FormLabel>
                <Input placeholder='password' type={'password'} color='blue.200' onChange={(event) => {
                    setpassword(event.target.value)
                }} value={password} />
            </FormControl>
            <HStack
                pt={10}
                align='center'
                justify={'center'}
                spacing={100}
            >
                <Button colorScheme='blue' mr={3} isLoading={isLoading}
                    onClick={async () => {
                        setLoading(true)
                        await Login({ email, password, setdetails });
                        console.log("details", details);
                    }}
                >
                    Login
                </Button>
                <Button colorScheme={'blue'} onClick={onOpen}>Signup</Button>
                <Modal
                    isOpen={isOpen}
                    onClose={mclose}
                >
                    <ModalOverlay />
                    <ModalContent bg={'gray.800'} color={'white'}>
                        <ModalHeader alignSelf={'center'} fontSize={30}>Signup</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6} >
                            <SignupForm onClose={mclose} id={1} desc='Team' />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </HStack>
        </div>
    )
}