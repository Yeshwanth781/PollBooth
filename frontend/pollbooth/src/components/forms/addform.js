import {
    FormControl,
    FormLabel,
    Input,
    useToast,
    Button,
    HStack,
} from '@chakra-ui/react'
import { Add_Option,Add_Poll,Add_Team } from '../../fetchData';
import { useState } from 'react';

export default function AddForm({ onClose, id ,desc}) {
    const toast = useToast();
    const [isLoading, setLoading] = useState(false);
    const [optionname, setoptionname] = useState('');
    return (
        <div>
            <FormControl>
                <FormLabel>{desc} Name</FormLabel>
                <Input placeholder={`${desc} Name`} onChange={(event) => {
                    setoptionname(event.target.value)
                }} value={optionname} />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>{desc==='option'?'Manifesto':'Description'}</FormLabel>
                <Input placeholder={desc==='option'?'Brief Manifesto':'Description'} />
            </FormControl>
            <HStack
                pt={10}
                align='center'
                justify={'center'}
                spacing={100}
            >
                <Button colorScheme='blue' mr={3} isLoading={isLoading}
                    onClick={async () => {
                        if(desc==='option')
                        await Add_Option({ id, optionname: optionname })
                        else if(desc==='poll')await Add_Poll({id,pollname:optionname})
                        else await Add_Team({id,teamname:optionname})
                        toast(
                            {
                                status: 'success',
                                title: `${desc} Added Successfully...`,
                            }
                        ) 
                    }}
                >
                    Save
                </Button>
                <Button bg={'red.300'} onClick={onClose}>Cancel</Button>
            </HStack>
        </div>
    )
}