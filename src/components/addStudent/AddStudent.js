import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateStudent, removeMessageError } from '../../redux/studentSlice';
import { ToastContainer, toast } from 'react-toastify'

export default function AddStudent() {
    const dispatch = useDispatch();
    const [student, setStudent] = useState({ "name": "", "city": "", "birth": "", "xepHang": "EXCELLENT" })
    const { message, status, error } = useSelector(state => state.student);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'birth') {
            setStudent(prevStudent => ({
                ...prevStudent,
                [name]: formatDate(value)
            }));
        } else {
            setStudent(prevStudent => ({
                ...prevStudent,
                [name]: value
            }));
        }
    };
    useEffect(() => {
        if (status) {
            if (status === 200) {

                toast.success(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } else {
                error&&error.map(item=>toast.error(item, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }))
                
            }
            dispatch(removeMessageError())
        }
    }, [message, status]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchCreateStudent(student));
    }
    const formatDate = (birth) => {
        const [year, month, day] = birth.split("-");
        return `${day}-${month}-${year}`;
    }
    useEffect(()=>{
        if(status === 200){
            window.alert("ADD STUDENT SUCCESSFULLY !!!")
        }
    },[message, status])
    return (
        <Container>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                    <Label for="namest">
                        ADD STUDENT
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label for="namest">
                        Name
                    </Label>
                    <Input
                        id="namest"
                        name="name"
                        value={student.name}
                        placeholder="Please enter your name here !"
                        type="text"
                        
                        onChange={(e) => handleChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="cityst">
                        City
                    </Label>
                    <Input
                        id="cityst"
                        name="city"
                        value={student.city}
                        placeholder="Please enter your city here !"
                        type="text"
                        onChange={(e) => handleChange(e)}
                        
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="datest">
                        BirthDay
                    </Label>
                    {error &&
                        <Alert color="danger">
                            {message} {error.map(item => item)}
                        </Alert>
                    }
                    <Input
                        id="datest"
                        name="birth"
                        value={formatDate(student.birth)}
                        placeholder="date placeholder"
                        type="date"
                        onChange={(e) => handleChange(e)}
                        
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="rankst">
                        Ranks
                    </Label>
                    <Input
                        id="rankst"
                        name="xepHang"
                        value={student.xepHang}
                        type="select"
                        onChange={(e) => handleChange(e)}
                        
                    >
                        <option>
                            EXCELLENT
                        </option>
                        <option>
                            GOOD
                        </option>
                        <option>
                            AVERAGE
                        </option>
                        <option>
                            WEAK
                        </option>
                    </Input>
                </FormGroup>
                <Button type='submit'>Create</Button>
            </Form>
        </Container>
    )
}
