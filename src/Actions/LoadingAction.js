export const CheckLoading=(loadingStatus)=>{
    console.log(loadingStatus)
    return {
        type:"CHECK_LOADING",
        loadingStatus
    }
}