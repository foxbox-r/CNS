import React,{useState,useCallback} from 'react';
import {backAddress} from "../backAddress"
import {useDispatch,useSelector} from "react-redux";
import {REMOVE_IMAGE_REQUEST} from "../modules/postReducer"

function ImageForm({images}){
    const dispatch = useDispatch();
    const [nowIndex,setNowIndex] = useState(0);
    
    const onClick = useCallback((e)=>{
        e.stopPropagation();
        const nextIndex = (nowIndex+1)%images.length;
        setNowIndex(nextIndex);
    },[nowIndex,images]);

    const onRemove = useCallback((e)=>{
        let nextIndex = -1;
        console.log(nowIndex,images.length-1);
        if(nowIndex === images.length-1){
            nextIndex = nowIndex-1;
        }
        dispatch({
            type:REMOVE_IMAGE_REQUEST,
            data:nowIndex,
        });
        if(nextIndex != -1){
            setNowIndex(nextIndex);
        }
    },[images,nowIndex]);

    return (
        <div className="ImageForm">
            <div className="imgBox">
                <img src={`${backAddress}/${images[nowIndex]}`} alt=""/>
                <input onClick={onRemove} type="button" value="remove"/>
                <p>{`${nowIndex+1}/${images.length}`}</p>
            </div>
            {images.length > 1 && <input onClick={onClick} type="button" value="Next"/>}
        </div>
    )
}

export default ImageForm;