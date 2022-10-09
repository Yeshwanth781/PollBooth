import {
    FormControl,
    FormLabel,
    Input,
    useToast,
    Button,
    HStack,
    Divider,
    VStack,
} from '@chakra-ui/react'
import Card from '../card/card';
import { Add_Option, Add_Poll, Add_Team,Get_Members,Add_Member } from '../../fetchData';
import { useEffect, useState } from 'react';
import { Membercard } from '../card/memberCard';

export default function DrawerForm({id}) {
    const toast = useToast();
    const [isLoading, setLoading] = useState(false);
    const [members,setmembers]=useState([]);
    const [email, setemail] = useState('');
    const [changed,setchanged]=useState('');
    useEffect(()=>{
        Get_Members({id,setmembers})
        if(changed!==''){
            const x=changed.status;
            toast(
                {
                    status: x,
                   title:changed.messege,
                }
            )
        }
        setLoading(false);
},[changed])
    const temp=members.map((item)=>{
        return(
        <Membercard userid={item.userid}/>)
    })
    return (
        <div>
            <FormControl>
                <FormLabel>User email</FormLabel>
                <Input placeholder={`Name`} onChange={(event) => {
                    setemail(event.target.value)
                }} value={email} />
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
                            await Add_Member({ email,setchanged,id});

                    }}
                >
                Add
                </Button>
            </HStack>
            <Divider w={'100%'} pt={5} borderColor='pink'/>
            <VStack pt={5} spacing={5}>
                {temp}
            </VStack>
        </div>
    )
}