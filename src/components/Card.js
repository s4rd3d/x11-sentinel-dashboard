function Card({ title, value }) {
  let className = '';
  if (value === 'online') className = 'text-green';
  else if (value === 'offline') className = 'text-red';

  return (
    <div className='card'>
      <h3> {title} </h3>
      <h2 className={className}> {value} </h2>
    </div>
  )
}

export default Card;
