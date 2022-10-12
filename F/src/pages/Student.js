import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Student.css'

const Student = () => {

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [dept, setDept] = useState('');
    const [reg, setReg] = useState('');
    const [cg, setCg] = useState('');

    const navigate = useNavigate();

    const handleclick = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/upload",{
            RegistrationNumber : reg,
            StudentName : name,
            DOB : date,
            EmailId : email,
            Department : dept,
            CurrentCGPA : cg
        }).then((res) => {
            // alert("Data inserted");
            console.log(res.data);
        })
        setName('')
        setDate('')
        setEmail('')
        setDept('')
        setReg('')
        setCg('')
        
        navigate('/record')
    }

    return (
        <div class="container my-3">
            <h1 class="my-3">Student Record</h1>
            <form id="studentForm">
                <div class="row mb-3">
                    <label for="studentName" class="col-sm-2 col-form-label">Student Name</label>
                    <div class="col-sm-10">
                        <input type="text"
                            class="form-control"
                            id="studentName"
                            placeholder="Enter full name of the student"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="dob" class="col-sm-2 col-form-label">DOB</label>
                    <div class="col-sm-10">
                        <input
                            type='date'
                            onfocus="(this.type='date')"
                            class="form-control"
                            placeholder="Date"
                            id="dob"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="emailId" class="col-sm-2 col-form-label">Email ID</label>
                    <div class="col-sm-10">
                        <input
                            type="email"
                            class="form-control"
                            id="emailId"
                            placeholder="Enter email of the student"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <fieldset class="row mb-3">
                    <legend class="col-form-label col-sm-2 pt-0">Department</legend>
                    <div class="col-sm-10">
                        <div className='dropdown'>
                                <select
                                class="form-select" aria-label="Default select example"
                                onChange = {(e) => setDept(e.target.value)}
                                value={dept}
                                >
                                    <option selected>--select your department--</option>
                                    <option>CSE</option>
                                    <option>ECE</option>
                                    <option>MME</option>
                                </select>
                        </div>
                    </div>       
                </fieldset>
                <div class="row mb-3">
                    <label for="registrationNumber" class="col-sm-2 col-form-label">Registration Number</label>
                    <div class="col-sm-10">
                        <input
                        type="text"
                        class="form-control"
                        id="registrationNumber"
                        placeholder="eg-19UG5022"
                        value={reg}
                        onChange={(e) => setReg(e.target.value)}    
                        />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="cgpa" class="col-sm-2 col-form-label">Current CGPA</label>
                    <div class="col-sm-10">
                        <input
                        type="text"
                        class="form-control"
                        id="cgpa"
                        value={cg}
                        placeholder="Enter current CGPA of the student"
                        onChange={(e) => setCg(e.target.value)}
                        />
                    </div>
                </div>
                <button 
                type="submit"
                class="btn btn-primary"
                onClick={handleclick}
                >Add Student</button>
            </form>
        </div>
    )
}

export default Student