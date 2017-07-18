import * as React from 'react';
import { isFunction } from 'lodash';

function Buttons(props: any) {
  const { func1, func2, id, name1, name2, mod1='', mod2='' } = props;
  const className1 = `btn${mod1}`;
  const className2 = `btn${mod2}`;
  return (
    <div className='btn--container'>
    
     <div
      className={className1}
      onClick={() => {isFunction(func1) && func1()}}
      >
      {props.name1}
    </div>
    <div
      className={className2}
      onClick={() => {isFunction(func2) && func2(id)}}> {props.name2}
    </div>

    </div>
  )
}

export default Buttons;
