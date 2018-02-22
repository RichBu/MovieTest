
// java script file for restaurant locator

//Global Variables to define distance from theater, map and infowindow that pops up on user click function

/*
var configData = {
    theaterSearchDist: 2 * 1609.34,
    restaurantSearchDist: 2 * 1609.34
}
*/
var map;
var infowindow;
var testTheater;

//Initial Function to Load Map
function initMap() {
    //Using Coordinates for Music Box Theater. 
    //This would be coordinates of theater pulled in from user selection
    testTheater = { lat: 41.9499, lng: -87.6638 };

    //Map Options
    map = new google.maps.Map(document.getElementById('map'), {
        center: testTheater,
        zoom: 15,
        //Custom Styles for Map Background
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8ec3b9"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1a3646"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#64779e"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#334e87"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#283d6a"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6f9ba5"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3C7680"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#304a7d"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2c6675"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#255763"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#b0d5ce"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#283d6a"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3a4762"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#0e1626"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#4e6d70"
                    }
                ]
            }
        ]
    });

    //Add Theater Marker
    var theaterIcon = {
        //Variable to add in Custom Image of Movie theater
        url: "assets/images/movie.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    }; var marker = new google.maps.Marker({
        position: testTheater,
        map: map,
        icon: theaterIcon
    });

    //Info Window for Theater Marker
    var infoWindow = new google.maps.InfoWindow({
        content: '<h2>Movie Theater</h2>'
    });

    //Event Listener for Theater Marker
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    })

    //Function to run Nearby Search
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: testTheater,
        radius: configData.restaurantSearchDist,
        type: ['restaurant'],
        rankBy: google.maps.places.RankBy.PROMINENCE
    }, callback);
}

//For Loop to Create Markers for all Restaurants pulled in by Nearby Search
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

//Add Markers for all Restaurants pulled in on Nearby Search
function createMarker(place) {
    //Variable to Define and Resize Icon Image based on Google Places Type, e.g. restaurant
    var icon = {
        url: "assets/images/plate.png", // url
        scaledSize: new google.maps.Size(30, 30), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: icon,
    },
    );
    console.log(place.icon);

    google.maps.event.addListener(marker, 'click', function () {
        console.log(place);

        var request = {
            placeId: place.place_id
        };
        console.log(request.placeId);
        service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);

        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                createMarker(place);
                console.log(place);
                if (place.price_level === 1) {
                    place.price_level = "Inexpensive";
                } else if (place.price_level === 2) {
                    place.price_level = "Moderate";
                } else if (place.price_level === 3) {
                    place.price_level = "Expensive";
                } else if (place.price_level === 4) {
                    place.price_level = "Very Expensive";
                };

                var directionsURL = 'https://www.google.com/maps/dir/?api=1&origin=' + testTheater.lat + ', ' + testTheater.lng + '&destination=' + place.formatted_address + '&travelmode=driving';

                var urlString = '<div><strong>' + place.name + '</strong><br>' + '<br>' + '<strong><a href="' + place.website;
                urlString += '"target="_blank">Website</a></strong>' + '<p><strong>Address: </strong>' + place.formatted_address + '</p>';
                urlString += '<p><strong>Open Now: </strong>' + place.opening_hours.open_now + '</p>' + '<p><strong>Phone: </strong>' + place.formatted_phone_number + '</p>';
                urlString += '<p><strong>Rating: </strong>' + place.rating + '</p>' + '<p><strong>Price level: </strong>' + place.price_level + '</p>';
                urlString += '<strong><a href="' + directionsURL + '"target="_blank">Directions from Theater to Restaurant</a></stong>' + '</div>';
                infowindow.setContent(urlString);

            }
        }

        infowindow.open(map, this);

    });
}
