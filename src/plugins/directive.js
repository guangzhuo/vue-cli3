export default (Vue) => {
    Vue.directive('imgerror', {
        inserted: function (el, binding, vnode, oldVnode) {
            el.addEventListener('error',function(e){
                console.log(e)
            },false)
            // let styleEl = getComputedStyle(el, null)
          }
    });

    

}

