import axios from 'axios';

import BaseURL from '../../config';


const PayButton =({reservationDetails})=>{
    const id = localStorage.getItem("userId")
    const handleCheckout =() =>{
axios.post(`${BaseURL}payment/create-checkout-session`,{
    reservationDetails,
  id
}).then((res)=>{
    if(res.data.url){
        window.location.href = res.data.url
    }
}).catch((err)=>{
    console.log(err.message);
})
    }
    return(
<>
<button onClick={()=>handleCheckout()}> CheckOut</button>
</>
    )
}
export default PayButton;