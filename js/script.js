// definir variaveis
var map;
var infoWindow;
var request;
var service;
var markers = [];

/**
 * funcao para iniciar o mapa
 */
function initialize() {
    var center = new google.maps.LatLng(37.422, -122.084058);

    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
    });

    request = {
        location: center,
        radius: 8047,
        types: ['cafe']
    };

    infoWindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

    google.maps.event.addListener(map, 'rightclick', function(event) {
        map.setCenter(event.LatLng)
        clearResults(markers)

        var request = {
            location: event.latLng,
            radius: 8047,
            types: ['cafe']
        };

        service.nearbySearch(request, callback);
    });
}// end initialize()

/**
 * Funcao para marcar no mapa.
 * @param results
 * @param status
 */
function callback(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK){
        for(var i = 0; i < results.length; i++){
            markers.push(createMarker(results[i]));
        }// end for
    }// end if
}// end callback()

/**
 * Marca no mapa.
 * @param place
 */
function createMarker(place) {
    var placeLoc = place.geometry.location;

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    // quando clica no marcador mostra o nome do lugar
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });

    return marker;
}// end createMarker()

function clearResults(markers) {
    for(var m in markers){
        markers[m].setMap(null)
    }// end for

    markers = []
}// end clearResults()

google.maps.event.addDomListener(window, 'load', initialize);