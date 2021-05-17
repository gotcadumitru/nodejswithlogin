import React from 'react';
import './CustomButton.css';

const CustomButton = ({children,inverted, profilebtn,yellowbtn, whitebtn,searchbtn,...otherProps})=>{
    return (
        <button className={`customButton ${profilebtn ? "profilebtn" : ''} ${whitebtn ? "whitebtn" : ''} ${yellowbtn ? "yellowbtn" : ''} ${searchbtn ? "searchbtn" : ''}`}{...otherProps}>
           <span>
           {children }

           </span> 
        </button>
    );
}
export default CustomButton;







