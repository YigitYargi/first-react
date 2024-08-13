import { useContext, useState } from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../UserContext";


export default function LoginPage() {

   
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);


    async function login(ev) {
        ev.preventDefault();
      
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
      
        if (response.ok) {
          // Fetch user details after successful login
          const userInfoResponse = await fetch('http://localhost:4000/profile', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
      
          if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            setUserInfo(userInfo);
            setRedirect(true);
          } else {
            // Handle error if needed
            console.error('Failed to fetch user info');
          }
        } else {
          // Handle login error if needed
          console.error('Login failed');
          alert('Login failed'); 
        }
      }
      

if(redirect) {

    return <Navigate to={'/'} />
}

return(
<body className="background-page" 
>



<form className="login"  onSubmit={login}>
<h1 classname = "headerlogin" style={{ color: 'white',marginTop: '-15px' }}>Login</h1>

<div className="input-container">
  <input
    className="loginmail"
    style={{ color: 'black' }}
    type="text"
    placeholder="email"
    value={email}
    onChange={(ev) => setEmail(ev.target.value)}
    
 />
  
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 my-icon"
    style={{ color: '#999', width: '20px', height: '20px', marginRight: '115px', marginTop: '-7px', position:"absolute",right:'-65px'}}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>

  <input type ="password"  
   className="loginpass" 
   placeholder ="password" value={password}
onChange={ev => setPassword(ev.target.value)}

/>
<svg 
xmlns="http://www.w3.org/2000/svg" 
fill="none" viewBox="0 0 24 24" 
strokeWidth={1.5} 
stroke="currentColor" 
className="w-6 h-6"
style={{ color: '#999', width: '20px', height: '20px', marginRight: '115px', marginTop: '15px', position:"absolute",right:'-65px'}}
>


  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>

</div>


<button className="loginbutton" style={{ color: '#FFFFFF', position: 'relative', top: '65px' }}>Login</button>

</form>

</body>

);


}