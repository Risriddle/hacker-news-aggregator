import axios from 'axios'


const BASE_URL="http://localhost:8000/api"
const api=axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})



api.interceptors.request.use((config)=>{
    const authToken=localStorage.getItem('token')
    if(authToken){
        config.headers.Authorization=`Bearer ${authToken}`
    }
    return config
})



api.interceptors.response.use(
    (response)=>response,
   async (error)=>{
        const originalRequest=error.config
        if(error.response.status==401 && !originalRequest._retry){
            originalRequest._retry=true;
            try{
                const res = await axios.post(
                'http://localhost:8000/api/auth/refresh',
                {},
                { withCredentials:true }
                )
                const newAccessToken=res.data.accessToken

                localStorage.setItem('token',newAccessToken)
                originalRequest.headers.Authorization=`Bearer ${newAccessToken}`

                return api(originalRequest)

            }
            catch(error){
                  localStorage.removeItem('token')
                  window.location.href='/login'
            }
        }
        return Promise.reject(error);
    }
)



export default api;