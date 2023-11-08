import * as React from 'react';


export default function Checkboxfield(props) {

    return (
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value={props.value} id="flexCheckChecked" onChange={props.onChange} />
            <label class="form-check-label" for="flexCheckChecked">
                {props.label}
            </label>
        </div>
    );
}