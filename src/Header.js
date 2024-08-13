import {Link} from "react-router-dom";
import { useEffect, useState,useContext,useRef} from "react";
import { UserContext } from "./UserContext";
import user from "./images/user.png";
import edit from "./images/edit.png";
import inbox from "./images/envelope.png";
import settings from "./images/settings.png";
import help from "./images/question.png";
import logouty from "./images/log-out.png";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


function DropdownItem(props) {
  return (
    <li className="dropdownItem" onClick={props.onClick}>
      <img src={props.img} alt={props.text} />
      <span>{props.text}</span>
    </li>
  );
}

export default function Header() {
  
 
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');

  
  const {setUserInfo,userInfo} = useContext(UserContext);
  const navigate = useNavigate();
  const{id} = useParams();


  useEffect(() => {

    fetch('http://localhost:4000/profile', {
credentials:'include',

    }) .then(response => { response.json().then(userInfo => {
      
           setUserInfo(userInfo);

    });

  });

  }, []);
  
  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
      .then(() => {
        setUserInfo(null);
        navigate('/'); // Redirect to the home page after logout
      })
      .catch(error => {
        console.error("Logout error:", error);
        // Handle error if needed
      });
  }




  const email = userInfo?.email;
const username = userInfo?.username;
const city= userInfo?.city;
//const { email, username } = userInfo || {};
//console.log(email, username);


const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handler);
  
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);
  


  return (
        <header> 
        
        <Link to="/" className="logo">
  <img 
    src={require("./images/logo.png")} 
    alt="MyBlog" 
    style={{ width: '100px', height: '100px', margin: '0', padding: '0' }}
  />
</Link>
      <nav>
      {email  && (
 <>
<Link to="/create">Create new post</Link>

 <a onClick={logout}>Logout</a>

 <a>
 
 <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={user}></img>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
        <h3>{username}<br/><span></span></h3>

         
         
          <ul>
          <DropdownItem img = {user} text = "My Profile" onClick={() => navigate('/profilepage')}   />
          <DropdownItem img = {edit} text = "Edit Profile" onClick={() => navigate(`/editprofilepage`)}/>
            <DropdownItem img = {inbox} text = {"Inbox"}/>
            <DropdownItem img = {settings} text = {"Settings"}/>
            <DropdownItem img = {help} text = {"Helps"}/>
            <DropdownItem img={logouty} text="Logout" onClick={logout} />
         
         
          </ul>
        </div>
      </div>
    </div>

     
 
 
 </a>

 </>

      )}

{!email && (
 <>
<Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/setup-profile">ProfileSet</Link>
 </>

      )}  
      
       </nav>
     
       
     
       </header>
    
    
    );
    
    
    
  
    
  }