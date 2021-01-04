import React, { PureComponent, } from 'react'
import jQuery from "jquery";
import { connect } from 'react-redux';
import { sendCoord, getBalance, getAuth } from '../../actions';
import './style.scss';

class SpotTheBall extends PureComponent {
    state = {
        x: 0,
        y: 0
    }
    componentDidMount() {
        const { getBalance } = this.props;
        getBalance();
        const save = this
        var main_points_html = '';
        let zoom_points_html = '';
        var translate_array = { "loading_game": "Loading game...", "no_more_spots_available": "Please click RESET on the right hand side under your coordinates", "no_more_spots_available_mobile": "Please click RESET on the bottom right hand side", "tap_to_close": "Tap to close", "checkout": "CHECKOUT", "mint_nft_btn": "MINT NFT", "close": "Close", "select": "Select", "how_to_play": "How to Play", "alert_msg": "Drag the image to position the marker and press 'Select' when you are ready. Record the coordinates as one number for example, if X = 738 and Y = 844 then the correct number (string) is 738844. If you have enough points through mining HCORE LP you can click 'MINT NFT' to claim your NFT.", "proceed_to_play": "Proceed to Play", "cart": "Cart", "shop": "SHOP", "back_btn": "Back to hcore.info", "reset": "RESET", "your_selection": "YOUR SELECTION" };
        jQuery.fn.spotball = function (options) {

            var spot_index = 1;
            var draw_line = false;

            //Build existing coordinates
            var tmp_coordinates = []
            tmp_coordinates['coordinates'] = options.coordinates;
            if (typeof (options.judge_coordinates) != 'undefined') {
                tmp_coordinates['judge_coordinates'] = options.judge_coordinates;
            }

            if (typeof (options.runner_coordinates) != 'undefined') {
                tmp_coordinates['runner_coordinates'] = options.runner_coordinates;
            }

            if (typeof (options.winner_coordinates) != 'undefined') {
                tmp_coordinates['winner_coordinates'] = options.winner_coordinates;
            }


            Object.keys(tmp_coordinates).forEach(function (key) {
                jQuery.each(tmp_coordinates[key], function (k, v) {
                    var container_x;
                    var container_y;
                    var background_style;
                    if (_is_mobile()) {
                        container_x = v.coordinate_x - 8;
                        container_y = v.coordinate_y - 8;
                    } else {
                        container_x = ((v.coordinate_x / 4) - 8);
                        container_y = ((v.coordinate_y / 4) - 8);

                        container_x = (container_x * 1.5);
                        container_y = (container_y * 1.5);
                        //((zoom_client_x+8)/1.5)*2.7;
                    }


                    var data_attrib = '';
                    if (typeof (v.data) != 'undefined') {
                        jQuery.each(v.data, function (k, v) {
                            data_attrib += 'data-' + k + '="' + v + '"';
                        });
                    }

                    background_style = 'background-position: -20px -1px;';
                    if (key === 'judge_coordinates') {
                        background_style = 'background-position: -20px 37px;';
                    }

                    if (key === 'runner_coordinates') {
                        background_style = 'background-position: -20px 57px;';
                    }

                    if (key === 'winner_coordinates') {
                        background_style = 'background-position: -20px 94px;';
                    }

                    container_x = parseInt(container_x.toFixed());
                    container_y = parseInt(container_y.toFixed());


                    //main_points_html += '<div '+data_attrib+' data-top="'+(container_y)+'" data-left="'+(container_x)+'" class="main-image-point" data-spot_id="'+spot_index+'" style="top: '+(container_y)+'px;left: '+(container_x)+'px; '+background_style+'">&nbsp;</div>';
                    //zoom_points_html += '<div class="zoom-point" data-spot_id="'+spot_index+'" style="top: '+((container_y*1.5)+4)+'px;left: '+((container_x*1.5)+4)+'px;">&nbsp;</div>';

                    main_points_html += '<div ' + data_attrib + ' data-top="' + (container_y) + '" data-left="' + (container_x) + '" class="main-image-point" data-spot_id="' + k + '" style="top: ' + (container_y) + 'px;left: ' + (container_x) + 'px; ' + background_style + '">&nbsp;</div>';
                    zoom_points_html += '<div class="zoom-point" data-spot_id="' + k + '" style="top: ' + ((container_y * 1.5) + 4) + 'px;left: ' + ((container_x * 1.5) + 4) + 'px;">&nbsp;</div>';

                    spot_index++;
                });
            });
            //



            var largeImage = jQuery(this);

            // Create new offscreen image to test
            var theImage = new Image();
            theImage.src = largeImage.attr("src");
            var _this = this;
            var obj;
            setTimeout(function () {

                var main_image_width;
                var main_image_height;

                // Get accurate measurements from that.
                if (!_is_mobile()) {
                    main_image_width = theImage.width / 2.7;
                    main_image_height = theImage.height / 2.7;
                } else {
                    //Resize the image based on the screen size and get the ratio between screen size and actual image

                    var mobile_screen_width = window.innerWidth;

                    var resize_ratio = (100 / (theImage.width / mobile_screen_width));

                    jQuery('.mobile-stb-zoom').val(resize_ratio);

                    main_image_width = (resize_ratio / 100) * theImage.width;
                    main_image_height = (resize_ratio / 100) * theImage.height;
                }




                var zoom_image_width = main_image_width * 1.5;
                var zoom_image_height = main_image_height * 1.5



                var image_src = jQuery(_this).attr('src');
                var html = '';
                if (!_is_mobile()) {
                    html = '<div class="spot-ball-container">';
                    html += '	<div class="main-image-container">';
                    html += '		<div class="main-image-inner">';
                    html += '			<div class="main-image">';
                    html += '				<img src="' + image_src + '">';
                    html += '			</div>';
                    html += '			<div class="main-image-points-container">' + main_points_html + '</div>';
                    html += '		</div>';
                    html += '	</div>';
                    html += '	<div class="spot-ball-line-container"></div>';
                    if (options.show_points === true) {
                        html += '	<div class="xy-points-container">X:100 Y:100</div>';
                    }
                    html += '	<div class="zoom-image-container">';
                    html += '		<div class="cross-pointer" >&nbsp;</div>';
                    html += '		<div class="zoom-image-inner">';
                    html += '	<div class="spot-ball-zoom-line-container"></div>';
                    html += '			<div class="zoom-image">';
                    html += '				<img src="' + image_src + '" width="' + zoom_image_width + '" height="' + zoom_image_height + '">';
                    html += '			</div>';
                    html += '			<div class="zoom-points-container">' + zoom_points_html + '</div>';
                    html += '		</div>';
                    html += '	</div>';
                    // if (options.mode === 'play') {
                    //     html += '	<svg class="main-image-svg-container" style="position: absolute; top: 0px; left: 0px;"></svg>';
                    // }
                    html += '</div>';


                    //Reset the stb container width and height
                    const stb_woo_btns_height = 132; //Constant
                    const stb_points_width = 250; //Constant
                    const stb_draw_title_height = 90; //Constant
                    var stb_image_width = main_image_width;
                    var stb_image_height = main_image_height;
                    var stb_wrapper_width = stb_image_width + stb_points_width;
                    var stb_cart_products_height = ((stb_image_height - stb_woo_btns_height) - 20) - stb_draw_title_height;
                    jQuery('.stb-image').css({ 'width': stb_image_width });
                    jQuery('.stb-wrapper').css({ 'width': stb_wrapper_width, 'margin': 'auto' });
                    jQuery('.stb-cart-products').css({ 'max-height': stb_cart_products_height });
                    //

                } else {
                    html = '<div class="spot-ball-container-mobile">';
                    html += '		<div class="main-image-container-mobile">';
                    html += '			<div class="main-image-inner-mobile">';
                    html += '				<div class="main-image-mobile">';
                    html += '					<img src="' + image_src + '">';
                    //TODO - Set the "main_points_html" pointers in mobile view
                    html += '					<div class="main-image-points-container-mobile">' + main_points_html + '</div>';
                    html += '				</div>';
                    html += '			</div>';
                    html += '		</div>';
                    html += '	</div>';
                }

                jQuery(html).insertAfter(_this);
                obj = jQuery(_this).parent();
                jQuery(_this).remove();





                if (_is_mobile()) {
                    jQuery(obj).find('.main-image-mobile img').css('max-width', 'max-content');
                    jQuery('body').append(obj);
                    jQuery.each(jQuery('body').children(), function (k, v) {
                        jQuery(v).hide();
                    });
                    jQuery('.stb-image').show();

                    var draggable = false;

                    jQuery(obj).find('.spot-ball-container-mobile').css({ 'position': 'relative', 'width': '100%', 'height': '100%', 'background': '#e0e0e0', 'overflow': 'hidden' });

                    //jQuery('body').css({'overscroll-behavior-y': 'contain', 'padding': '0px', 'margin': '0px'});

                    //jQuery('html').css({'overscroll-behavior': 'none', 'overflow': 'hidden'});
                    //jQuery('body').css({'overscroll-behavior': 'none', 'overflow': 'hidden'});

                    jQuery('body').css({ 'position': 'fixed', 'overflow': 'hidden', 'width': '100%' });
                    jQuery('html').css({ 'position': 'fixed', 'overflow': 'hidden', 'width': '100%' });

                    jQuery('html, body, .stb-image').css('height', '100%');



                    jQuery(obj).find('.main-image-mobile').css({ 'position': 'absolute', 'top': '0px', 'left': '0px', 'width': main_image_width, 'height': main_image_height, 'background-image': 'url(' + jQuery('.main-image-mobile img').attr('src') + ')', 'background-size': 'contain', 'background-repeat': 'no-repeat' });

                    jQuery(obj).find('.main-image-mobile').attr('data-original-width', theImage.width);
                    jQuery(obj).find('.main-image-mobile').attr('data-original-height', theImage.height);

                    jQuery(obj).find('.main-image-mobile img').remove();


                    //jQuery('<a class="stb-mobile-cart-btn" onclick="open_stb_mobile_cart()" href="javascript:void(0)" style="background: #cccccc;color: white;display: block;padding: 12px 11px 12px 11px;border-radius: 50%;position: absolute;z-index: 1;left: 20px;top: 15px;text-decoration: none;font-weight: bold;border: #de0505 solid 3px;"><img src="'+stb_site_url+'/wp-content/plugins/spot-the-ball/assets/images/icons8-shopping-cart-24.png" /></a>').insertAfter(jQuery(obj).find('.main-image-mobile'));

                    jQuery('<div class="stb-mobile-cart-btn" onclick="open_stb_mobile_cart()" href="javascript:void(0)" style="background: #cd2653;color: white;display: block;padding: 12px 11px 12px 11px;position: absolute;z-index: 1;left: 20px;top: 15px;text-decoration: none;width: 142px;text-align: center;font-weight: bold;">Please record coordinate</div>').insertAfter(jQuery(obj).find('.main-image-mobile'));


                    jQuery('<div class="stb-mobile-cart" onclick="close_stb_mobile_cart()"><div><h2 class="stb-selection-title">' + translate_array['your_selection'] + '<a style="float: right;" href="javascript:void(0)" onclick="close_stb_mobile_cart()">' + translate_array['close'] + '</a></h2></div><div class="stb-cart-products">' + jQuery('.stb-cart-products').html() + '</div></div>').insertAfter(jQuery(obj).find('.main-image-mobile'));

                    jQuery('<div class="stb-mobile-coordinates">&nbsp;</div>').insertAfter(jQuery(obj).find('.main-image-mobile'));

                    jQuery('<div class="stb-mobile-alert-overlay" onclick="close_stb_mobile_alert()" style="display: none; text-align: center;z-index: 5;left: 0px;top: 0px;position: absolute;width: 100%;padding: 11px;color: #0e0e0e;height: 100%;opacity: 0.5;background: #3c3c3c;"></div>').insertAfter(jQuery(obj).find('.main-image-mobile'));

                    jQuery('<div class="stb-mobile-alert" onclick="close_stb_mobile_alert()" style="display: none; background: white;opacity: 1;z-index: 46;position: absolute;left: 12%;top: 25%;width: 75%;text-align: center;border: red solid 2px;  padding: 10px;">' + translate_array['no_more_spots_available_mobile'] + '<br /><a href="javascript:void(0)">' + translate_array['tap_to_close'] + '</a></div>').insertAfter(jQuery(obj).find('.main-image-mobile'));



                    jQuery('<a class="select-spot-button" href="javascript:void(0)" style="background: green;color: white;display: block;padding: 21px 14px 21px 14px;border-radius: 50%;position: absolute;z-index: 1;left: 45px;top: 70%;text-decoration: none;font-weight: bold;border: white solid 3px;">' + translate_array['select'] + '</a>').insertAfter(jQuery(obj).find('.main-image-mobile'));


                    jQuery('<div style="position: absolute;  left: 230px; top: 73%; z-index: 9;"><input type="hidden" class="mobile-stb-zoom" value="51"></div>').insertAfter(jQuery(obj).find('.main-image-mobile'));




                    //jQuery('<a class="open-fullscreen-button" href="javascript:void(0)" onclick="openFullscreen()" style="display: block;position: absolute;z-index: 1;left: 45px;top: 50%;text-decoration: none;font-weight: bold;">Proceed to Play</a>').insertAfter(jQuery(obj).find('.main-image-mobile'));

                    //jQuery('<div class="stb-fullscreen-instruct" style="position: absolute;z-index: 1;left: 20%;top: 35%;background: white;width: 70%;padding: 6px;"><h4 style="font-weight: bold;">Instruction</h4><div>Choose where you think the centre of the ball is</div><div style="text-align: center;"><a class="open-fullscreen-button" href="javascript:void(0)" onclick="openFullscreen()" style="text-decoration: none;font-weight: bold;background: red;padding: 3px 6px 3px 6px;border-radius: 10px;color: white;margin-top: 10px;display: inline-block;">Proceed to Play</a></div></div>').insertAfter(jQuery(obj).find('.main-image-mobile'));

                    this.open_stb_mobile_alert('<h4 style="font-weight: bold;color: #a7a7a7;">' + translate_array['how_to_play'] + '</h4><div style="text-align: left;">' + translate_array['alert_msg'] + '</div><div style="text-align: center;"><a class="open-fullscreen-button" href="javascript:void(0)" onclick="openFullscreen()" style="text-decoration: none;background: #a7a7a7;padding: 3px 6px 3px 6px;color: white;margin-top: 15px;display: inline-block;">' + translate_array['proceed_to_play'] + '</a></div>');


                    jQuery('<div class="mobile-right-checkout" style="position: absolute;z-index: 1;right: 2%;bottom: 11%;"><button onclick="reset_stb_coordinates()" class="button-checkout continue_to_checkout_btn" style="padding: 6px 10px 6px 10px;"><div style="font-size: 15px; text-align: center;">' + translate_array['reset'] + '</div></button></div>').insertAfter(jQuery(obj).find('.main-image-mobile'));

                    jQuery('<div class="mobile-right-checkout" style="position: absolute;z-index: 1;right: 2%;bottom: 4%;"><button onclick="mint_nft_btn_action()" class="button-checkout continue_to_checkout_btn" style="padding: 6px 10px 6px 10px;"><div style="font-size: 15px; text-align: center;">' + translate_array['mint_nft_btn'] + '</div></button></div>').insertAfter(jQuery(obj).find('.main-image-mobile'));

                    jQuery('<div class="mobile-left-checkout" style="position: absolute;z-index: 1;left: 6%;bottom: 4%;"><button onclick="stb_back_btn()" class="button-checkout continue_to_shop_btn" style="padding: 6px 10px 6px 10px;"><div style="font-size: 15px; text-align: center;">' + translate_array['back_btn'] + '</div></button></div>').insertAfter(jQuery(obj).find('.main-image-mobile'));


                    jQuery('<div class="stb-mobile-circle" style="display: none; position: absolute;z-index: 1;width: 70px;height: 70px;border-radius: 37px;border: red solid 2px;"></div>').insertAfter(jQuery(obj).find('.main-image-mobile'));






                } else {
                    //Reset the stb container width and height
                    /* setTimeout(function(){
                    var stb_image_width = jQuery('.spot-ball-container').width();
                    var stb_image_height = jQuery('.spot-ball-container').height();
                    var stb_woo_btns_height = jQuery('.stb-woo-btns').height();
                    const stb_points_width = 265; //Constant
                    var stb_wrapper_width = stb_image_width + stb_points_width;
                    var stb_cart_products_height = (stb_image_height - stb_woo_btns_height)-20;
                    jQuery('.stb-image').css({'width': stb_image_width});
                    jQuery('.stb-points').css({'width': stb_points_width});
                    jQuery('.stb-wrapper').css({'width': stb_wrapper_width, 'margin': 'auto'});
                    jQuery('.stb-cart-products').css({'max-height': stb_cart_products_height});
                    }, 2000); */
                }

                if ((_is_mobile()) || (options.show_desktop_cross_lines === true)) {
                    jQuery('<div class="stb-horizontal-line" style="position: absolute; background: red; z-index: 1; width: 100%; height: 2px; left: 0px; top: 50%;"></div>	<div class="stb-vertical-line" style="position: absolute; background: red;  z-index: 1; width: 2px; height: 100%; top: 0px; left: 50%;"></div>').insertAfter(jQuery(obj).find('.main-image, .main-image-mobile'));
                }

                jQuery(obj).find('.spot-ball-container-mobile').on('touchmove', function (event) {
                    var window_event = window.event;
                    event = window_event.touches[0];
                    if (draggable === true) {
                        var cross_x = jQuery(this).width() / 2;
                        var cross_y = jQuery(this).height() / 2;

                        var tmp_x = jQuery(this).attr('data-tmp_x');
                        var tmp_y = jQuery(this).attr('data-tmp_y');

                        jQuery(obj).find('.main-image-mobile').css({ 'top': event.clientY - tmp_y, 'left': event.clientX - tmp_x });

                        jQuery(obj).find('.main-image-mobile').attr('data-spot-y', cross_y - (event.clientY - tmp_y));
                        jQuery(obj).find('.main-image-mobile').attr('data-spot-x', cross_x - (event.clientX - tmp_x));

                        var coordinates = this.get_mobile_coordinates_value(obj);
                        jQuery('.stb-mobile-coordinates').html('<div class="style_div">X:' + coordinates.coordinate_x + ', Y:' + coordinates.coordinate_y + '</div>');
                    }



                    //Pinch zoom
                    if (window_event.touches.length === 2) {
                        var dist = Math.hypot(
                            window_event.touches[0].pageX - window_event.touches[1].pageX,
                            window_event.touches[0].pageY - window_event.touches[1].pageY);
                        var data_distance = jQuery(this).attr('data-distance');
                        if (dist > data_distance) {
                            //html = 'Increasing';
                            this.zoom_out();
                        }

                        if (dist < data_distance) {
                            this.zoom_in();
                            //html = 'Decreasing';
                        }
                        jQuery(this).attr('data-distance', dist);
                    }

                });

                jQuery(obj).find('.main-image-mobile').on('touchstart', function (event) {
                    event = window.event.touches[0];
                    jQuery(obj).find('.spot-ball-container-mobile').attr('data-tmp_x', ((event.clientX - event.target.offsetLeft) - 9));
                    jQuery(obj).find('.spot-ball-container-mobile').attr('data-tmp_y', ((event.clientY - event.target.offsetTop) - 9));
                });

                jQuery(obj).find('.spot-ball-container-mobile').on('touchstart', function (event) {
                    draggable = true;
                });

                jQuery(obj).find('.spot-ball-container-mobile').on('touchend', function (event) {
                    draggable = false;
                });



                if (options.onAfterDraw !== undefined) {
                    _this.remaining_spots = _get_remaining_spots();
                    options.onAfterDraw(_this);
                }

                //Hide the zoom option in "choose_winner" mode
                if ((options.mode === 'choose_winner') || (options.mode === 'show_runner_winner')) {
                    jQuery(obj).find('.zoom-image-container').hide();
                    jQuery(obj).find('.xy-points-container').hide();
                }


                jQuery(obj).find('.main-image-inner, .main-image-container, .spot-ball-container, .main-image-svg-container').css({ 'width': main_image_width + 'px', 'height': main_image_height + 'px' });

                jQuery(obj).find('.main-image-container').attr('data-width', main_image_width);
                jQuery(obj).find('.main-image-container').attr('data-height', main_image_height);

                jQuery(obj).find(".spot-ball-container").on('mousemove touchmove', function (event) {
                    if (options.mode === 'show_runner_winner') {

                    } else if (options.mode === 'choose_winner') {

                    } else {
                        if (event.type === 'touchmove') {
                            event = window.event.touches[0];
                        }
                        var cursor_y = event.pageY - jQuery(obj).find(".spot-ball-container").offset().top;
                        var cursor_x = event.pageX - jQuery(obj).find(".spot-ball-container").offset().left;

                        var tmp_cursor_y = cursor_y - 35;
                        var tmp_cursor_x = cursor_x - 35;

                        if (((tmp_cursor_x + 35) > 0) && ((tmp_cursor_y + 35) > 0) && (tmp_cursor_x <= (main_image_width - 35)) && (tmp_cursor_y <= (main_image_height - 35))) {
                            jQuery(obj).find('.zoom-image-container').css({ 'top': tmp_cursor_y, 'left': tmp_cursor_x });
                        }
                        cursor_y = cursor_y - 19;
                        cursor_x = cursor_x - 19;
                        var inner_x = ((cursor_x / 2) + cursor_x);
                        var inner_y = ((cursor_y / 2) + cursor_y);
                        jQuery(obj).find('.zoom-image-inner').css({ 'top': 0 - inner_y, 'left': 0 - inner_x });

                        if ((_is_mobile()) || (options.show_desktop_cross_lines === true)) {
                            //jQuery(obj).find('.stb-horizontal-line').css({'top': cursor_y+19});
                            //jQuery(obj).find('.stb-vertical-line').css({'left': cursor_x+19});
                            var original_width;
                            var original_height;
                            if (_is_mobile()) {
                                original_width = jQuery('.main-image-mobile').data('width');
                                original_height = jQuery('.main-image-mobile').data('height');
                            } else {
                                original_width = jQuery(obj).find('.main-image-container').data('width');
                                original_height = jQuery(obj).find('.main-image-container').data('height');
                            }


                            var vertical_left = cursor_x + 19;
                            var horizontal_top = cursor_y + 19;

                            if ((vertical_left <= original_width) && (vertical_left > 0) && (horizontal_top <= original_height) && (horizontal_top > 0)) {
                                jQuery(obj).find('.stb-vertical-line').css({ 'left': vertical_left });
                                jQuery(obj).find('.stb-horizontal-line').css({ 'top': horizontal_top });
                            }
                        }

                        var zoom_image_container_position = get_zoom_image_container_position(38);

                        //TODO: fix cursor tool tip xy values issue

                        //1.5 = zoom level is 50%
                        var main_client_x = ((((zoom_image_container_position.x * 1.5) - 8) + 8) / 1.5) * 2.7;
                        var main_client_y = ((((zoom_image_container_position.y * 1.5) - 8) + 8) / 1.5) * 2.7;
                        //

                        if (options.show_points === true) {
                            var xy_points_top = tmp_cursor_y - 30;
                            var xy_points_left = tmp_cursor_x - 50;

                            if (xy_points_top < 0) {
                                xy_points_top = xy_points_top + 100;
                            }

                            if (xy_points_left < 0) {
                                xy_points_left = xy_points_left + 100;
                            }

                            /* 
                            if((xy_points_top<0) || (xy_points_left<0)){
                                xy_points_top = xy_points_top * -1;
                                xy_points_left = xy_points_left * -1;
                            } */

                            //bof TODO
                            var svg_x = zoom_image_container_position.x;
                            var svg_y = zoom_image_container_position.y;
                            if ((_is_draw_line() === true) && (draw_line === true)) {
                                jQuery('.main-image-svg-container .new_line').attr('x2', svg_x);
                                jQuery('.main-image-svg-container .new_line').attr('y2', svg_y);
                            }
                            //eof TODO

                            jQuery(obj).find('.xy-points-container').css({ 'top': xy_points_top, 'left': xy_points_left }).text('X:' + (main_client_x).toFixed() + ' Y:' + (main_client_y).toFixed());
                            jQuery(obj).find('.xy-points-container').attr('data-left', svg_x);
                            jQuery(obj).find('.xy-points-container').attr('data-top', svg_y);
                        }
                    }
                });

                jQuery(obj).find('.spot-ball-container').on('click', function (e) {
                    if (_is_draw_line() === false) {
                        if (options.mode === 'show_runner_winner') {

                        } else if (options.mode === 'choose_winner') {

                        } else {

                            var zoom_image_container_position = get_zoom_image_container_position(38);
                            var offsetX = zoom_image_container_position.x * 1.5;
                            var offsetY = zoom_image_container_position.y * 1.5;
                            var zoom_client_x = offsetX - 8;
                            var zoom_client_y = offsetY - 8;
                            var main_client_left = ((((zoom_client_x / 1.5) - 4) + 1)).toFixed(); //1.5 = zoom level is 50%
                            var main_client_top = ((((zoom_client_y / 1.5) - 4) + 1)).toFixed();

                            //Remove the existing spot
                            if (options.mode === 'set_answer') {
                                jQuery(obj).find('*[data-spot_id="__set_spot_id__"]').remove();
                            }

                            jQuery(obj).find('.main-image-points-container').append('<div class="main-image-point" data-spot_id="__set_spot_id__" style="top: ' + (main_client_top) + 'px;left: ' + (main_client_left) + 'px; ">&nbsp;</div>');
                            jQuery(obj).find('.zoom-points-container').append('<div class="zoom-point" data-spot_id="__set_spot_id__" style="top: ' + (zoom_client_y) + 'px;left: ' + (zoom_client_x) + 'px;">&nbsp;</div>');

                            if (options.onChooseSpot !== undefined) {
                                e.coordinate_x = (((zoom_client_x + 8) / 1.5) * 2.7).toFixed();
                                e.coordinate_y = (((zoom_client_y + 8) / 1.5) * 2.7).toFixed();
                                e.spot_index = 0;
                                e.is_game_played = _is_game_played();
                                e.remaining_spots = _get_remaining_spots();
                                options.onChooseSpot(e);
                            }

                            //spot_index++;

                        }
                    }
                });

                //bof TODO
                jQuery(obj).find('.spot-ball-container').on('mousedown', function (event) {
                    if (_is_draw_line() === true) {
                        jQuery('.main-image-svg-container line').removeClass('new_line');

                        var x1 = jQuery('.xy-points-container').attr('data-left');
                        var y1 = jQuery('.xy-points-container').attr('data-top');

                        var draw_line_color = _get_draw_line_color();

                        jQuery('.main-image-svg-container').append('<line class="new_line" x1="' + x1 + '" y1="' + y1 + '" x2="' + x1 + '" y2="' + y1 + '" style="stroke:' + draw_line_color + ';stroke-width:1" />');

                        jQuery('.main-image-svg-container').html(jQuery('.main-image-svg-container').html());
                    }
                    draw_line = true;
                });

                jQuery(obj).find('.spot-ball-container').on('mouseup', function (event) {
                    draw_line = false;
                });
                //eof TODO


                jQuery(obj).find('.select-spot-button').on('click', function (e) {
                    var tmp_top = (jQuery(obj).find('.main-image-mobile').attr('data-spot-y') - 8);
                    var tmp_left = (jQuery(obj).find('.main-image-mobile').attr('data-spot-x') - 8);

                    var zoom_level = jQuery('.mobile-stb-zoom').val();

                    var data_top;
                    var data_left;
                    if (zoom_level === 51) {
                        data_top = tmp_top;
                        data_left = tmp_left;
                    } else {
                        var zoom_level_value = (zoom_level / 100) + 1;
                        data_top = (tmp_top - ((zoom_level / 100) * 9)) / zoom_level_value;
                        data_left = (tmp_left - ((zoom_level / 100) * 9)) / zoom_level_value;
                    }


                    if (_is_game_played() === false) {

                        jQuery(obj).find('.main-image-points-container-mobile').append('<div class="main-image-point" data-spot_id="TODO ID" data-left="' + data_left + '" data-top="' + data_top + '" style="top: ' + tmp_top + 'px; left: ' + tmp_left + 'px;z-index: 2;">&nbsp;</div>');


                        if (options.onChooseSpot !== undefined) {
                            var coordinates = this.get_mobile_coordinates_value(obj);
                            e.coordinate_x = coordinates.coordinate_x;
                            e.coordinate_y = coordinates.coordinate_y;
                            e.spot_index = spot_index;
                            e.is_game_played = _is_game_played();
                            e.remaining_spots = _get_remaining_spots();
                            options.onChooseSpot(e);
                        }
                        spot_index++;

                    } else {
                        this.open_stb_mobile_alert(translate_array['no_more_spots_available_mobile'] + '<br /><a href="javascript:void(0)">' + translate_array['tap_to_close'] + '</a>');
                    }




                });

            }, 1000);

            this.highlight_spot = function (spot_index, status) {
                var selected = jQuery(obj).find('.main-image-point[data-spot_id="' + spot_index + '"]');
                if (status === true) {
                    jQuery(obj).find(selected).addClass('highlight-spot');
                } else {
                    jQuery(obj).find(selected).removeClass('highlight-spot');
                }
            }

            this.remove_spot = function (cart_coorindate_key) {
                jQuery(obj).find('*[data-spot_id="' + cart_coorindate_key + '"]').remove();
                jQuery('body').find('*[data-cart_coorindate_key="' + cart_coorindate_key + '"]').remove();
                if (options.onRemoveSpot !== undefined) {
                    this.cart_coorindate_key = cart_coorindate_key;
                    this.is_game_played = _is_game_played();
                    this.remaining_spots = _get_remaining_spots();
                    options.onRemoveSpot(this);
                }
            }

            this.edit_spot = function (product_id, cart_coorindate_key) {
                this.product_id = product_id;
                this.cart_coorindate_key = cart_coorindate_key;
                options.onEditSpot(this);
            }

            this.add_spot_qty = function (product_id) {
                this.product_id = product_id;
                options.onAddSpotQty(this);
            }

            this.remove_spot_qty = function (product_id) {
                this.product_id = product_id;
                options.onRemoveSpotQty(this);
            }

            this.is_game_played = function () {
                return _is_game_played();
            }

            function _get_remaining_spots() {
                var clicked
                if (_is_mobile()) {
                    clicked = jQuery(obj).find('.main-image-point').length;
                } else {
                    clicked = jQuery(obj).find('.zoom-point').length;
                }
                return options.total_qty - clicked;
            }

            function _is_game_played() {
                var qty_based_restriction = true;
                if ((typeof (qty_based_restriction) === 'undefined') || (qty_based_restriction === 0)) {
                    return false;
                } else {
                    var clicked
                    if (_is_mobile()) {
                        clicked = jQuery(obj).find('.main-image-point').length;
                    } else {
                        clicked = jQuery(obj).find('.zoom-point').length;
                    }
                    if (jQuery('body').find('div[data-stb_edit_cart_coorindate_key]').length > 0) {
                        clicked = clicked - 1;
                    }
                    if (options.total_qty > clicked) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }

            function _is_draw_line() {
                if (jQuery('#is_draw_line').length === 0) {
                    return false;
                }
                var is_draw_line = jQuery('#is_draw_line').prop('checked');
                return is_draw_line;
            }

            function _get_draw_line_color() {
                var draw_line_color = jQuery('#draw_line_color').val()
                return draw_line_color;
            }

            function get_zoom_image_container_position(offset) {
                var left_pos = jQuery(obj).find('.zoom-image-container').css('left').replace('px', '');
                var top_pos = jQuery(obj).find('.zoom-image-container').css('top').replace('px', '');
                left_pos = parseFloat(left_pos);
                top_pos = parseFloat(top_pos);
                return { 'x': left_pos + offset, 'y': top_pos + offset };
            }

            function _is_mobile() {
                if (window.outerWidth <= 768) {
                    return true
                } else {
                    return false;
                }
            }



            return this;
        };
        jQuery(function () {
            jQuery('.stb-image').hide();
            jQuery('.stb-points').hide();
            jQuery('.stb-wrapper').append('<div class="stb-loader">' + translate_array['loading_game'] + '</div>');

            //Init STB
            jQuery('.stb-image img').spotball({
                mode: 'play',
                total_qty: 1,
                show_desktop_cross_lines: true,
                show_points: true,
                onChooseSpot: (e) => {
                    if (document.getElementsByClassName("main-image-point")[1]) {
                        console.log(document.getElementsByClassName('spot-ball-container')[0])
                        console.log(document.getElementsByClassName('main-image-point')[0])

                        document.getElementsByClassName('main-image-points-container')[0].removeChild(document.getElementsByClassName("main-image-point")[0])
                        document.getElementsByClassName('zoom-points-container')[0].removeChild(document.getElementsByClassName("zoom-point")[0])
                    }
                    save.setState({ x: +e.coordinate_x, y: +e.coordinate_y });
                    jQuery('.stb-xy-values').text('Processing...');
                    var _this = this;
                    var cart_coorindate_key = 123;
                    var coordinates_list = '<div class="stb-product" data-flag="playing" data-stb_coordinates=\'{"' + cart_coorindate_key + '":{"coordinate_x":"1030","coordinate_y":"219"}}\'><div class="stb-points-list stb-selected" data-spot_id="' + cart_coorindate_key + '"><div class="stb-xy-values">X: <span>' + e.coordinate_x + '</span>&nbsp;&nbsp;&nbsp;Y: <span>' + e.coordinate_y + '</span></div></div></div>';
                    _this.total_qty = 0;
                    jQuery('.stb-cart-products').html(coordinates_list);
                    jQuery('div[data-spot_id="__set_spot_id__"]').attr('data-spot_id', cart_coorindate_key);
                },
            });
            //

            setTimeout(function () {
                jQuery('.stb-image').show();
                jQuery('.stb-points').show();
                jQuery('.stb-loader').remove();
            }, 1000);
        });
    }

    open_stb_mobile_cart = () => {
        jQuery('.stb-mobile-cart').show();
    }

    close_stb_mobile_cart = () => {
        jQuery('.stb-mobile-cart').hide();
    }

    close_stb_mobile_alert = () => {
        jQuery('.stb-mobile-alert-overlay').hide();
        jQuery('.stb-mobile-alert').hide();
    }

    open_stb_mobile_alert = (html_content) => {
        jQuery('.stb-mobile-alert-overlay').show();
        jQuery('.stb-mobile-alert').show();
        jQuery('.stb-mobile-alert').html(html_content);

    }

    zoom_in = () => {
        var slider_val = jQuery('.mobile-stb-zoom').val();
        slider_val = parseInt(slider_val);
        slider_val = slider_val - 5;
        if (slider_val > 0) {
            jQuery('.mobile-stb-zoom').val(slider_val);
            this.mobile_zoom(slider_val);
        }
    }

    zoom_out = () => {
        var slider_val = jQuery('.mobile-stb-zoom').val();
        slider_val = parseInt(slider_val);
        slider_val = slider_val + 5;
        jQuery('.mobile-stb-zoom').val(slider_val);
        this.mobile_zoom(slider_val);
    }

    get_mobile_coordinates_value = (obj) => {
        var coordinate_x;
        var coordinate_y;
        var main_image_mobile_width = jQuery('.main-image-mobile').width();
        var main_image_mobile_height = jQuery('.main-image-mobile').height();

        coordinate_x = jQuery(obj).find('.main-image-mobile').attr('data-spot-x');
        coordinate_y = jQuery(obj).find('.main-image-mobile').attr('data-spot-y');

        var original_width = jQuery('.main-image-mobile').data('original-width');
        var original_height = jQuery('.main-image-mobile').data('original-height');

        coordinate_x = (100 / ((main_image_mobile_width * 100) / original_width)) * coordinate_x;
        coordinate_y = (100 / ((main_image_mobile_height * 100) / original_height)) * coordinate_y;

        coordinate_x = coordinate_x.toFixed();
        coordinate_y = coordinate_y.toFixed();

        return { 'coordinate_x': coordinate_x, 'coordinate_y': coordinate_y };

    }

    renderPlayButton(balance, need, sendCoord) {
        const { x, y } = this.state;
        if (balance !== 0 && balance < need) {
            return <div className='not-authorized'>
                <div className='auth-message'>Be patient. Your points balance is growing</div>
                <div className="not-enough-button" onClick={()=>{window.scrollTo( 0, 1450 )}}></div>
            </div>
        } else if (balance === 0) {
           return <div className='not-authorized'>
                <div className='auth-message'>HCORE tokens are needed to play</div>
                <div className="get-tokens-button"></div>
            </div>
        }else{
            return <div className='not-authorized'>
                <div className={`auth-message ${x ? '' : 'error'}`}>{`${x ? 'Claim these coordinates as an NFT' : 'Choose your coordinate before play'}`}</div>
                {x ? <div className="play-button" onClick={() => sendCoord(x, y)}></div> : <div className="play-button"></div>}
            </div>
        }
    }

    render() {

        const { sendCoord, balance: { balance, need } } = this.props;

        const { x, y } = this.state;
        const { authorized, getAuth } = this.props;
        return (
            <div className="stb-wrapper">
                <div className="stb-image"><img alt='' src="https://lambo.hcore.finance/wp-content/uploads/2020/10/soccer-2-withoutball.jpg" /></div>
                <div className="stb-points">
                    <div className='game-title'>Choose your coordinate </div>
                    <div className='coordinate-wrap'>
                        <div className='coordinate'>
                            {` X:${x ? x : '----'}`}
                        </div>
                        <div className='coordinate'>
                            {` Y:${y ? y : '----'}`}
                        </div>
                    </div>
                    <div className='game-points'>
                        <div className='game-point-title'>Min points to play</div>
                        <div className='game-point-value'>{parseFloat(need).toFixed(4)}</div>
                    </div>
                    <div className='game-points'>
                        <div className='game-point-title'>Your points</div>
                        <div className='game-point-value'>{parseFloat(balance).toFixed(4)}</div>
                    </div>
                    {!authorized ? (<div className='not-authorized'>
                        <div className='auth-message'>Please connect to Metamask</div>
                        <div className='button-connect' onClick={getAuth}></div>
                        <div className='link-more'>Learn more <div>&#8250;</div></div>
                    </div>) : (
                            this.renderPlayButton(0.0000001, need, sendCoord)
                        )}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        balance: state.getBalance,
        authorized: state.auth.authorization
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sendCoord: (x, y) => {
            dispatch(sendCoord(x, y));
        },
        getBalance: () => {
            dispatch(getBalance())
        },
        getAuth: () => {
            dispatch(getAuth());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotTheBall);