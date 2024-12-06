<script lang="ts">
    import { onMount } from 'svelte';

    let map;

    onMount(() => {
        // Load the Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ7LHfqJbOenpkqmduiUjhwNSL9L3Duhk`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            // Initialize the map
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 49.610014, lng: 20.703700 }, // Coordinates for Nowy Sącz
                zoom: 17
            });
        };
        document.head.appendChild(script);
    });
</script>

<style>
    #map {
        height: 50vh;
        width: 50vh;
        border-radius: 15px; /* Add this line to give rounded corners */
    }
</style>

<div id="map"></div>