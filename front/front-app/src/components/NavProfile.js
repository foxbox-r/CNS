import React,{useCallback} from 'react';
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom"
import useInput from "../hooks/useInput"
import {LOG_IN_REQUEST,LOG_OUT_REQUEST} from "../modules/userReducer"

function NavProfile(){
    const dispatch = useDispatch();
    const {me}  = useSelector(state=>state.userReducer);

    const [mail,setMail,onChangeMail] = useInput("");
    const [password,setPassword,onChangePassword] = useInput("");

    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        console.log(mail,password);
        setMail("");
        setPassword("");
        dispatch({
            type:LOG_IN_REQUEST,
            data:{mail,password}
        })
    },[mail,password])

    const onLogOut = useCallback(()=>{
        dispatch({
            type:LOG_OUT_REQUEST
        })
    },[])

    

    if(me){
        return (
            <div id="NavProfile_profile" className="NavProfile">
                <header>
                    <div style={{color:me.color,backgroundColor:me.backgroundColor}}>{me.name[0].toUpperCase()}</div>
                </header>
                <article>
                    <div className="nameBox">{me.name}</div>
                    <div className="numberBox">
                        <div>Subscriber : {me.Clients.length}</div>
                        <div>posts : {me.Posts.length}</div>
                    </div>
                </article>
                <footer>
                    <button onClick={onLogOut}>logout</button>
                </footer>
            </div>
        )
    }else{
        return (
            <div id="NavProfile_login" className="NavProfile">
                <form onSubmit={onSubmit}>
                    <header>
                        <h1>Login</h1>
                    </header>
                    <article>
                        <div>
                            <p>Mail</p>
                            <input type="text" value={mail} placeholder="Insert you mail." onChange={onChangeMail}/>
                        </div>
                        
                        <div>
                            <p>Password</p>
                            <input type="password" value={password}  placeholder="Insert you password." onChange={onChangePassword}/>
                        </div>
                    </article>

                    <footer>
                        <div className="button">
                            <button type="submit">Login</button>
                        </div>
                        <div className="button">
                            <Link to="/signup">
                                <button>Signup</button>
                            </Link>
                        </div>
                    </footer>
                </form>
            </div>
        )
    }

}

export default NavProfile;