import React,{useCallback,useState,useEffect} from 'react';
import useInput from "../hooks/useInput"
import {useDispatch,useSelector} from "react-redux"
import {SIGN_UP_REQUEST} from "../modules/userReducer"
import withRouter from "with-router"

function Signup({history}){

    const dispatch = useDispatch();
    const {signUpDone,signUpLoading,signUpError,me} = useSelector(state=>state.userReducer);
    const [mail,setMail,onChangeMail] = useInput("");
    const [password,setPassword,onChangePassword] = useInput("");
    const [passwordCheck,setPasswordCheck,onChangePasswordCheck] = useInput("");
    const [name,setName,onChangeName] = useInput("");
    const [color,setColor,onChangeColor] = useInput("#ffffff");
    const [backgroundColor,setBackgroundColor,onChangeBackgroundColor] = useInput("#000000");

    const [isSame,setIsSame] = useState(false);
    const [isAgree,setIsAgree] = useState(false);

    const onChangeIsAgree = useCallback((e)=>{
        setIsAgree((prev)=>!prev);
    },[]);

    const onComparePassword = useCallback((e)=>{
        onChangePasswordCheck(e);
        if(password === e.target.value){
            setIsSame(true);
        } else{
            setIsSame(false);
        }
    },[password,passwordCheck]);

    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        if(isSame && isAgree){
            // console.log(mail,password,name)
           dispatch({
               type:SIGN_UP_REQUEST,
               data:{
                   mail,password,name,color,backgroundColor,
               }
           })
        } else{
            if(!isSame)
                alert("패스워드를 다시 확인해주세요.");
            if(!isAgree)
                alert("동의하셔야 회원가입을 할 수 있습니다.");
        }
        
    },[mail,password,name,isSame,isAgree]);

    useEffect(()=>{
        if(signUpDone){
            history.push("/");
        }
    },[signUpDone]);

    useEffect(()=>{
        if(me){
            history.push("/");
        }
    },[me])

    useEffect(()=>{
        if(signUpError){
            alert(signUpError);
        }
    },[signUpError]);

    return (
        <div id="Signup">
            <h1>Signup</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <p>Mail</p>
                    <input type="text" placeholder="Insert you mail." value={mail} onChange={onChangeMail}/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="text" placeholder="Insert you password." value={password} onChange={onChangePassword}/>
                </div>
                <div>
                    <p>Check password {isSame?<span className="goodSpan"> Same!</span>:<span className="badSpan"> Not Same.</span>}</p>
                    <input type="text" placeholder="Insert you check password." value={passwordCheck} onChange={onComparePassword}/>
                </div>
                <div>
                    <p>Name</p>
                    <input type="text" placeholder="Insert you name." value={name} onChange={onChangeName}/>
                </div>
                <div>
                    <p>Color</p>
                    <input type="color" value={color} onChange={onChangeColor}/>
                </div>
                <div>
                    <p>Background Color</p>
                    <input type="color" value={backgroundColor} onChange={onChangeBackgroundColor}/>
                </div>
                <div className="checkBoxWrapper">
                    <p>Do you agree?</p>
                    <input id="Signup_check_agree" type="checkbox" value={isAgree} onChange={onChangeIsAgree} />
                    {isAgree
                        ?<label htmlFor="Signup_check_agree"><span className="goodSpan">Yes, I agree.</span></label>
                        :<label htmlFor="Signup_check_agree"><span className="badSpan">No, I don't agree.</span></label>
                    }
                    </div>
                <div>
                    <input type="submit" value={signUpLoading?"loading...":"Submit"}></input>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Signup);