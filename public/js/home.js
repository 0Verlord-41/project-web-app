
export const findLocation = (input) => {
    try {
      if(/Chandigarh/i.test(input)){
        window.setTimeout(()=>{
          location.assign('/over');
        }, 500);
      }
    } catch (err) {
      console.log('Error');
    }
}