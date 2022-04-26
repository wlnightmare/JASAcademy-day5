import React, {useState, useEffect} from "react";
import { Button } from "@mui/material";

// export class Counter extends React.Component {
//     constructor() {
//         super()
//         this.state={
//             count: null
//         }
//     }
//     interval = null
    
//     startCountDown = () => {

//         clearInterval(this.interval);
//         this.setState({
//             count: 60
//         })

//         this.interval = setInterval(()=>{
//             console.log(this.state.count)
//             if( this.state.count > 0){
//                 this.setState(
//                     {
//                         count: this.state.count - 1,
//                     }
//                 )}
//             else {
//                 clearInterval(this.interval)
//             } 
//         }, 1000)
//     }
     
//     componentWillUnmount(){
//         clearInterval(this.interval)
//     }

//     render() {
//         return (
//             <>
//             <Button onClick={this.startCountDown}>Start</Button>
//             {this.state?.count}
//             <br />
//             </>
//         )
//     }
// }
const a = [1,3,4,56,8,9]
export const Counter = () => {
    
    const [count, setCount] = useState(60)
    const [number, setNumber] = useState(null)
    const [binary, setBinary] = useState("")
    let interval = null
    
    useEffect( () => {
        startCountDown()
        return ()=>{
            clearInterval(interval)
        }
    },[count])
    
    const startCountDown =()=> {
        clearInterval(interval)
        interval = setInterval(()=> {
            console.log(count)
            if(count > 0){
                setCount(count-1)
            }else {
                clearInterval(interval)
            }
        }, 1000)
    }
    function toBinary(number){
        if(number == 0) {
            return (0).toString()
        }
        else {
            return ((number % 2) + 10 *
            toBinary(Math.floor(number / 2))).toString()  
        }
    }

    function handleChange(e) {
        setNumber(+e.target.value)
    }
    
    function handleBinary(e){
        setBinary(+e.target.value)
    }

    function toDecimal(binary){
        if(binary === ""){
            return 0
        }
        else {
            return (
                (binary % 10) + (2*toDecimal(Math.floor(binary / 10))) 
            )
        }
    }
    function findIndex(value, arr){
        if(!Array.isArray(arr)) return "It's not array"
        const newArr = [...arr]
        for( let i=0; i<newArr.length; i++){
            if(newArr[i] === value){
                return i
            }
        }
    }
    function binarySearch(value,arr){
        if(!Array.isArray(arr)) return "It's not array"
        let l = 0
        let r = arr.length - 1
        
        while(l<=r){
            let mid = Math.floor((l + r)/2)
            if (arr[mid]===value){
                return mid
            }
            if (arr[mid] > value){
                r = mid - 1
            }
            if (arr[mid] < value){
                l = mid + 1
            }
        }
    }
    function bubbleSort(arr){
        for(let i=0; i<arr.length-1; i++){
            for(let j=0; j<arr.length-i-1; j++){
                if(arr[j]>arr[j+1]){
                    const temp = arr[j]
                    arr[j] = arr[j+1]
                    arr[j+1]= temp
                }
            }
        }
    }
        function quickSort(arr){
            if(arr.length <= 2) return arr
            // let pivot = Math.floor(Math.random()*arr.length)
            const pivot = arr[0]
            const left=[]
            const right = []
            for(let i=1; i< arr.length; i++){
                if(arr[i]> pivot){
                    right.push(arr[i])
                }
                else{
                    left.push(arr[i])
                }
            }
            return [...quickSort(left),pivot,...quickSort(right)]

        }
        function ceasarCipher(str, step){
            step = step % 26 //filter crazy number like 150 and so one
            if(str==='' || step === 0) return "Write some text or add a step"
            let result=""
            const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
            let newStr = str.toLowerCase()
            for (let i=0; i < newStr.length; i++){
                let letter = newStr[i]
                if(letter === ' '){
                    result += letter
                }
                let indexOfLetter = alphabet.indexOf(letter)
                let newIndex = indexOfLetter + step
                if(newIndex > 25) newIndex = newIndex - 26 //step =27
                if(newIndex < 0) newIndex = newIndex + 26 // step -24
                if(str[i]===str[i].toUpperCase()){
                    result += alphabet[newIndex].toUpperCase()
                }
                else result +=alphabet[newIndex]

            }
            return result
        }

        function towers(arr){
            let firstT = arr[0]
            let count = 0
            for(let i=1; i< arr.length; i++){
                if(arr[i] > firstT){
                    count++
                    firstT = arr[i]
                }
            }
            return count
        }


  return (
    <>
        <Button onClick={startCountDown}>Start</Button>
        {count}
        <br />
        <div style={{ 
            display:'flex', 
            alignContent:'center', 
            justifyContent:'center'
        }}>
            {a.reduce((previousValue, currentValue)=>previousValue+currentValue)}
        </div>
        <div>
        <div>
            <input onChange={handleChange} type="number"></input>
        </div><div>
                "Its binary"
                {toBinary(number)}
            </div>

            <div>
            <input onChange={handleBinary} type="number"></input>
        </div>
            <div>
                "Its decimal"
                {toDecimal(binary)}
            </div>
        </div>
        {findIndex}
    </>
  )
}
