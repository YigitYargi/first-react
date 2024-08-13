import { useContext, useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const genderOptions = ["Male", "Female", "Other"];
  const {id} = useParams();
  //const [ userInfo, setUserInfo ] = useState(null);

  useEffect(() => {

  
    fetch('http://localhost:4000/profile', {
      credentials:'include',
      
        })
    .then(response => {
      response.json().then(userInfo => {
        setEmail(userInfo.email);
        setUsername(userInfo.username);
        setCity(userInfo.city);
        setCountry(userInfo.country);
        setGender(userInfo.gender);
        setUserInfo(userInfo);
      });

    }) ;

}, [] );

  return (
    

  <div className="profilepage">
      
      <h2>Profile Setup</h2>
     
      <div className="author">by @{ userInfo.country}</div>

      </div>
    
   
    
  
    );
}
