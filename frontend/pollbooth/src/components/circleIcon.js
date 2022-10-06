import { Icon, createIcon } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { useState } from 'react';
function CircleIcon(props){
  const [iv,set_iv]=useState(false);
    return (
    <button style={{
    backgroundColor: props.color,
  border: 0,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width:20,
  height:20,
  padding: 0,
    }} onMouseOver={()=>set_iv(true)} onMouseLeave={()=>set_iv(false)}>
        {iv==true?props.icon:''}
    </button>
    )
}
export default CircleIcon;