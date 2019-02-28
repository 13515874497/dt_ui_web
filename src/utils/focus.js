
export default (Vue)=>{
  Vue.directive("focus",{
    inserted:function(el){
      el.children[0].focus()
    }
  })
}
