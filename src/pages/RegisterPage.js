import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Navigate} from "react-router-dom";

export default function RegisterPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState('');
    
    const [redirect, setRedirect] = useState(false);
    const genderOptions = ["Male", "Female", "Other"];
   
    const navigate = useNavigate();


    async function register(ev) {
ev.preventDefault();


const response = await fetch('http://localhost:4000/register' , { 
    method:'POST',
    body: JSON.stringify({email,password,username,city,country,gender}),
    headers:{'Content-Type':'application/json'},
})
 if(response.status === 200) {
alert('Registration succesful'); 
//navigate("/setup-profile");
setRedirect(true);

}
else {
    alert('Registration failed ');
}  

}
    
if(redirect) {

    return <Navigate to={'/'} />
}


    return(

        <form className="register" onSubmit={register}>
        <h1>Register</h1>
        
        <input type ="text" placeholder ="email" value={email}
        onChange={ev => setEmail(ev.target.value)} />
        
        <input type ="password" placeholder ="password" value={password}
        onChange={ev => setPassword(ev.target.value)}/>
        

        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={ev => setCity(ev.target.value)}
      />

      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={ev => setCountry(ev.target.value)}
      />

      <label className="gender-label">
        Gender:
        <select value={gender} onChange={ev => setGender(ev.target.value)}>
          <option value="" disabled>Select gender</option>
          {genderOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>


      <button type="submit" class="submit-button">Register</button>
       
        </form>
        
    );
}

