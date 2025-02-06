import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function List() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    const api = 'https://samplebackend-h3xa.onrender.com/api/get-users'
    axios.get(api).then((res)=>{
      setData(res.data.users)
    })
  },[])

  const handelDelete = (id) => {
      const api = 'https://samplebackend-h3xa.onrender.com/api/delete-user/'+id
        axios.delete(api).then((response) => {
            if(response.status === 200){
                alert("Deleted successfully.")
                window.location.href='/list';
            }            
        });
  }

  return (
    <div className="App">
      <div style={{width:"100%",float:'right'}}><Link to="/signup" ><button>Add</button></Link></div>
      <br />
      <br />
      <table align='center' border={1} cellSpacing={0} width={1000}>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      
      {
        data && data.map((ele,i)=>{
          return(
            <tr key={i}>
              <td>{i+1}</td>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td><Link to={`/edituser/${ele._id}`}><button className="btn btn-warning">Edit</button></Link> |                      
              <button className="btn btn-danger" onClick={()=>handelDelete(ele._id)}>Delete</button></td>    
            </tr>
            
          )
        })
      }
      </table>
    </div>
  );
}