import { PhoneIcon, AddIcon, WarningIcon, CloseIcon, MinusIcon, CheckIcon } from '@chakra-ui/icons'
import { FaBeer } from 'react-icons/fa';
import { BsChevronRight } from "react-icons/bs";
import { createSearchParams, useNavigate } from "react-router-dom";


import { Heading, Text, WrapItem, ArrowRightIcon, HStack, } from '@chakra-ui/react'
function Card({ title,id,isteam,iscreator}) {
    const navigate=useNavigate();
    return (
        <WrapItem
        >
            <HStack
            bg={'rgb(124, 223, 198);'}
            color={'rgb(26, 24, 25);'}
            pl={10}
            pt={50}
            pb={50}
            pr={0}
            spacing={2}
            onClick={()=>
                {
            if(isteam===true)
            navigate(
                '/app/polls',
                { 
                state: {
                    id,
                    iscreator,
                }
            }
            )
            else navigate(
                '/app/vote',
                { 
                state: {
                    id,
                    title,
                    iscreator,
                }
            }
            )
        
        }}
            shadow='md'
            _hover={{
                cursor:'pointer',
            }}
            align='center'
            justify='space-between'
            borderRadius={10}
            >
                <Heading>{title}</Heading>
                <BsChevronRight style={{width:'50px',height:'35px'}}/>
            </HStack>
        </WrapItem>
    )
}
export default Card;