import Box from "@mui/material/Box";
import {Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {CLOSE_MODAL} from "../../store/actions/shopActions";
import {useForm, Controller} from "react-hook-form";
import {validateComment, validateEmail, validateName, validatePhoneNumber} from "../../utils/validation";
import {getFieldState} from "../../utils/getFieldState";


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const OrderFormModal = () => {
    const open = useSelector((state) => state.shop.modalOpen)
    const dispatch = useDispatch()
    const {handleSubmit, control, reset} = useForm({
        mode: "onChange",
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            city: null
        }
    })
    const handleClose = useCallback(() => {
        dispatch({type: CLOSE_MODAL})
    }, [dispatch])

    const onSubmit = useCallback((values) => {
        alert('SUBMIT')
        console.log(values)
        dispatch({ type: CLOSE_MODAL })
        reset()
    }, [dispatch, reset])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography variant="h5">Complete Form</Typography>
                <form style={{marginTop: '10px'}} onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{mb: 2}}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: 'Required field',
                                validate: (value)=>{
                                    if(validateName(value)){
                                        return true
                                    }
                                    else {
                                        return "Invalid name"
                                    }
                                }
                            }}
                            render={({field, fieldState, formState}) => (
                                <TextField id="outlined-basic" label="Name"
                                           {...getFieldState({ fieldState, formState })}
                                           variant="outlined" {...field} />
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{mb: 2}} required>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: 'Required field',
                                validate: (value) => {
                                    if (validatePhoneNumber(value)) {
                                        return true;
                                    } else {
                                        return 'Invalid phone number'
                                    }
                                }
                            }}
                            render={({field, formState, fieldState}) => (
                                <TextField id="outlined-basic"
                                           label="Phone number"
                                           variant="outlined"
                                           {...getFieldState({ fieldState, formState })}
                                           {...field}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{mb: 2}}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if(validateEmail(value)){
                                        return true;
                                    }else{
                                        return "Incorrect email"
                                    }
                                }
                            }}
                            render={({field, formState, fieldState}) => (
                                <TextField id="outlined-basic"
                                           label="e-mail"
                                           variant="outlined"
                                           {...getFieldState({formState,fieldState})}
                                           {...field}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{mb: 2}}>
                        <Controller
                            name="comment"
                            control={control}
                            rules={{
                                required: false,
                                validate: (value)=>{
                                    if(validateComment(value)){
                                        return true;
                                    }else{
                                        return "Minimum 10 characters"
                                    }
                                }
                            }}
                            render={({field, formState, fieldState}) => (
                                <TextField id="outlined-basic"
                                           label="Write your comment"
                                           variant="outlined"
                                           {...getFieldState({formState,fieldState})}
                                           {...field}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{mb: 2}}>
                        <InputLabel id="demo-simple-select-label">Город</InputLabel>
                        <Controller
                            name="city"
                            control={control}
                            rules = {{
                                required: false,
                            }}
                            render={({field}) => (
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Город"
                                    {...field}
                                >
                                    <MenuItem value={10}>Астана</MenuItem>
                                    <MenuItem value={20}>Алматы</MenuItem>
                                    <MenuItem value={30}>Шымкент</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                    <Button variant="contained" type="submit">Отправить</Button>
                </form>
            </Box>
        </Modal>
    )
}