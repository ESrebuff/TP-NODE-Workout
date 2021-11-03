mapboxgl.accessToken = 'pk.eyJ1IjoiYXpvcml1IiwiYSI6ImNrdmFzaG9rcjNiYm8yb2xwOGp2eWx3cmEifQ.YIXQLLKUZaLcSfcD3vdVxA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [3.876716, 43.610769], // starting position
    zoom: 13
});

fetch('./data.json')
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                //////////////////
                for (const feature of data.features) {
                    let name = 'Pas de nom défini'
                    let sport = 'Pas de sport défini'
                    if(feature.properties.name != null) {
                        name = feature.properties.name
                    }
                    if(feature.properties.sport != null) {
                        sport = feature.properties.sport
                    }
                    const el = document.createElement('div');
                    el.className = 'marker';
                    new mapboxgl.Marker(el)
                        .setLngLat(feature.geometry.coordinates)
                        .setPopup(
                            new mapboxgl.Popup({
                                offset: 25
                            }) // add popups
                            .setHTML(
                                `<h3>${name}</h3><p>${sport}</p>`
                            )
                        )
                        .addTo(map);
                }
                //////////////////
            })
        } else {
            console.log("ERREUR")
        }
    })