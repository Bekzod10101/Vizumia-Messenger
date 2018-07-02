
function initMap(){
  var element = document.getElementById('map');
  var options = {
    zoom: 15,
        disableDefaultUI: true,
    center: {lat: 41.26465, lng: 69.21627}

  };

  var myMap = new google.maps.Map(element, options);

    var markers = [
        {
            coordinates: {lat: 41.26465, lng: 69.21627},
            path: google.maps.SymbolPath.CIRCLE,
            image : {
                url:  "../img/member8.jpg",
                scaledSize: new google.maps.Size(32, 32),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            id: 1
        },

        {
            coordinates: {lat: 41.16465, lng: 69.11627},
            image : {
                url:  "../img/member7.jpg",
                scaledSize: new google.maps.Size(32, 32),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0, 0)
            },
            id: 2
        }
    ];

    for(var i = 0; i < markers.length; i++){
        addMarker(markers[i]);
    }

    function addMarker(properties){
        var marker = new google.maps.Marker({
            position: properties.coordinates,
            map: myMap,
            store_id: properties.id
        });
        if($(window).width() < 620){
            marker.addListener('click', function(){
                $('.user_item').hide(200);
                $('.user_item[data-user-popup=' + marker.get('store_id') + ']').show();
            });
        }
        if(properties.image){
            marker.setIcon(properties.image);
        }
        
    }  
}


document.querySelectorAll('img.svg').forEach(function(img){
    var imgID = img.id;
    var imgClass = img.className;
    var imgURL = img.src;

    fetch(imgURL).then(function(response) {
        return response.text();
    }).then(function(text){

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text, "text/xml");

        // Get the SVG tag, ignore the rest
        var svg = xmlDoc.getElementsByTagName('svg')[0];

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            svg.setAttribute('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            svg.setAttribute('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        svg.removeAttribute('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
            svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
        }

        // Replace image with new SVG
        img.parentNode.replaceChild(svg, img);

    });

});