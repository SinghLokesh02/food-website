import { useState } from "react";
import { LOGO } from "../utils/constant";
const Navbar = () =>{

  let [data,setData] = useState("Login")

  let changeState = ()=>{
    let ans = (data === "Logout"?"Login":"Logout");
    setData(ans)
  }
    return (
      <nav>
        <img src= {LOGO} alt="logo" />
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <button onClick={changeState} className="btn-login">{data} </button>

        </ul>
      </nav>
    )
  }

export default Navbar;