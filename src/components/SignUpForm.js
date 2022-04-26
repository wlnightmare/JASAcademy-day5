import {Button, styled, TextField} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";


const Form = styled('form')`
  display: flex;
  flex-direction: column;
`
export function SignUpForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function validateForm (e) {
        e.preventDefault();

        checkCorrectPassword(password)

        if (cPassword !== password) {
            return setError("PASSWORDS ARE NOT MATCH!")
        }

        const data = {
            email,
            password,
        }
        try {
            setError("")
            setLoading(true)
            await sendUserData(data)
        } catch {
            setError("Failed to create an account")   
        }
        setLoading(false)
        // onSuccess(data)
    }
    function checkCorrectPassword(password){
        const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/
        if (password.length <8){
            alert("short pass")
            return
        }
        if (!password.match(pattern)){
            alert("Pass should contain at least 1 number or symbyl or uppercase char or lowercase")
            return
        }

        return false
    }

    function sendUserData(userData) {
        axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGYEWNnzeEfTTTsFwHe3UzeDNBw72y-oM`,
            {
                email: userData.email,
                password: userData.password,
                returnSecureToken: true 
            }
        )
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log({...error})
            alert(`User not registered. Error message: ${error.response.data.error.message}`)
        })
    }



    return (
        <Form onSubmit={validateForm}>
            <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small" type="email" label="Email" placeholder="Enter email" required
            />
            <br />
            <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small" type="text" label="Password" placeholder="Enter password" required />
            <br />
            <TextField
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                size="small" type="text" label="Confirm Password" placeholder="Enter password" required />
            <br />
            <Button disabled={loading} type="submit" variant="contained">Sign Up</Button>
        </Form>
    )
}