// Import TitileTypeTwo CSS.....................
import './TitileTypeTwo.css'

// Import Victor Image.....................
import victor from '../../assets/victor.png'


export default function TitileTypeTwo({ClassName, Title}) {
  return (
    <div className={`titleTypeTwo ${ClassName}` }>
        <h2>{Title}</h2>
        <img src={victor} alt="" className='victor'/>
   </div>
  )
}
