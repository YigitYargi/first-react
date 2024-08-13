
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from "react";

export default function EditProfilePage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const genderOptions = ["Male", "Female", "Other"];
  const {id} = useParams();
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  
  //const [ userInfo, setUserInfo ] = useState(null);

  useEffect(() => {

  
    fetch('http://localhost:4000/profile', {
      credentials:'include',
      method: 'GET',
        })
    .then(response => {
      response.json().then(userInfo => {
        setEmail(userInfo.email);
        setUsername(userInfo.username);
        setCity(userInfo.city);
        setCountry(userInfo.country);
        setGender(userInfo.gender);
        setPhoto(userInfo.photo);
      });

    }) ;

}, [] );


  
async function updateProfile(ev) {
  ev.preventDefault();
  
  const data = new FormData();
  
  
   data.set('city',city);
   data.set('country',country);
   data.set('gender',gender);
   data.set('username',username);
   data.set('email',email);
  
 


  const response = await fetch('http://localhost:4000/profile', {
  
  method:'PUT',
  body:JSON.stringify({email,username,city,country,gender}),
  credentials:'include',
  headers: { 'Content-Type': 'application/json' },

});
  

if(response.ok ) {
  
  navigate('/profilepage');
    //setRedirect(true);
   
   }
  
   
  }


  async function editPhoto(ev) {
    ev.preventDefault();
    
    if (!photo) {
      console.error('Photo is not defined');
      return;
    }
    
    const data = new FormData();
      data.set('photo', photo[0]); 
   
  
  
    await fetch('http://localhost:4000/profile', {
    
    method:'POST',
    body:data,
    credentials:'include',
  
  
  });
    
     
    }





  return (
    <form onSubmit={updateProfile}>
      <h1>Profile</h1>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(ev) => setCity(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(ev) => setCountry(ev.target.value)}
      />
      <label>
        Gender:
        <select value={gender} onChange={(ev) => setGender(ev.target.value)}>
          <option value="" disabled>Select gender</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {/* Input for selecting profile image */}
    
    <input
      type="file"
      
      onChange={(ev) => {
        setPhoto(ev.target.files[0]);
        editPhoto(ev); // Trigger editPhoto function when a photo is selected
      }}
    />
      <button type="submit">Update</button>
    </form>
  );
}