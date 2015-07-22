<?php
/*
Plugin Name: Easy Smart Map
Plugin URI: http://prowpexpert.com
Description: This is Easy smart google map wordpress plugin. Really the map looking awesome and easy to use. By using [easygmap] shortcode use the map every where post, page and template.
Author: Md Jahed
Version: 1.0
Author URI: http://prowpexpert.com/
*/
function jeba_wp_latest_jquery_map() {
	wp_enqueue_script('jquery');
}
add_action('init', 'jeba_wp_latest_jquery_map');

function plugin_function_jeba_map() {

    wp_enqueue_script( 'jeba-map-js', plugins_url( '/js/script.js', __FILE__ ), true);
    wp_enqueue_script( 'jeba-map-jss', plugins_url( '/js/scripts.js', __FILE__ ), true);
    wp_enqueue_script( 'jeba-maps-js', plugins_url( '/js/needs.js', __FILE__ ), true);
    wp_enqueue_script( 'jeba-gmap-js', plugins_url( '/js/nivo-lightbox.min.js', __FILE__ ), true);
    wp_enqueue_script( 'jeba-g-map', plugins_url( '/js/main.js', __FILE__ ), true);
	
	wp_enqueue_style( 'jeba-css-gmap', plugins_url( '/js/jeba-gmap.css', __FILE__ ));
	
}

add_action('wp_head','plugin_function_jeba_map');

function jeba_script_gmap_function () {?>
	<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
<?php
}
add_action('wp_head','jeba_script_gmap_function');

function jeba_shortcode_with_attributes( $atts, $content = null  ) {
 
    extract( shortcode_atts( array(
        'location' => '',
        'text' => 'Here write description about location<br/> Here can be use HTML tag for line break or linking',
        'zoom' => '13',
        'type' => 'HYBRID',
        'width' => '100%',
        'height' => '500px'		
    ), $atts ) );
 
    return '
		
	<div id="map">
		<div class="banding"></div>
		<div id="map-container" data-text="'.$text.'" data-location="'.$location.'" data-zoom="'.$zoom.'" data-mapType="'.$type.'"></div>
		<div class="banding"></div>
	</div>

<style>
#map #map-container {
   width: '.$width.';
   height: '.$height.';
}
</style>
	

    ';
}   
add_shortcode('jeba_gmap', 'jeba_shortcode_with_attributes');

add_action ( 'wp_head', 'js_vars' ); 
function js_vars(){ ?>
		<script type="text/javascript">
			var wp_plugin_dir = <?php echo json_encode (plugins_url()); ?>;
			
		</script> 
	<?php 
}
?>