import { factorial } from '../functions.js';
import React, { useState } from 'react'

export function Factorial() {
    const [number, setNumber] = useState(null)
    function handleChange(e) {
        setNumber(+e.target.value)
    }
    return (
        <><div>
            <input onChange={handleChange} type="number"></input>
        </div><div>
                {factorial(number)}
            </div></>
    )
}
