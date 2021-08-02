import React, { useState } from "react";
import {EyeOpen, EyeSlashed} from 'akar-icons';

export default function usePasswordToggle(){
    const [visible, setVisiblity] = useState(false)

    const Icon = visible ?  <EyeSlashed color="#6CAAE3" onClick={() => setVisiblity(!visible)}/> : <EyeOpen color="#6CAAE3" onClick={() => setVisiblity(!visible)}/>

    const InputType = visible ? "text" : "password";

    return [InputType, Icon]
}