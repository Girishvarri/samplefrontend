import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Edit() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  let params = useParams('id');
  let edit_userid = params.id; // get id from url

  
  useEffect(() => {
    let api = 'https://samplebackend-h3xa.onrender.com/api/get-single-user/'+edit_userid
      axios.get(api).then((response) => {
          setData(response.data.response);            
      });
    },[edit_userid]);


  const handleUpdate = (event) => {
    event.preventDefault();
    const api = 'https://samplebackend-h3xa.onrender.com/api/update-user/'+edit_userid
        axios.put(api,data).then((response) => {
            if(response.status === 200){
              alert("Updated successfully.")
              window.location.href='/list';
            }                        
        });
  };

  return (
    <div className="App">
      <br />
      <form onSubmit={handleUpdate}>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) =>
              setData({...data, name: e.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={(e) =>
              setData({...data, email: e.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) =>
              setData({...data, password: e.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}