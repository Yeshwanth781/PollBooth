import { Text } from "@chakra-ui/react";

function f1(){
    setTimeout(() => {
        console.log("second-10");
      }, 10000)
}
 function f2(){
    setTimeout(() => {
        console.log("third-15");
      }, 5000)
}
function f() {
    console.log("First");
    f1();
    f2();
    console.log('fourth');
}
function Test() {
    f();
    return <Text>Hello react</Text>
}
export default Test;