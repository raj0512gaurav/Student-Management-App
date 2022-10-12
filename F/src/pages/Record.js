import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import './Record.css'

const Record = () => {

    const[data,setData] = useState([]);
    const [filtereddata, setFiltereddata] = useState([]);
    const [updt,setUpdt] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:5000/students').then((res) => {
            setData(res.data);
        })
    },[]);

    const deleterow = (id) => {
        axios.post(`http://localhost:5000/delete/${id}`).then((res) => {
            alert("Row deleted")
        })
        axios.get('http://localhost:5000/students').then((res) => {
            setData(res.data);
        })
    }
    const updaterow = (cg,id) => {
        axios.post(`http://localhost:5000/update/${id}`,{
            CurrentCGPA : cg
        }).then((res) => {
            alert("Row Updated")
        })
        axios.get('http://localhost:5000/students').then((res) => {
            setData(res.data);
        })
        setUpdt(!updt)
    }

    const handlesearch = (e) => {
        const word = e.target.value;
        console.log(word);
        const newarr = data.filter((item) => {
          return item.RegistrationNumber
            .trim()
            .toLowerCase()
            .includes(word.trim().toLowerCase());
        });
        console.log(newarr);
        if (word === "") {
          setFiltereddata([]);
        } else {
          setFiltereddata(newarr);
        }
        console.log(filtereddata);
    };


  return (
        <div className='container my-3'>
            <form>
                <input className="form-control me-2" type="search" placeholder="Search Record By Registration Number" id='searchInput' onChange={(e) => handlesearch(e)}/>
            </form>
            <h3>All Students</h3>  
            <table class='table table-striped table-responsive table-bordered' id='record'>
                <thead class="table-dark">    
                    <tr>
                        <th>Registration Number</th>
                        <th>Student Name</th>
                        <th>DOB</th>
                        <th>Email ID</th>
                        <th>Department</th>
                        <th>Current CGPA</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtereddata.length!==0 ? 
                        (
                            <>
                            {
                            filtereddata.map((index) => {
                            return(
                                <>
                                <tr key={index.RegistrationNumber}>
                                <td>{index.RegistrationNumber}</td>
                                <td>{index.StudentName}</td>
                                <td>{index.DOB}</td>
                                <td>{index.EmailId}</td>
                                <td>{index.Department}</td>
                                {updt ? 
                                <input onChange={(e) => setUpdt(e.target.value)}/>
                                :
                                <td>{index.CurrentCGPA}</td>}
                                    <td>
                                    {
                                        !updt ? 
                                        <>
                                        <button id='actionCol' type='submit' class="btn btn-warning" onClick={() => setUpdt(!updt)}><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button type='submit' class="btn btn-danger" onClick={() => deleterow(index.RegistrationNumber)}><i class="fa-solid fa-trash-can"></i></button>
                                        </>
                                        :
                                        <>
                                        <button id='actionCol' type='submit' class="btn btn-warning" onClick={() => updaterow(updt,index.RegistrationNumber)}>submit</button>
                                        
                                        <button type='submit' class="btn btn-danger" onClick={() => deleterow(index.RegistrationNumber)}><i class="fa-solid fa-trash-can"></i></button>
                                        </>
                                    }
                                    </td>
                                </tr>
                                </>
                            )
                        })
                    }
                    </>
                    ) 
                        : 
                        (
                            <>
                                                {
                        data.map((index) => {
                            return(
                                <>
                                <tr key={index.RegistrationNumber}>
                                <td>{index.RegistrationNumber}</td>
                                <td>{index.StudentName}</td>
                                <td>{index.DOB}</td>
                                <td>{index.EmailId}</td>
                                <td>{index.Department}</td>
                                {updt ? 
                                <input onChange={(e) => setUpdt(e.target.value)}/>
                                :
                                <td>{index.CurrentCGPA}</td>}
                                    <td id='actionCol'>
                                    {
                                        !updt ? 
                                        <>
                                        <button id='actionCol' type='submit' class="btn btn-warning" onClick={() => setUpdt(!updt)}><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button type='submit' class="btn btn-danger" onClick={() => deleterow(index.RegistrationNumber)}><i class="fa-solid fa-trash-can"></i></button>
                                        </>
                                        :
                                        <>
                                        <button id='actionCol' type='submit' class="btn btn-warning" onClick={() => updaterow(updt,index.RegistrationNumber)}>submit</button>
                                    
                                        <button type='submit' class="btn btn-danger" onClick={() => deleterow(index.RegistrationNumber)}><i class="fa-solid fa-trash-can"></i></button>
                                        </>
                                    }
                                    </td>
                                </tr>
                                </>
                            )
                        })
                    }
                            </>
                        )
                    }
                </tbody>
            </table>
        </div>
  )
}
<script src="https://kit.fontawesome.com/c7f48f1945.js" crossorigin="anonymous"></script>

export default Record