// LOCAL PROTOTYPE ONLY: stored in this browser, not shared. Replace with REST calls (e.g. Spring Boot) later.
const K="reviews_local_prototype";
export const getReviews=async()=>{try{return JSON.parse(localStorage.getItem(K))||[]}catch{return[]}};
export const addReview=async r=>{const all=await getReviews();all.unshift({...r,id:Date.now(),date:new Date().toISOString()});localStorage.setItem(K,JSON.stringify(all))};
