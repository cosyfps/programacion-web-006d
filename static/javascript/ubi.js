function iniciarMap(){
    var coord = {lat:-33.36344 ,lng: -70.6781852};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 15,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}

// falra verificar con la credencial que solicita google maps para usarla sin problemas 