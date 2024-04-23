import loader from '../../assets/loader2.gif'
import './Loader.scss'

const Loader = () => {
  return (
    <div className='loader'>
      <img src={loader} alt="Loading" />
    </div>
  )
}

export default Loader
