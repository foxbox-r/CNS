import React,{useCallback,useEffect,useState} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {backAddress} from "../backAddress"
import {ZOOM_IMAGE_OUT_REQUEST} from "../modules/postReducer"

function ZoomImg(){
    const dispatch = useDispatch();
    const {zoomImg,zoomStatus} = useSelector(state=>state.postReducer);
    
    const [nowIndex,setNowIndex] = useState(0);

    const onClick = useCallback((e)=>{
        dispatch({
            type:ZOOM_IMAGE_OUT_REQUEST,
        });
    },[]);

    const onClickImg = useCallback((e)=>{
        e.stopPropagation(); // 버블링 막기
        const nextIndex = (nowIndex+1)%zoomImg.length;
        console.log(nextIndex);
        setNowIndex(nextIndex);
    },[nowIndex,zoomImg]);

    useEffect(()=>{
        setNowIndex(0);
    },[zoomStatus])

    return (
        <div onClick={onClick} style={{display:zoomStatus}} id="ZoomImg">
            <article>
                <img title="Click to next" onClick={onClickImg} src={`${backAddress}/${zoomImg[nowIndex]}`} alt=""/>
                <p style={{color:"white"}}>{nowIndex+1}/{zoomImg.length}</p>
            </article>
        </div>
    )
}

export default ZoomImg;