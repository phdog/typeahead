import * as React from 'react';

function Buttons(props: any) {
  const { func1, func2, id, name1, name2, mod1, mod2 } = props;
  const className1 = mod1 ? `btn${mod1}` : 'btn'
  const className2 = mod2 ? `btn${mod2}` : 'btn'
  return (
    <div className='btn--container'>
    { func1 ? <div
      className={className1}
      onClick={() => {func1()}}> {props.name1}
    </div> :
    <div
      className={className1}> {props.name1}
    </div> }
    { func2 ? <div
      className={className2}
      onClick={() => {func2(id)}}> {props.name2}
    </div> :
    <div
      className={className2}> {props.name2}
    </div> }

    </div>
  )
}

export default Buttons;
