// code based on this example: https://thisinterestsme.com/google-maps-api-location-picker-example/

var map;
var marker = null;

function initMap() {
    getClientLocation().then(function (location) {
        const options = {
            center: location,
            zoom: 16
        };
        const map = new google.maps.Map(document.getElementById('map'), options);

        google.maps.event.addListener(map, 'click', function (event) {

            var clickedLocation = event.latLng;

            if (marker === null) {
                marker = new google.maps.Marker({
                    position: clickedLocation,
                    map: map,
                    draggable: true
                });

                google.maps.event.addListener(marker, 'dragend', function (event) {
                    markerLocation();
                });
            } else {
                marker.setPosition(clickedLocation);
            }

            markerLocation();
        });
    });
}

function getClientLocation() {
    const locationPromise = new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                resolve({ lat, lng });
            });
        } else {
            resolve({ lat: 31.230622586859802, lng: 29.94980034438808 });
        }
    });
    return locationPromise;   
}

function markerLocation() {
    var currentLocation = marker.getPosition();
    const lat = currentLocation.lat();
    const lng = currentLocation.lng();

    document.getElementById('lat').value = lat;
    document.getElementById('lng').value = lng;
    reverseGeocode(lat, lng);
}

function reverseGeocode(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } })
        .then((response) => {
            if (response.results[0]) {
                document.getElementById('address').value = response.results[0].formatted_address;
            }
        });
}
