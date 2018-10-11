export default (Vue) => {
    Vue.directive('imgerror', {
        inserted: function (el, binding, vnode, oldVnode) {
            el.addEventListener('error',function(e){
                console.log(e)
            },false)
            // let styleEl = getComputedStyle(el, null)
          }
    });

    let clTime
    Vue.directive('dacusClick',{
      componentUpdated: function (el, binding, vnode, oldVnode) {
        /*if(true) {
          el.disabled = true
          clTime = setTimeout(()=>{
            el.disabled = false
          },1000)
        }*/
      }
    })


    

}

