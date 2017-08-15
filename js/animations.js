window.onload = function(){
  var nav_links = document.querySelectorAll('#app nav label');
  for(var i = 0; i < nav_links.length; i++){
    var nav_link = nav_links[i];
    nav_link.addEventListener('focus', function(e){
      var current = e.currentTarget;
      current.addEventListener('keydown', function(ev){
        if(ev.keyCode === 32 || ev.keyCode === 13){
          ev.currentTarget.click();
        }
      });
    });
  }

}