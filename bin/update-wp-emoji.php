<?php
/**
 * Loop into Twemojis to build an svg sprite sheet.
 */
$emoji_all = file_get_contents( dirname( dirname( __FILE__ ) ) . '/node_modules/emoji-datasource/emoji.json' );
$emoji_all = json_decode( $emoji_all );
$emojis_wordpress = '<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' . "\n";
$emojis_wordpress .= '<defs>' . "\n";
$wp_list_emoji = array();

function emoji_sort( $a, $b ) {
	return (int) $b->sort_order < (int) $a->sort_order;
}

uasort( $emoji_all, 'emoji_sort' );

foreach ( $emoji_all as $emoji ) {
	if ( ! isset( $emoji->has_img_twitter ) || ! $emoji->has_img_twitter ) {
		continue;
	}

	if ( isset( $emoji->image ) && $emoji->image ) {
		$image_file = str_replace( '.png', '.svg', $emoji->image );
		$wordpress_svg = file_get_contents( 'https://s.w.org/images/core/emoji/12.0.0-1/svg/' . $image_file );

		if ( false !== $wordpress_svg && 0 === strpos( $wordpress_svg, '<svg' ) ) {
			$symbol = str_replace(
				array( '<svg xmlns="http://www.w3.org/2000/svg"', '</svg>' ),
				array( '<symbol id="' . $emoji->unified . '" data-shortname ="' . $emoji->short_name .  '" data-shortnames="' .implode( ' ', $emoji->short_names ) .'" data-category="' . htmlspecialchars( $emoji->category ) . '"', '</symbol>'  . "\n" ),
				$wordpress_svg
			);

			$emojis_wordpress .= $symbol;
			$wp_list_emoji[] = $emoji;
		}
	}
}

$emojis_wordpress .= '</defs>' . "\n" . '</svg>';

$data = dirname( __FILE__ ) . '/wp-emojis/data.json';
if ( file_exists( $data ) ) {
	unlink( $data );
}

$sprite = dirname( __FILE__ ) . '/wp-emojis/sprite.svg';
if ( file_exists( $sprite ) ) {
	unlink( $sprite );
}

file_put_contents( $data, json_encode( $wp_list_emoji ) );
file_put_contents( $sprite, $emojis_wordpress );

echo "\n" . count( $wp_list_emoji ) . ' emojis imported.' . "\n";
