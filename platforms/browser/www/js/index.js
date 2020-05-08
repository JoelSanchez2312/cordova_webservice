function consultar(){
  nombre = $('#txtNombre').val();
  alert(nombre);
  
  var API_KEY = '16214558-f6b970016255961287754d201';
  var dir = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(nombre);
  //let dir = 'https://pixabay.com/api/?key=16214558-f6b970016255961287754d201&q='+nombre;

  $.ajax({
      url:dir,
        error:function(err){
        alert("El pokemon no fue encontrado");
        console.log(err);
      },
      beforeSend:function(){
           $("#divCargando").show();
      }

  }).done(function(data){
      $("#divCargando").hide ();
      console.log('Dentro del json')
      const api = new XMLHttpRequest();
      api.open('GET',dir, true);
      api.send();
      api.onreadystatechange = function(){
      $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
          if(this.readyState == 4 && this.status == 200){
              let datos = JSON.parse(this.responseText);
              console.log(datos.hits);
              //$.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
              let resultado = document.querySelector('#resultado');
              resultado.innerHTML = '';
              for(let item of datos.hits){
                console.log(item.previewURL);
                //$.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
                
                resultado.innerHTML += `<a class="black-text" href="${(item.pageURL)}" data-size="1600x1067"><img class="img-fluid" src="${(item.previewURL)}" class="img-fluid"/><h5 class="text-center my-3">Tags:${(item.tags)}</h5><h5 class="text-center my-3">Type:${(item.type)}</h5><h5 class="text-center my-3">Author:${(item.user)}</h5></a>`;
                //document.getElementById('previewURL').src = datos[i].hits.previewURL;
             }
          }
      }
  });

}