import * as React from 'react';

function Buttons(props: any) {
  const { func1, func2, id, name1, name2, mod } = props;
  const className = mod ? `btn${mod}` : 'btn'
  return (
    <div className='btn--container'>
      <div
        className={className}
        onClick={() => {func1()}}> {props.name1}
      </div>
      <div
        className={className}
        onClick={() => {func2(id)}}> {props.name2}
      </div>
    </div>
  )
}

export default Buttons;
