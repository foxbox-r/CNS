import React,{useState} from 'react';

function useInput(init=""){
    const [text,setText] = useState(init);
    const onChangeText = (e)=>{
        setText(e.target.value);
    }
    return [text,setText,onChangeText];
}

export default useInput;