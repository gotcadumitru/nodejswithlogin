import React, { useState } from 'react';
import './forminput.css';
import isShowImg from '../../assets/images/auth/OchiDeschis.png'
import isNotShowImg from '../../assets/images/auth/Ochinchis.png'
import { ErrorMessage, getIn } from 'formik';

const FormInput = ({label,type, field, form,...otherProps})=>{
    // debugger
    const [isPasswordShow, handlePassword] = useState(false);
    let inputType
    if(type==="password"){
        if(isPasswordShow){
            inputType="text"
        }else{
            inputType="password"
        }
    }else{
        inputType=type;
    }

    return (
        <div className={`group_input`}>
            <div className="input_name">{otherProps.inputname}</div>
            {inputType==="textarea" ?
            <textarea {...field} rows="5" cols="50"  type={ inputType } className={`custom_scrollbar textarea_input`} placeholder={label} {...otherProps} style={getStyles(form, field.name)}/>
            : <input {...field} type={ inputType } className={`form_input`} placeholder={label} {...otherProps} style={getStyles(form, field.name)}/>
            }
            <span>
            {otherProps.forpassword && <img onClick={(e)=>{handlePassword(!isPasswordShow)}} className="field_icon" src={ isPasswordShow ? isShowImg : isNotShowImg } alt="pass" />}
            </span>
            <ErrorMessage name={field.name} component="div" className="error_message"/>
            </div>
    )
};

function getStyles(form, fieldName) {
    const findError=getIn(form.errors, fieldName)
    const findTouch= getIn(form.touched,fieldName)
    if (findError&&findTouch) {
      return {
        border: '1px solid red'
      }
    }
  }
  
export default FormInput