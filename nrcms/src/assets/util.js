let formDate=(el)=>{
  let e=Number(el+'000')
  let date = new Date(e);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes();
  return Y+M+D+h+m;
}
export default formDate;