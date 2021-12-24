import axios from 'axios';
import { showAlert } from './alerts';

export const signitup = async (name,email,password,passwordConfirm)=>{
    try{
        console.log(name,email,password,passwordConfirm);
        const res=await axios({
            method:'POST',
            url:'/api/v1/users/signup',
            data:{
                name,
                email,
                password,
                passwordConfirm
            }
        }) 
        if(res.data.status==='success'){
            showAlert('success', 'Signed up successfully!');
            window.setTimeout(()=>{
                location.assign('/login');
                },1000)
        }
    }
    catch(err){
        showAlert('provide with correct details','try again');
        // console.log(err);
    }
}