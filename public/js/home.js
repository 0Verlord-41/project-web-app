
export const findLocation = (input) => {
    try {
      if(/Chandigarh/i.test(input)){
        window.setTimeout(()=>{
          location.assign('/over');
        }, 1000);
      }
    } catch (err) {
      console.log('Error');
    }
}