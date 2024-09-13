import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { removeMessageError, updateStudent } from '../../redux/studentSlice';
import { ToastContainer, toast } from 'react-toastify'
export default function UpdateStudent(props) {
    const { student, error } = props
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch()
    const {message, status}= useSelector(state=>state.student)
    const [student1, setStudent] = useState({ "name": student.name, "city": student.city, "birth": student.birth, "xepHang": student.xepHang })
    const handleChange = (e)=>{
        const {name, value} = e.target; 
        if(name === 'birth'){
            setStudent(prevStudent => ({
                ...prevStudent,
                [name]: formatDate(value)
            }));
        }else{
            setStudent(prevStudent => ({
                ...prevStudent,
                [name]: value
            }));
        }
    };
    const formatDate = (birth)=>{
        const [year, month, day] = birth.split("-");
        return `${day}-${month}-${year}`;
    }
    const handleSubmit = (e, id)=>{
        e.preventDefault();
        dispatch(updateStudent({st:student1, id:id}));
    }
    useEffect(() => {
        if (status) {
            if (status === 200) {
                setModal(false)
            }
            dispatch(removeMessageError())
        }
    }, [message]);
    const toggle = ()=>{
        setModal(!modal)
    }
    return (
        <div>
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
            <Button color="success" onClick={() => setModal(!modal)}>Update</Button>
            <div>
                <Modal isOpen={modal} toggle={toggle} size='xl'>
                    <ModalHeader>Modal title</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="namest">
                                    UPDATE STUDENT
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label for="namest">
                                    Name
                                </Label>
                                <Input
                                    id="namest"
                                    name="name"
                                    value={student1.name}
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
                                    value={student1.city}
                                    placeholder="Please enter your city here !"
                                    type="text"
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="datest">
                                    BirthDay
                                </Label>
                                <Input
                                    id="datest"
                                    name="birth"
                                    value={formatDate(student1.birth)}
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
                                    value={student1.xepHang}
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
                            <Button type='submit' onClick={(e) => {handleSubmit(e, student.id)}}>Update</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}
