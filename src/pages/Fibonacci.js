import { fibonacci } from '../functions.js';
import React, { useState } from 'react'

export function Fibonacci() {
    const [number, setNumber] = useState(null)
    function handleChange(e) {
        setNumber(+e.target.value)
    }
    return (
        <><div>
            <input onChange={handleChange} type="number"></input>
        </div><div>
                {fibonacci(number)}
            </div></>
    )
}