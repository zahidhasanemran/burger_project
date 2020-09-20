import React from 'react';
import classes from './Input.module.css'

const Input = (props) => {

    let inputEl = null;
    let inputClass = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClass.push(classes.invalid)
    }

    switch (props.elementType) {

        case ('textarea'):
            inputEl = <texarea className={classes.InputElement} {...props.elementConfig} value={props.vlaue} />
            break;

        case ('select'):
            inputEl = <select className={inputClass.join(' ')} value={props.vlaue} onChange={props.changed}>
                {props.elementConfig.options.map(option => {
                    return <option value={option.value} key={option.value}>
                        {option.displayValue}
                    </option>
                })}
            </select>
            break;
    
        case ('input'):
            inputEl = <input className={inputClass.join(' ')} type="text" {...props.elementConfig} value={props.vlaue}  onChange={props.changed}/>
            break;
    
        default:
            inputEl = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.vlaue}  onChange={props.changed}/>
            break;
        
    }

    return (
        <div>
            <label className={classes.Label} htmlFor="">{props.label}</label>
            {inputEl}
        </div>
    );
};

export default Input;