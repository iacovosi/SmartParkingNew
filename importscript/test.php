<?php
/**
 * Created by PhpStorm.
 * User: iacovosi
 * Date: 14/9/2018
 * Time: 12:02 μμ
 */
?>

<!DOCTYPE html>
<html lang="en">
<head><title>Properties in Cyprus - Apartments, Flats & Houses For Sale- BuySell</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0"/>
    <base href="/"/>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Add to Home">
    <meta name="robots" content="index, follow">
    <meta property="og:locale" content="en_GB">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Properties in Cyprus - Apartments, Flats & Houses For Sale- BuySell">
    <meta property="og:description"
          content="Find Properties For Sale in Cyprus - Flats & Houses For Sale in Cyprus - BuySell. Search over 100,000 properties for sale in Cyprus. BuySellCyprus.com">
    <meta property="og:url" content="http://buysellcyprus.com/properties-for-sale/price-0-50000/cur-EUR/sort-lp/page-1">
    <meta property="og:site_name" content="Buysellcyprus.com">
    <meta property="og:image" content="https://buysellcyprus.com/img/buyselllogo.gif">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:description"
          content="Find Properties For Sale in Cyprus - Flats & Houses For Sale in Cyprus - BuySell. Search over 100,000 properties for sale in Cyprus. BuySellCyprus.com">
    <meta name="twitter:title" content="Properties in Cyprus - Apartments, Flats & Houses For Sale- BuySell">
    <meta name="twitter:site" content="@buysellcy">
    <meta name="twitter:image" content="https://buysellcyprus.com/img/buyselllogo.gif">
    <link rel="stylesheet" type="text/css" href="css/allhome.min.css?v=17294" media="all">
    <link rel="apple-touch-icon-precomposed" href="img/icon-152x152.png">
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>
<body ng-app="myApp" ng-cloak onresize="resizeWindow()" ng-controller="UtilsCtrl" class="home"><a class="skip-main"
                                                                                                  href="#main-search">Skip
    to main content</a>
<div id="fb-root"></div>
<script>(function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "/js/externaljs/facebook.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "facebook-jssdk"));</script>
<div id="fullscreen-placeholder" class="fullscreen-show"></div>
<input type="radio" name="search-mobile" id="btn-search-results" checked/> <input type="radio" name="search-mobile"
                                                                                  id="btn-search-area-mobile"/>
<nav id="bs-toolbar" class="clearfix ff-special fullscreen-hide"><input type="checkbox" id="btn-left-menu"> <input
            type="checkbox" id="btn-right-menu">
    <div class="bs-row-flex bs-row-left">
        <div class="bs-col-xs-6 bs-col-centered bs-left-menu">
            <div class="bs-item">
                <div class="bs-content bs-content-center"><a href="/" target="_self" class="anchor-image"><img
                                class="toolbar-logo" src="img/buyselllogo.gif" alt="buysellcyprus logo"></a> <label
                            for="btn-left-menu" onclick>☰</label>
                    <ul id="bs-left-menu">
                        <li><a href="/properties-for-sale/page-1" target="_self">PROPERTY SEARCH</a></li>
                        <li><a href="/sell-home" target="_self">THINKING OF SELLING</a></li>
                        <li><a href="/about-us" target="_self">ABOUT US</a></li>
                        <li><a href="/offices" target="_self">OFFICES</a></li>
                        <li><a href="/resources" target="_self">RESOURCES</a></li>
                        <li><a href="/contact" target="_self">CONTACT</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bs-col-xs-6 bs-col-centered bs-col-right bs-right-menu">
            <div class="bs-item">
                <div class="bs-content bs-content-right button-favourite"><a href="/favourites/ids-/page-1"
                                                                             target="_self"><i class="fa fa-heart"
                                                                                               aria-hidden="true"></i>&nbsp;<span
                                id="btn-favourite">Favourites (0)</span></a></div>
            </div>
        </div>
    </div>
</nav>
<div id="modal-alert" class="modal-alert"></div>
<div ng-view></div>
<div id="cookiespopup" class="modal cookies-container vertical-center-outer">
    <div class="modal-content modal-animate cookies-simple" ng-controller="FormCtrl as fctrl">
        <div class="close" ng-click="fctrl.goBack(1,'bsform')">
            <div class="close-text">Close</div>
            <div class="close-circle">
                <div class="close-cross"></div>
            </div>
        </div>
        <div class="close-button-height">&nbsp;</div>
        <div class="vertical-center-inner"><h1>This site uses cookies</h1>
            <p>We and our advertising partners use cookies on this site and around the web to improve your website
                experience and provide you with personalised advertising from this site and other advertisers. By
                clicking "Agree and continue" or navigating this site, you accept the placement and use of these cookies
                for these purposes.​</p>
            <form id="bsform" name="bsform" action="/thank-you/cookies-accepted" method="post"
                  ng-class="{submitted:bsform.submitted}"><input type="hidden" name="type" value="cookies"> <input
                        type="hidden" name="url" value="/">
                <div><label for="cookie-email">Enter your email</label></div>
                <div><input id="cookie-email" type="email" name="cookie-email" data-ng-model="fctrl.email"
                            placeholder="Enter your email" required></div>
                <div id="recaptcha" class="g-recaptcha" data-sitekey="6Lciqh4UAAAAAGG8nO0vxhEFCwrj6Jyk_aI5EFIp"
                     data-callback="formSubmit" data-size="invisible"></div>
                <div class="big-btn3d">
                    <button id="btnForm" class="btn3d">Agree and continue</button>
                </div>
                <div><a href="/cookies-info" target="_self">
                        <div class="link-as-button">Learn more</div>
                    </a></div>
                <div class="cookie-error-container" data-ng-show="bsform.submitted"><span class="bs-error-msg">Please enter a valid email.</span>
                </div>
            </form>
            <p>By entering your email you agree that we may send you emails about our offers and services. You can
                unsubscribe any time.</p></div>
    </div>
</div>
<main id="main-search" ng-controller="ListingsCtrl as lctrl" class="main-search fullscreen-hide" tabindex="-1">
    <div class="search-container">
        <div class="search-main-container">
            <div class="home-responsive">
                <div>
                    <div class="home-search">
                        <div class="search-location-input">
                            <typeahead data-ng-model="lctrl.selectedRegions" items="regions" displaytag="label"
                                       displayitem="label" selected-items="lctrl.requestedRegions"
                                       control="typeaheadControl" controlid="'typeahead'"></typeahead>
                        </div>
                    </div>
                    <section class="search-toolbar">
                        <div id="menu-price" class="toolbar-group">
                            <div class="toolbar-out select-wrapper"><span class="select-value">											<span>{{ (search.minprice == 0 ? 'Min Price' : (search.minprice | currency:lctrl.currencySymbol:0)) }}</span>											<div
                                            class="select-arrow"><i class="fa fa-chevron-down"
                                                                    aria-hidden="true"></i></div>										</span>
                                <select class="select" ng-model="search.minprice"
                                        ng-options="price as (price == 0 ? 'Min Price' : (price | currency:lctrl.currencySymbol:0)) for price in lctrl.minPrices"
                                        ng-change="lctrl.dMinPriceChanged()"></select></div>
                            <div class="vertical-center range-divider"> to</div>
                            <div class="toolbar-out select-wrapper"><span class="select-value">											<span>{{ (search.maxprice == 0 ? 'Max Price' : (search.maxprice | currency:lctrl.currencySymbol:0)) }}</span>											<div
                                            class="select-arrow"><i class="fa fa-chevron-down"
                                                                    aria-hidden="true"></i></div>										</span>
                                <select class="select" ng-model="search.maxprice"
                                        ng-options="price as (price == 0 ? 'Max Price' : (price | currency:lctrl.currencySymbol:0)) for price in lctrl.maxPrices"
                                        ng-change="lctrl.dMaxPriceChanged()"></select></div>
                        </div>
                        <div id="menu-beds" class="toolbar-group">
                            <div class="toolbar-out select-wrapper"><span class="select-value">											<span>{{ (search.minbeds == -1 ? 'Min Beds' : (search.minbeds == 0 ? 'Studio' : search.minbeds + ' Bed')) }}</span>											<div
                                            class="select-arrow"><i class="fa fa-chevron-down"
                                                                    aria-hidden="true"></i></div>										</span>
                                <select class="select" ng-model="search.minbeds"
                                        ng-options="bed as (bed == -1 ? 'Min Beds' : (bed == 0 ? 'Studio' : bed + ' Bed')) for bed in lctrl.minBedsAvailable"
                                        ng-change="lctrl.dMinBedsChanged(bed)"></select></div>
                            <div class="vertical-center range-divider"> to</div>
                            <div class="toolbar-out select-wrapper"><span class="select-value">											<span>{{ (search.maxbeds == -1 ? 'Max Beds' : (search.maxbeds == 0 ? 'Studio' : search.maxbeds + ' Bed')) }}</span>											<div
                                            class="select-arrow"><i class="fa fa-chevron-down"
                                                                    aria-hidden="true"></i></div>										</span>
                                <select class="select" ng-model="search.maxbeds"
                                        ng-options="bed as (bed == -1 ? 'Max Beds' : (bed == 0 ? 'Studio' : bed + ' Bed')) for bed in lctrl.maxBedsAvailable"
                                        ng-change="lctrl.dMaxBedsChanged(bed)"></select></div>
                        </div>
                        <bs-menu id="menu-property-type-outer" name="'typesmenu'" direction="'down'"
                                 value="propertyTypeLabel" width="50" is-visible="isPropertyTypeSearchVisible"
                                 is-full-width="false">
                            <div ng-show="false"></div>
                            <div class="bs-filter types-menu">
                                <div ng-repeat="type in lctrl.propertyTypesAvailable"
                                     ng-click="lctrl.setPropertyTypes(type.name)">
                                    <button aria-label="property type"
                                            class="bs-md-button bs-menu-item-button bs-flex-start"
                                            ng-class="{'selected': lctrl.isTypeOptionSelected(type.name)}"><i
                                                class="fa-check-square fa-2x" aria-hidden="true"
                                                ng-show="lctrl.isTypeOptionSelected(type.name)"></i> <i
                                                class="fa-square-o fa-2x" aria-hidden="true"
                                                ng-show="!lctrl.isTypeOptionSelected(type.name)"></i> {{ type.label }}
                                    </button>
                                </div>
                            </div>
                        </bs-menu>
                        <bs-menu name="'moremenu'" direction="'down'" value="moreLabel" item-count="11" width="50"
                                 is-visible="isMoreSearchVisible" is-full-width="false">
                            <div ng-show="false"></div>
                            <div ng-controller="MoreSearchCtrl as msctrl" class="bs-filter">
                                <div>&nbsp;</div>
                                <div class="search-row-select filter-more" ng-if="!screenWidth820">
                                    <div class="select-wrapper"><select ng-model="search.minprice"
                                                                        ng-options="price as (price == 0 ? 'Min Price' : (price | currency:lctrl.currencySymbol:0)) for price in lctrl.minPrices"
                                                                        ng-change="lctrl.dMinPriceChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                    <div class="vertical-center"> to</div>
                                    <div class="select-wrapper"><select ng-model="search.maxprice"
                                                                        ng-options="price as (price == 0 ? 'Max Price' : (price | currency:lctrl.currencySymbol:0)) for price in lctrl.maxPrices"
                                                                        ng-change="lctrl.dMaxPriceChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                </div>
                                <div class="search-row-select filter-more" ng-if="!screenWidth1250">
                                    <div class="select-wrapper"><select ng-model="search.minbeds"
                                                                        ng-options="bed as (bed == -1 ? 'Min Beds' : (bed == 0 ? 'Studio' : bed + ' Bed')) for bed in lctrl.minBedsAvailable"
                                                                        ng-change="lctrl.dMinBedsChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                    <div class="vertical-center"> to</div>
                                    <div class="select-wrapper"><select ng-model="search.maxbeds"
                                                                        ng-options="bed as (bed == -1 ? 'Max Beds' : (bed == 0 ? 'Studio' : bed + ' Bed')) for bed in lctrl.maxBedsAvailable"
                                                                        ng-change="lctrl.dMaxBedsChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                </div>
                                <div id="menu-property-type-inner" class="bs-menu-container types-menu"
                                     ng-if="!screenWidth1250">
                                    <bs-menu name="'typesmenu2'" direction="'down'" value="propertyTypeLabel" width="50"
                                             is-visible="isPropertyTypeSearchVisible" is-full-width="false">
                                        <div ng-show="false"></div>
                                        <div class="bs-filter types-menu">
                                            <div ng-repeat="type in lctrl.propertyTypesAvailable"
                                                 ng-click="lctrl.setPropertyTypes(type.name)">
                                                <button aria-label="property type"
                                                        class="bs-md-button bs-menu-item-button bs-flex-start"
                                                        ng-class="{'selected': lctrl.isTypeOptionSelected(type.name)}">
                                                    <i class="fa-check-square fa-2x" aria-hidden="true"
                                                       ng-show="lctrl.isTypeOptionSelected(type.name)"></i> <i
                                                            class="fa-square-o fa-2x" aria-hidden="true"
                                                            ng-show="!lctrl.isTypeOptionSelected(type.name)"></i> {{
                                                    type.label }}
                                                </button>
                                            </div>
                                        </div>
                                    </bs-menu>
                                </div>
                                <div class="bs-menu-container types-menu" ng-if="propertyTypesSelected.length === 1">
                                    <bs-menu name="'subtypesmenu'" direction="'down'" value="msctrl.subtypeLabel"
                                             width="40" use-small-case="true" is-visible="msctrl.isSubtypeSearchVisible"
                                             use-scroll-bar="true" is-full-width="true">
                                        <div ng-show="false"></div>
                                        <div class="bs-menu-items-main-scroll">
                                            <div ng-repeat="subtype in msctrl.propertySubTypes"
                                                 ng-click="msctrl.setPropertySubTypes(subtype.name)">
                                                <button aria-label="property subtype"
                                                        class="bs-md-button bs-menu-item-button bs-flex-start"
                                                        ng-class="{'selected': msctrl.isSubtypeOptionSelected(subtype.name)}">
                                                    <i class="fa-check-square fa-2x" aria-hidden="true"
                                                       ng-show="msctrl.isSubtypeOptionSelected(subtype.name)"></i> <i
                                                            class="fa-square-o fa-2x" aria-hidden="true"
                                                            ng-show="!msctrl.isSubtypeOptionSelected(subtype.name)"></i>
                                                    {{ subtype.label }}
                                                </button>
                                            </div>
                                        </div>
                                    </bs-menu>
                                </div>
                                <div class="search-row-select filter-more">
                                    <div class="select-wrapper"><select ng-model="search.minbaths"
                                                                        ng-options="bath as (bath == 0 ? 'No min Baths' : bath + ' Bath') for bath in msctrl.minBathsAvailable"
                                                                        ng-change="msctrl.dMinBathsChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                    <div class="vertical-center"> to</div>
                                    <div class="select-wrapper"><select ng-model="search.maxbaths"
                                                                        ng-options="bath as (bath == 0 ? 'No max Baths' : bath + ' Bath') for bath in msctrl.maxBathsAvailable"
                                                                        ng-change="msctrl.dMaxBathsChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                </div>
                                <div class="search-row-select filter-more">
                                    <div class="select-wrapper"><select ng-model="search.minArea"
                                                                        ng-options="area as (area == 0 ? 'No min size' : area + ' Min Sq. Meters') for area in msctrl.minAreaAvailable"
                                                                        ng-change="msctrl.dMinAreaChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                    <div class="vertical-center"> to</div>
                                    <div class="select-wrapper"><select ng-model="search.maxArea"
                                                                        ng-options="area as (area == 0 ? 'No max size' : area + ' Max Sq. Meters') for area in msctrl.maxAreaAvailable"
                                                                        ng-change="msctrl.dMaxAreaChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                </div>
                                <div class="search-row-select filter-more">
                                    <div class="select-wrapper"><select ng-model="search.minPlotSize"
                                                                        ng-options="area as (area == 0 ? 'No min plot' : area + ' Min Plot Size') for area in msctrl.minPlotAreaAvailable"
                                                                        ng-change="msctrl.dMinPlotAreaChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                    <div class="vertical-center"> to</div>
                                    <div class="select-wrapper"><select ng-model="search.maxPlotSize"
                                                                        ng-options="area as (area == 0 ? 'No max plot' : area + ' Max Plot Size') for area in msctrl.maxPlotAreaAvailable"
                                                                        ng-change="msctrl.dMaxPlotAreaChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                </div>
                                <div class="search-row-select filter-more">
                                    <div class="select-wrapper"><select ng-model="search.minYearBuilt"
                                                                        ng-options="year as (year == 0 ? 'No min age' : 'Built after ' + year) for year in msctrl.minYearsAvailable"
                                                                        ng-change="msctrl.dMinYearChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                    <div class="vertical-center"> to</div>
                                    <div class="select-wrapper"><select ng-model="search.maxYearBuilt"
                                                                        ng-options="year as (year == 0 ? 'No max age' : 'Built before ' + year) for year in msctrl.maxYearsAvailable"
                                                                        ng-change="msctrl.dMaxYearChanged()"></select>
                                        <div class="select__arrow"></div>
                                    </div>
                                </div>
                                <div class="filter-more">
                                    <div><label>Keywords (e.g. pool, fireplace)</label> <textarea
                                                ng-model="search.keywords" rows="5" md-select-on-focus=""></textarea>
                                    </div>
                                </div>
                                <div class="bs-menu-button bs-flex">
                                    <div class="button-left">
                                        <button class="bs-md-button bs-button" ng-click="msctrl.resetSearch()">Clear
                                        </button>
                                    </div>
                                    <div class="button-right">
                                        <button class="bs-md-button bs-button" ng-click="msctrl.applyMoreSearch()">
                                            APPLY
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </bs-menu>
                        <div id="menu-currency" class="toolbar-group">
                            <div class="toolbar-out select-wrapper"><span class="select-value">											<span>{{ search.currency }}</span>											<div
                                            class="select-arrow"><i class="fa fa-chevron-down"
                                                                    aria-hidden="true"></i></div>										</span>
                                <select class="select" ng-model="search.currency"
                                        ng-options="obj.value as obj.text for obj in lctrl.currenciesAvailable"
                                        ng-change="lctrl.dCurrencyChanged()"></select></div>
                            <div class="vertical-center range-divider">&nbsp;</div>
                        </div>
                        <div class="search-map" ng-controller="mapFullCtrl as mapctrl">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                     version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60"
                                     class="svg-background" xml:space="preserve" width="32px" height="32px">											<g>
                                        <path d="M30,26c3.86,0,7-3.141,7-7s-3.14-7-7-7s-7,3.141-7,7S26.14,26,30,26z M30,14c2.757,0,5,2.243,5,5s-2.243,5-5,5   s-5-2.243-5-5S27.243,14,30,14z"
                                              fill="#FFFFFF"/>
                                        <path d="M29.823,54.757L45.164,32.6c5.754-7.671,4.922-20.28-1.781-26.982C39.761,1.995,34.945,0,29.823,0   s-9.938,1.995-13.56,5.617c-6.703,6.702-7.535,19.311-1.804,26.952L29.823,54.757z M17.677,7.031C20.922,3.787,25.235,2,29.823,2   s8.901,1.787,12.146,5.031c6.05,6.049,6.795,17.437,1.573,24.399L29.823,51.243L16.082,31.4   C10.882,24.468,11.628,13.08,17.677,7.031z"
                                              fill="#FFFFFF"/>
                                        <path d="M42.117,43.007c-0.55-0.067-1.046,0.327-1.11,0.876s0.328,1.046,0.876,1.11C52.399,46.231,58,49.567,58,51.5   c0,2.714-10.652,6.5-28,6.5S2,54.214,2,51.5c0-1.933,5.601-5.269,16.117-6.507c0.548-0.064,0.94-0.562,0.876-1.11   c-0.065-0.549-0.561-0.945-1.11-0.876C7.354,44.247,0,47.739,0,51.5C0,55.724,10.305,60,30,60s30-4.276,30-8.5   C60,47.739,52.646,44.247,42.117,43.007z"
                                              fill="#FFFFFF"/>
                                    </g>										</svg>
                                <div>
                                    <div class="toolbar-out select-wrapper"><select ng-model="mapctrl.district"
                                                                                    ng-change="mapctrl.showMapByDistrict(undefined)">
                                            <option value="default" selected disabled>Search on map</option>
                                            <option value="paphos">Paphos</option>
                                            <option value="famagusta">Famagusta</option>
                                            <option value="nicosia">Nicosia</option>
                                            <option value="limassol">Limassol</option>
                                            <option value="larnaca">Larnaca</option>
                                        </select></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <div class="search-area-location-filter" id="edit-filter">
        <div class="search-location-container">
            <div>
                <div class="search-title-mobile bs-flex">
                    <div>Enter location</div>
                    <div class="search-title-close"><a href="#" onclick="hideFilters()"> <i aria-hidden="true"
                                                                                            class="fa fa-times"></i>
                        </a></div>
                </div>
                <label class="location-label-results">Search results for</label>
                <div class="search-location bs-flex">
                    <div class="search-location-input">
                        <typeahead data-ng-model="lctrl.selectedRegions" items="regions" displaytag="label"
                                   displayitem="label" selected-items="lctrl.requestedRegions"
                                   control="typeaheadControl2" controlid="'typeahead2'"></typeahead>
                    </div>
                    <div class="search-location-button">
                        <button ng-click="getNewListings()"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="search-edit">
            <div><a href="#edit-filter" onclick="showFilters()">Edit Search Filters {{ lctrl.searchCriteriaCount > 0 ? "
                    (" + lctrl.searchCriteriaCount + ")" : "" }}</a></div>
        </div>
    </div>
    <div class="search-area-mobile" id="search-area-mobile" ng-controller="MoreSearchCtrl as msctrl">
        <div class="search-row">
            <div class="control-group">
                <div class="bs-flex control-checkbox">
                    <div class="control-checkbox-label"><label for="nearby-regions">Include nearby locations</label>
                    </div>
                    <div class="control-checkbox-box"><input type="checkbox" ng-model="search.searchNearby"
                                                             id="nearby-regions"/></div>
                </div>
            </div>
        </div>
        <div class="search-row-select">
            <div class="control-group">
                <div class="select-wrapper"><select ng-model="search.currency"
                                                    ng-options="obj.value as obj.text for obj in lctrl.currenciesAvailable"
                                                    ng-change="lctrl.mCurrencyChanged()"></select>
                    <div class="select__arrow"></div>
                </div>
            </div>
        </div>
        <div class="search-row-select">
            <div class="control-group">
                <div class="bs-flex">
                    <div class="select-wrapper"><select ng-model="search.minprice"
                                                        ng-options="price as (price == 0 ? 'Min Price' : (price | currency:lctrl.currencySymbol:0)) for price in lctrl.minPrices"
                                                        ng-change="lctrl.mMinPriceChanged()"></select>
                        <div class="select__arrow"></div>
                    </div>
                    <div class="select-wrapper"><select ng-model="search.maxprice"
                                                        ng-options="price as (price == 0 ? 'Max Price' : (price | currency:lctrl.currencySymbol:0)) for price in lctrl.maxPrices"
                                                        ng-change="lctrl.mMaxPriceChanged()"></select>
                        <div class="select__arrow"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="search-row-select">
            <div class="control-group">
                <div class="bs-flex">
                    <div class="select-wrapper"><select ng-model="search.minbeds"
                                                        ng-options="bed as (bed == -1 ? 'Min Beds' : (bed == 0 ? 'Studio' : bed + ' Bed')) for bed in lctrl.minBedsAvailable"
                                                        ng-change="lctrl.mMinBedsChanged()"></select>
                        <div class="select__arrow"></div>
                    </div>
                    <div class="select-wrapper"><select ng-model="search.maxbeds"
                                                        ng-options="bed as (bed == -1 ? 'Max Beds' : (bed == 0 ? 'Studio' : bed + ' Bed')) for bed in lctrl.maxBedsAvailable"
                                                        ng-change="lctrl.mMaxBedsChanged()"></select>
                        <div class="select__arrow"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="search-row">
            <div class="control-group">
                <div class="control-group-title">Type</div>
                <div class="bs-flex control-checkbox">
                    <div class="control-checkbox-label"><label for="pthouse">Houses</label></div>
                    <div class="control-checkbox-box"><input type="checkbox" ng-model="search.pthouse" id="pthouse"
                                                             ng-click="lctrl.setPropertyTypes('house', false)"/></div>
                </div>
                <div class="bs-flex control-checkbox">
                    <div class="control-checkbox-label"><label for="ptapartment">Apartments</label></div>
                    <div class="control-checkbox-box"><input type="checkbox" ng-model="search.ptapartment"
                                                             id="ptapartment"
                                                             ng-click="lctrl.setPropertyTypes('apartment', false)"/>
                    </div>
                </div>
                <div class="bs-flex control-checkbox">
                    <div class="control-checkbox-label"><label for="ptland">Land</label></div>
                    <div class="control-checkbox-box"><input type="checkbox" ng-model="search.ptland" id="ptland"
                                                             ng-click="lctrl.setPropertyTypes('land', false)"/></div>
                </div>
                <div class="bs-flex control-checkbox">
                    <div class="control-checkbox-label"><label for="ptcommercial">Commercial</label></div>
                    <div class="control-checkbox-box"><input type="checkbox" ng-model="search.ptcommercial"
                                                             id="ptcommercial"
                                                             ng-click="lctrl.setPropertyTypes('commercial', false)"/>
                    </div>
                </div>
            </div>
        </div>
        <label class="more-filters-label" for="more-filters">More filters</label> <input id="more-filters"
                                                                                         type="checkbox"/>
        <div class="more-filters">
            <div class="search-row-select" ng-if="propertyTypesSelected.length === 1">
                <div class="control-group">
                    <div class="bs-flex">
                        <div class="select-wrapper"><select ng-model="msctrl.propertySubTypeSelected"
                                                            ng-options="subtype.name as subtype.label for subtype in msctrl.propertySubTypes"
                                                            ng-change="msctrl.mPropertySubtypeChanged()">
                                <option value="">All subtypes</option>
                            </select>
                            <div class="select__arrow"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-row-select">
                <div class="control-group">
                    <div class="bs-flex">
                        <div class="select-wrapper"><select ng-model="search.minbaths"
                                                            ng-options="bath as (bath == 0 ? 'No min Baths' : bath + ' Bath') for bath in msctrl.minBathsAvailable"
                                                            ng-change="msctrl.mMinBathsChanged()"></select>
                            <div class="select__arrow"></div>
                        </div>
                        <div class="select-wrapper"><select ng-model="search.maxbaths"
                                                            ng-options="bath as (bath == 0 ? 'No max Baths' : bath + ' Bath') for bath in msctrl.maxBathsAvailable"
                                                            ng-change="msctrl.mMaxBathsChanged()"></select>
                            <div class="select__arrow"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-row-select">
                <div class="control-group">
                    <div class="bs-flex">
                        <div class="select-wrapper"><select ng-model="search.minArea"
                                                            ng-options="area as (area == 0 ? 'No min size' : area + ' Min Sq. Meters') for area in msctrl.minAreaAvailable"
                                                            ng-change="msctrl.mMinAreaChanged()"></select>
                            <div class="select__arrow"></div>
                        </div>
                        <div class="select-wrapper"><select ng-model="search.maxArea"
                                                            ng-options="area as (area == 0 ? 'No max size' : area + ' Max Sq. Meters') for area in msctrl.maxAreaAvailable"
                                                            ng-change="msctrl.mMaxAreaChanged()"></select>
                            <div class="select__arrow"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-row-select">
                <div class="control-group">
                    <div class="bs-flex">
                        <div class="select-wrapper"><select ng-model="search.minPlotSize"
                                                            ng-options="area as (area == 0 ? 'No min plot' : area + ' Min Plot Size') for area in msctrl.minPlotAreaAvailable"
                                                            ng-change="msctrl.mMinPlotAreaChanged()"></select>
                            <div class="select__arrow"></div>
                        </div>
                        <div class="select-wrapper"><select ng-model="search.maxPlotSize"
                                                            ng-options="area as (area == 0 ? 'No max plot' : area + ' Max Plot Size') for area in msctrl.maxPlotAreaAvailable"
                                                            ng-change="msctrl.mMaxPlotAreaChanged()"></select>
                            <div class="select__arrow"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-row-select">
                <div class="control-group">
                    <div class="bs-flex">
                        <div class="select-wrapper"><select ng-model="search.minYearBuilt"
                                                            ng-options="year as (year == 0 ? 'No min age' : 'Built after ' + year) for year in msctrl.minYearsAvailable"
                                                            ng-change="msctrl.mMinYearChanged()"></select>
                            <div class="select__arrow"></div>
                        </div>
                        <div class="select-wrapper"><select ng-model="search.maxYearBuilt"
                                                            ng-options="year as (year == 0 ? 'No max age' : 'Built before ' + year) for year in msctrl.maxYearsAvailable"
                                                            ng-change="msctrl.mMaxYearChanged()"></select>
                            <div class="select__arrow"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-row">
                <div><label class="input-label">Keywords (e.g. pool, fireplace)</label> <textarea
                            ng-model="search.keywords" rows="5" md-select-on-focus=""></textarea></div>
            </div>
        </div>
        <div class="search-row">
            <div class="search-button-height">&nbsp;</div>
        </div>
        <div class="search-button bs-flex">
            <div class="button-left">
                <button ng-click="resetSearch(true)">Clear</button>
            </div>
            <div class="button-right"><a href="javascript:void(0)" ng-click="findProperties()"> <i class="fa fa-search"
                                                                                                   aria-hidden="true"></i>
                    Find properties </a></div>
        </div>
    </div>
    <div class="search-sub-container">
        <div class="home-responsive">
            <div class="search-nearby-locations"><label class="toggle-switch"> <input id="nearby-regions-d"
                                                                                      type="checkbox"
                                                                                      ng-model="search.searchNearby"
                                                                                      ng-change="lctrl.searchNearbyChanged()"/>
                    <div class="slider round"></div>
                </label> <label for="nearby-regions-d" class="cursorhand">&nbsp;Include nearby locations</label></div>
            <div class="search-sub-buttons">
                <div>
                    <div class="select-wrapper search-results-sort"><select ng-model="search.listingsOrder"
                                                                            ng-options="order.code as order.name for order in lctrl.listingsSort"
                                                                            ng-change="lctrl.listingOrderChanged()"></select>
                        <div class="select__arrow"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="search-results-container"><input type="hidden" name="listings-count" id="listings-count" value="7">
        <div class="home-responsive">
            <div class="bs-container search-top-description"><b>Property search results:</b> Found 7 available
                properties for sale in Cyprus. In this search there are 5 Apartments and Flats for sale in Cyprus, 2
                Plots and Land for sale in Cyprus.
            </div>
        </div>
        <div class="properties-found home-responsive">
            <div class="left-right">
                <div class="bs-text-property-found" id="propertiesFound"><span>Page 1 of 1 - 7 results found</span>
                </div>
            </div>
        </div>
        <div id="search-results" class="search-results padding-top home-responsive">
            <section id="listing-swipers" class="listing"><input ng-repeat="listing in listings" type="checkbox"
                                                                 id="grid-item-0" class="bs-card-options-ctrl"/>
                <section id="listingItem0" class="bs-grid-item bs-row-left">
                    <div>
                        <div class="bs-swiper-container bs-swiper-container-small">
                            <div id="bs-slider-container0"
                                 class="swiper-container swiper-container-small bs-slider swiper0">
                                <div class="swiper-wrapper"
                                     onclick="swiperClick('http://buysellcyprus.com/property-for-sale/paphos/choletria/plot-for-sale-choletria-paphos-660426.html')">
                                    <div class="swiper-slide"><img data-src="/img/empty.png" alt="empty image"
                                                                   title="empty image"
                                                                   class="swiper-lazy swiper-slide-img">
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                                <div class="bs-slider-arrow bs-slider-arrow-right bs-md-button"><i
                                            class="fa fa-angle-right fa-3x bs-slider-arrow-content"
                                            onclick="swiperNext(0);" aria-hidden="true"></i></div>
                                <div class="bs-slider-arrow bs-slider-arrow-left bs-md-button"><i
                                            class="fa fa-angle-left fa-3x bs-slider-arrow-content"
                                            onclick="swiperPrevious(0);" aria-hidden="true"></i></div>
                                <div class="bs-card-media-label-status bs-md-whiteframe-6dp ff-special"></div>
                                <div class="bs-card-media-fullscreen"><i class="fa fa-expand fa-2x bs-maximize"
                                                                         onclick="fullscreen_click(0, 660426, ['images/default/6/26/426/undefined-photo-386393.jpg','images/default/6/26/426/undefined-photo-386395.jpg','images/default/6/26/426/undefined-photo-386397.jpg','images/default/6/26/426/undefined-photo-386398.jpg','images/default/6/26/426/undefined-photo-386404.jpg','images/default/6/26/426/undefined-photo-386400.jpg','images/default/6/26/426/undefined-photo-386402.jpg','images/default/6/26/426/undefined-photo-386405.jpg','images/default/6/26/426/undefined-photo-386409.jpg','images/default/6/26/426/undefined-photo-386408.jpg','images/default/6/26/426/undefined-photo-386406.jpg','images/default/6/26/426/undefined-photo-386412.jpg','images/default/6/26/426/undefined-photo-386410.jpg','images/default/6/26/426/undefined-photo-386411.jpg','images/default/6/26/426/undefined-photo-386413.jpg','images/default/6/26/426/undefined-photo-386419.jpg']);"
                                                                         aria-hidden="true"></i></div>
                            </div>
                            <div id="grid-item-favourite-660426" class="bs-card-favorite"
                                 onclick="setFavourite(660426);">
                                <div class="disabled"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                                <div class="enabled"><i class="fa fa-heart" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div class="bs-content bs-content-center bs-card-content">
                            <div class="bs-card-title"><a
                                        href="http://buysellcyprus.com/property-for-sale/paphos/choletria/plot-for-sale-choletria-paphos-660426.html"
                                        target="_blank">615 SQM Plot for sale</a><span> (ID: 660426)</span></div>
                            <div class="bs-card-info">
                                <div class="bs-card-text">Choletria</div>
                                <div class="bs-listing-price">
                                    <div class="bs-card-text-price">€39,950</div>
                                </div>
                            </div>
                        </div>
                </section>
                <input ng-repeat="listing in listings" type="checkbox" id="grid-item-1" class="bs-card-options-ctrl"/>
                <section id="listingItem1" class="bs-grid-item bs-row-left">
                    <div>
                        <div class="bs-swiper-container bs-swiper-container-small">
                            <div id="bs-slider-container1"
                                 class="swiper-container swiper-container-small bs-slider swiper1">
                                <div class="swiper-wrapper"
                                     onclick="swiperClick('http://buysellcyprus.com/property-for-sale/paphos/peyia/studio-apartment-for-sale-peyia-paphos-638818.html')">
                                    <div class="swiper-slide"><img data-src="/img/empty.png" alt="empty image"
                                                                   title="empty image"
                                                                   class="swiper-lazy swiper-slide-img">
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                                <div class="bs-slider-arrow bs-slider-arrow-right bs-md-button"><i
                                            class="fa fa-angle-right fa-3x bs-slider-arrow-content"
                                            onclick="swiperNext(1);" aria-hidden="true"></i></div>
                                <div class="bs-slider-arrow bs-slider-arrow-left bs-md-button"><i
                                            class="fa fa-angle-left fa-3x bs-slider-arrow-content"
                                            onclick="swiperPrevious(1);" aria-hidden="true"></i></div>
                                <div class="bs-card-media-label-status bs-md-whiteframe-6dp ff-special"></div>
                                <div class="bs-card-media-fullscreen"><i class="fa fa-expand fa-2x bs-maximize"
                                                                         onclick="fullscreen_click(1, 638818, ['images/default/8/18/818/undefined-photo-345211.JPG','images/default/8/18/818/undefined-photo-345212.JPG','images/default/8/18/818/undefined-photo-345213.JPG','images/default/8/18/818/undefined-photo-345214.JPG','images/default/8/18/818/undefined-photo-345215.JPG','images/default/8/18/818/undefined-photo-345216.JPG','images/default/8/18/818/undefined-photo-345217.JPG','images/default/8/18/818/undefined-photo-345218.JPG']);"
                                                                         aria-hidden="true"></i></div>
                            </div>
                            <div id="grid-item-favourite-638818" class="bs-card-favorite"
                                 onclick="setFavourite(638818);">
                                <div class="disabled"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                                <div class="enabled"><i class="fa fa-heart" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div class="bs-content bs-content-center bs-card-content">
                            <div class="bs-card-title"><a
                                        href="http://buysellcyprus.com/property-for-sale/paphos/peyia/studio-apartment-for-sale-peyia-paphos-638818.html"
                                        target="_blank">Studio Apartment for sale</a><span> (ID: 638818)</span></div>
                            <div class="bs-card-info">
                                <div class="bs-card-text">Peyia</div>
                                <div class="bs-listing-price">
                                    <div class="bs-card-text-price">€45,000</div>
                                </div>
                            </div>
                        </div>
                </section>
                <input ng-repeat="listing in listings" type="checkbox" id="grid-item-2" class="bs-card-options-ctrl"/>
                <section id="listingItem2" class="bs-grid-item bs-row-left">
                    <div>
                        <div class="bs-swiper-container bs-swiper-container-small">
                            <div id="bs-slider-container2"
                                 class="swiper-container swiper-container-small bs-slider swiper2">
                                <div class="swiper-wrapper"
                                     onclick="swiperClick('http://buysellcyprus.com/property-for-sale/paphos/peyia/studio-ground-floor-apartment-for-sale-peyia-paphos-639193.html')">
                                    <div class="swiper-slide"><img data-src="/img/empty.png" alt="empty image"
                                                                   title="empty image"
                                                                   class="swiper-lazy swiper-slide-img">
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                                <div class="bs-slider-arrow bs-slider-arrow-right bs-md-button"><i
                                            class="fa fa-angle-right fa-3x bs-slider-arrow-content"
                                            onclick="swiperNext(2);" aria-hidden="true"></i></div>
                                <div class="bs-slider-arrow bs-slider-arrow-left bs-md-button"><i
                                            class="fa fa-angle-left fa-3x bs-slider-arrow-content"
                                            onclick="swiperPrevious(2);" aria-hidden="true"></i></div>
                                <div class="bs-card-media-label-status bs-md-whiteframe-6dp ff-special"></div>
                                <div class="bs-card-media-fullscreen"><i class="fa fa-expand fa-2x bs-maximize"
                                                                         onclick="fullscreen_click(2, 639193, ['images/default/3/93/193/undefined-photo-345400.jpg','images/default/3/93/193/undefined-photo-345401.jpg','images/default/3/93/193/undefined-photo-345408.jpg','images/default/3/93/193/undefined-photo-345411.jpg','images/default/3/93/193/undefined-photo-345417.jpg','images/default/3/93/193/undefined-photo-345418.jpg','images/default/3/93/193/undefined-photo-345414.jpg','images/default/3/93/193/undefined-photo-345415.jpg']);"
                                                                         aria-hidden="true"></i></div>
                            </div>
                            <div id="grid-item-favourite-639193" class="bs-card-favorite"
                                 onclick="setFavourite(639193);">
                                <div class="disabled"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                                <div class="enabled"><i class="fa fa-heart" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div class="bs-content bs-content-center bs-card-content">
                            <div class="bs-card-title"><a
                                        href="http://buysellcyprus.com/property-for-sale/paphos/peyia/studio-ground-floor-apartment-for-sale-peyia-paphos-639193.html"
                                        target="_blank">Studio Ground floor apartment for
                                    sale</a><span> (ID: 639193)</span></div>
                            <div class="bs-card-info">
                                <div class="bs-card-text">Peyia</div>
                                <div class="bs-listing-price">
                                    <div class="bs-card-text-price">€45,000</div>
                                </div>
                            </div>
                        </div>
                </section>
                <section id="listingItem28" class="bs-grid-item bs-row-left">
                    <div class="filler-ad">
                        <div class="bs-content bs-content-center bs-card-content">
                            <div><span class="color-yellow">How to sell your home in 60 days</span> at the highest
                                possible price
                            </div>
                        </div>
                        <div class="ad-container">
                            <div class="btn3d-container"><a href="/home-valuation" target="_self">
                                    <div class="big-btn3d">
                                        <button class="btn3d">Free home valuation</button>
                                    </div>
                                </a></div>
                        </div>
                    </div>
                </section>
                <input ng-repeat="listing in listings" type="checkbox" id="grid-item-3" class="bs-card-options-ctrl"/>
                <section id="listingItem3" class="bs-grid-item bs-row-left">
                    <div>
                        <div class="bs-swiper-container bs-swiper-container-small">
                            <div id="bs-slider-container3"
                                 class="swiper-container swiper-container-small bs-slider swiper3">
                                <div class="swiper-wrapper"
                                     onclick="swiperClick('http://buysellcyprus.com/property-for-sale/paphos/peyia/studio-apartment-for-sale-peyia-paphos-664992.html')">
                                    <div class="swiper-slide"><img data-src="/img/empty.png" alt="empty image"
                                                                   title="empty image"
                                                                   class="swiper-lazy swiper-slide-img">
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                                <div class="bs-slider-arrow bs-slider-arrow-right bs-md-button"><i
                                            class="fa fa-angle-right fa-3x bs-slider-arrow-content"
                                            onclick="swiperNext(3);" aria-hidden="true"></i></div>
                                <div class="bs-slider-arrow bs-slider-arrow-left bs-md-button"><i
                                            class="fa fa-angle-left fa-3x bs-slider-arrow-content"
                                            onclick="swiperPrevious(3);" aria-hidden="true"></i></div>
                                <div class="bs-card-media-label-status bs-md-whiteframe-6dp ff-special">JUST LISTED
                                </div>
                                <div class="bs-card-media-fullscreen"><i class="fa fa-expand fa-2x bs-maximize"
                                                                         onclick="fullscreen_click(3, 664992, ['images/default/2/92/992/undefined-photo-388169.jpg','images/default/2/92/992/undefined-photo-388178.jpg','images/default/2/92/992/undefined-photo-388180.jpg','images/default/2/92/992/undefined-photo-388181.jpg','images/default/2/92/992/undefined-photo-388182.jpg','images/default/2/92/992/undefined-photo-388183.jpg','images/default/2/92/992/undefined-photo-388170.jpg','images/default/2/92/992/undefined-photo-388179.jpg','images/default/2/92/992/undefined-photo-388177.jpg']);"
                                                                         aria-hidden="true"></i></div>
                            </div>
                            <div id="grid-item-favourite-664992" class="bs-card-favorite"
                                 onclick="setFavourite(664992);">
                                <div class="disabled"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                                <div class="enabled"><i class="fa fa-heart" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div class="bs-content bs-content-center bs-card-content">
                            <div class="bs-card-title"><a
                                        href="http://buysellcyprus.com/property-for-sale/paphos/peyia/studio-apartment-for-sale-peyia-paphos-664992.html"
                                        target="_blank">Studio Apartment for sale</a><span> (ID: 664992)</span></div>
                            <div class="bs-card-info">
                                <div class="bs-card-text">Peyia</div>
                                <div class="bs-listing-price">
                                    <div class="bs-card-text-price">€45,000</div>
                                    <div class="bs-deal" ng-if="listing.featured">
                                        <div class="bs-deal-left-box">deal</div>
                                        <div class="bs-deal-right-box"><img alt="money-bag" src="img/money_bag.png">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>
                <input ng-repeat="listing in listings" type="checkbox" id="grid-item-4" class="bs-card-options-ctrl"/>
                <section id="listingItem4" class="bs-grid-item bs-row-left">
                    <div>
                        <div class="bs-swiper-container bs-swiper-container-small">
                            <div id="bs-slider-container4"
                                 class="swiper-container swiper-container-small bs-slider swiper4">
                                <div class="swiper-wrapper"
                                     onclick="swiperClick('http://buysellcyprus.com/property-for-sale/famagusta/frenaros/1-bed-ground-floor-apartment-for-sale-frenaros-famagusta-625948.html')">
                                    <div class="swiper-slide"><img data-src="/img/empty.png" alt="empty image"
                                                                   title="empty image"
                                                                   class="swiper-lazy swiper-slide-img">
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                                <div class="bs-slider-arrow bs-slider-arrow-right bs-md-button"><i
                                            class="fa fa-angle-right fa-3x bs-slider-arrow-content"
                                            onclick="swiperNext(4);" aria-hidden="true"></i></div>
                                <div class="bs-slider-arrow bs-slider-arrow-left bs-md-button"><i
                                            class="fa fa-angle-left fa-3x bs-slider-arrow-content"
                                            onclick="swiperPrevious(4);" aria-hidden="true"></i></div>
                                <div class="bs-card-media-label-status bs-md-whiteframe-6dp ff-special"></div>
                                <div class="bs-card-media-fullscreen"><i class="fa fa-expand fa-2x bs-maximize"
                                                                         onclick="fullscreen_click(4, 625948, ['images/default/8/48/948/undefined-photo-314992.JPG','images/default/8/48/948/undefined-photo-314993.JPG','images/default/8/48/948/undefined-photo-314991.JPG','images/default/8/48/948/undefined-photo-314994.JPG','images/default/8/48/948/undefined-photo-314995.JPG','images/default/8/48/948/undefined-photo-314999.JPG','images/default/8/48/948/undefined-photo-314996.JPG','images/default/8/48/948/undefined-photo-314997.JPG','images/default/8/48/948/undefined-photo-314998.JPG','images/default/8/48/948/undefined-photo-315001.JPG','images/default/8/48/948/undefined-photo-315002.JPG','images/default/8/48/948/undefined-photo-315000.JPG','images/default/8/48/948/undefined-photo-315004.JPG','images/default/8/48/948/undefined-photo-315005.JPG','images/default/8/48/948/undefined-photo-315003.JPG','images/default/8/48/948/undefined-photo-315006.JPG','images/default/8/48/948/undefined-photo-315171.jpg','images/default/8/48/948/undefined-photo-315173.JPG','images/default/8/48/948/undefined-photo-315172.jpg','images/default/8/48/948/undefined-photo-315169.jpg']);"
                                                                         aria-hidden="true"></i></div>
                            </div>
                            <div id="grid-item-favourite-625948" class="bs-card-favorite"
                                 onclick="setFavourite(625948);">
                                <div class="disabled"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                                <div class="enabled"><i class="fa fa-heart" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div class="bs-content bs-content-center bs-card-content">
                            <div class="bs-card-title"><a
                                        href="http://buysellcyprus.com/property-for-sale/famagusta/frenaros/1-bed-ground-floor-apartment-for-sale-frenaros-famagusta-625948.html"
                                        target="_blank">1 Bedroom Ground floor apartment for
                                    sale</a><span> (ID: 625948)</span></div>
                            <div class="bs-card-info">
                                <div class="bs-card-text">Frenaros</div>
                                <div class="bs-listing-price">
                                    <div class="bs-card-text-price">€46,000</div>
                                </div>
                            </div>
                        </div>
                </section>
                <input ng-repeat="listing in listings" type="checkbox" id="grid-item-5" class="bs-card-options-ctrl"/>
                <section id="listingItem5" class="bs-grid-item bs-row-left">
                    <div>
                        <div class="bs-swiper-container bs-swiper-container-small">
                            <div id="bs-slider-container5"
                                 class="swiper-container swiper-container-small bs-slider swiper5">
                                <div class="swiper-wrapper"
                                     onclick="swiperClick('http://buysellcyprus.com/property-for-sale/famagusta/xylophagou/1-bed-apartment-for-sale-xylophagou-famagusta-640606.html')">
                                    <div class="swiper-slide"><img data-src="/img/empty.png" alt="empty image"
                                                                   title="empty image"
                                                                   class="swiper-lazy swiper-slide-img">
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                                <div class="bs-slider-arrow bs-slider-arrow-right bs-md-button"><i
                                            class="fa fa-angle-right fa-3x bs-slider-arrow-content"
                                            onclick="swiperNext(5);" aria-hidden="true"></i></div>
                                <div class="bs-slider-arrow bs-slider-arrow-left bs-md-button"><i
                                            class="fa fa-angle-left fa-3x bs-slider-arrow-content"
                                            onclick="swiperPrevious(5);" aria-hidden="true"></i></div>
                                <div class="bs-card-media-label-status bs-md-whiteframe-6dp ff-special"></div>
                                <div class="bs-card-media-fullscreen"><i class="fa fa-expand fa-2x bs-maximize"
                                                                         onclick="fullscreen_click(5, 640606, ['images/default/6/06/606/undefined-photo-347383.JPG','images/default/6/06/606/undefined-photo-347386.JPG','images/default/6/06/606/undefined-photo-347368.JPG','images/default/6/06/606/undefined-photo-347370.JPG','images/default/6/06/606/undefined-photo-347371.JPG','images/default/6/06/606/undefined-photo-347379.JPG','images/default/6/06/606/undefined-photo-347365.JPG','images/default/6/06/606/undefined-photo-347375.JPG','images/default/6/06/606/undefined-photo-347372.JPG','images/default/6/06/606/undefined-photo-347373.JPG','images/default/6/06/606/undefined-photo-347374.JPG','images/default/6/06/606/undefined-photo-347366.JPG','images/default/6/06/606/undefined-photo-347360.JPG','images/default/6/06/606/undefined-photo-347362.JPG','images/default/6/06/606/undefined-photo-347364.JPG','images/default/6/06/606/undefined-photo-347361.JPG','images/default/6/06/606/undefined-photo-347363.JPG','images/default/6/06/606/undefined-photo-347384.JPG','images/default/6/06/606/undefined-photo-347367.JPG','images/default/6/06/606/undefined-photo-347369.JPG','images/default/6/06/606/undefined-photo-347378.JPG','images/default/6/06/606/undefined-photo-347376.JPG','images/default/6/06/606/undefined-photo-347387.JPG','images/default/6/06/606/undefined-photo-347377.JPG','images/default/6/06/606/undefined-photo-347381.JPG','images/default/6/06/606/undefined-photo-347380.JPG','images/default/6/06/606/undefined-photo-347382.JPG','images/default/6/06/606/undefined-photo-347385.JPG']);"
                                                                         aria-hidden="true"></i></div>
                            </div>
                            <div id="grid-item-favourite-640606" class="bs-card-favorite"
                                 onclick="setFavourite(640606);">
                                <div class="disabled"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                                <div class="enabled"><i class="fa fa-heart" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div class="bs-content bs-content-center bs-card-content">
                            <div class="bs-card-title"><a
                                        href="http://buysellcyprus.com/property-for-sale/famagusta/xylophagou/1-bed-apartment-for-sale-xylophagou-famagusta-640606.html"
                                        target="_blank">1 Bedroom Apartment for sale</a><span> (ID: 640606)</span></div>
                            <div class="bs-card-info">
                                <div class="bs-card-text">Xylophagou</div>
                                <div class="bs-listing-price">
                                    <div class="bs-card-text-price">€49,900</div>
                                </div>
                            </div>
                        </div>
                </section>
                <input ng-repeat="listing in listings" type="checkbox" id="grid-item-6" class="bs-card-options-ctrl"/>
                <section id="listingItem6" class="bs-grid-item bs-row-left">
                    <div>
                        <div class="bs-swiper-container bs-swiper-container-small">
                            <div id="bs-slider-container6"
                                 class="swiper-container swiper-container-small bs-slider swiper6">
                                <div class="swiper-wrapper"
                                     onclick="swiperClick('http://buysellcyprus.com/property-for-sale/famagusta/liopetri/land-for-sale-liopetri-famagusta-639176.html')">
                                    <div class="swiper-slide"><img data-src="/img/empty.png" alt="empty image"
                                                                   title="empty image"
                                                                   class="swiper-lazy swiper-slide-img">
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                                <div class="bs-slider-arrow bs-slider-arrow-right bs-md-button"><i
                                            class="fa fa-angle-right fa-3x bs-slider-arrow-content"
                                            onclick="swiperNext(6);" aria-hidden="true"></i></div>
                                <div class="bs-slider-arrow bs-slider-arrow-left bs-md-button"><i
                                            class="fa fa-angle-left fa-3x bs-slider-arrow-content"
                                            onclick="swiperPrevious(6);" aria-hidden="true"></i></div>
                                <div class="bs-card-media-label-status bs-md-whiteframe-6dp ff-special"></div>
                                <div class="bs-card-media-fullscreen"><i class="fa fa-expand fa-2x bs-maximize"
                                                                         onclick="fullscreen_click(6, 639176, ['images/default/6/76/176/undefined-photo-345386.JPG','images/default/6/76/176/undefined-photo-345385.JPG','images/default/6/76/176/undefined-photo-345384.JPG','images/default/6/76/176/undefined-photo-345389.jpg','images/default/6/76/176/undefined-photo-345391.jpg','images/default/6/76/176/undefined-photo-345392.jpg','images/default/6/76/176/undefined-photo-345390.JPG','images/default/6/76/176/undefined-photo-345393.jpg','images/default/6/76/176/undefined-photo-345395.JPG']);"
                                                                         aria-hidden="true"></i></div>
                            </div>
                            <div id="grid-item-favourite-639176" class="bs-card-favorite"
                                 onclick="setFavourite(639176);">
                                <div class="disabled"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                                <div class="enabled"><i class="fa fa-heart" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div class="bs-content bs-content-center bs-card-content">
                            <div class="bs-card-title"><a
                                        href="http://buysellcyprus.com/property-for-sale/famagusta/liopetri/land-for-sale-liopetri-famagusta-639176.html"
                                        target="_blank">4791 SQM Land for sale</a><span> (ID: 639176)</span></div>
                            <div class="bs-card-info">
                                <div class="bs-card-text">Liopetri</div>
                                <div class="bs-listing-price">
                                    <div class="bs-card-text-price">€50,000</div>
                                </div>
                            </div>
                        </div>
                </section>
                <section id="listingItem25" class="bs-grid-item bs-row-left">
                    <div class="filler-ad">
                        <div class="bs-content bs-content-center bs-card-content">Can't find the property you want?
                        </div>
                        <div class="ad-container">
                            <div class="btn3d-container"><a href="/contact" target="_self">
                                    <div class="big-btn3d">
                                        <button class="btn3d">Speak with an expert</button>
                                    </div>
                                </a></div>
                        </div>
                    </div>
                </section>
                <section id="listingItem26" class="bs-grid-item bs-row-left">
                    <div class="filler-ad">
                        <div class="bs-content bs-content-center bs-card-content">Thinking of selling your home?</div>
                        <div class="ad-container">
                            <div class="btn3d-container"><a href="/sell-home" target="_self">
                                    <div class="big-btn3d">
                                        <button class="btn3d">Free home valuation</button>
                                    </div>
                                </a></div>
                        </div>
                    </div>
                </section>
                <section id="listingItem27" class="bs-grid-item bs-row-left">
                    <div class="filler-ad">
                        <div class="bs-content bs-content-center bs-card-content">How to buy a home and get Cyprus (EU)
                            Passport in 90 days?
                        </div>
                        <div class="ad-container">
                            <div class="btn3d-container"><a href="http://www.buysellpassport.com/" target="_blank">
                                    <div class="big-btn3d">
                                        <button class="btn3d">Free consultation</button>
                                    </div>
                                </a></div>
                        </div>
                    </div>
                </section>
            </section>
            <div id="results-paging" class="results-paging">
                <div class="page-previous"></div>
                <div class="page-next"></div>
            </div>
        </div>
        <div class="search-bottom-description">
            <div class="home-responsive">
                <div class="bs-container">There are total 2008 available properties in Cyprus. 1111 <a
                            href="/properties-for-sale/type-house/page-1" target="_self">Houses, Townhouses and Villas
                        for sale in Cyprus</a>, 518 <a href="/properties-for-sale/type-apartment/page-1" target="_self">Apartments
                        and Flats for sale in Cyprus</a>, 342 <a href="/properties-for-sale/type-land/page-1"
                                                                 target="_self">Plots and Land for sale in Cyprus</a>,
                    and 37 <a href="/properties-for-sale/type-commercial/page-1" target="_self">commercial and
                        investment projects for sale in Cyprus</a>.<br>House prices for 9654 sold properties in Cyprus.
                    5620 Houses, Townhouses and Villas sold in Cyprus, 3200 Apartments and Flats sold in Cyprus, 829
                    Plots and Land sold in Cyprus, and 5 commercial and investment projects sold in Cyprus.
                    <div class="sold-listings"><a href="/properties-sold/cur-eur/page-1" target="_blank">View sold
                            listings in Cyprus and nearby areas </a></div>
                    <div class="sold-listings btn3d-container"><a href="/home-valuation" target="_self">
                            <div class="small-btn3d">
                                <button class="btn3d">Free home valuation</button>
                            </div>
                        </a></div>
                </div>
            </div>
        </div>
    </div>
</main>
<footer id="footer" class="clearfix fullscreen-hide">
    <div>
        <div class="footer-main-area">
            <div><h2>Cyprus Office Lines</h2>
                <div><b>Paphos:</b> +357 26200000</div>
                <div><b>Limassol:</b> +357 25028939</div>
                <div><b>Nicosia:</b> +357 22027197</div>
                <div><b>Larnaca:</b> +357 24023027</div>
                <div><b>Famagusta:</b> +357 23725959</div>
                <h2>International Lines</h2>
                <div><b>London:</b> +44 20 8133 8535</div>
                <div><b>New York:</b> +1 (347) 688 0932</div>
                <div><b>Hong Kong:</b> +852 8193 21633</div>
            </div>
            <div><h2>Quick Links</h2>
                <div><a href="/properties-for-sale/type-house/sort-lp/page-1" target="_self">Cheap houses for sale in
                        Cyprus</a></div>
                <div><a href="/properties-for-sale/type-apartment/sort-lp/page-1" target="_self">Cheap apartments for
                        sale in Cyprus</a></div>
                <div><a href="/properties-for-sale/type-land/sort-lp/page-1" target="_self">Cheap land for sale in
                        Cyprus</a></div>
                <div><a href="/property-purchase-tax-calculator" target="_self">Property purchase tax calculator</a>
                </div>
            </div>
            <div class="footer-images">
                <div class="anniversary"><img src="img/anniversary_min.png" alt="BuysellCyprus 15 years anniversary"
                                              title="BuysellCyprus 15 years anniversary"></div>
                <div class="buysell-logo"><img src="img/buysell-logo-bw.png" alt="BuysellCyprus logo"
                                               title="BuysellCyprus logo"></div>
            </div>
        </div>
        <div class="bs-menu">
            <div><a href="/terms-and-conditions" target="_self">Terms and conditions</a> <a href="/privacy-policy"
                                                                                            target="_self">Privacy
                    Policy</a> <a href="#" target="_self">Sitemap</a></div>
        </div>
    </div>
</footer>
<script type="text/javascript" src="/js/angular-all.min.js"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXTjUpQqqusJPg2JopxL-3tcpgA1aMMw0"></script>
<script type="text/javascript">            function downloadJSAtOnload() {
        var element = document.createElement("script");
        element.src = "/js/markerwithlabel.js";
        document.body.appendChild(element);
    }

    if (window.addEventListener) window.addEventListener("load", downloadJSAtOnload, false); else if (window.attachEvent) window.attachEvent("onload", downloadJSAtOnload); else window.onload = downloadJSAtOnload;        </script>
<script type="text/javascript" src="/js/alljs.min.js?v=17294"></script>
<script type="text/ng-template" id="tag-template">
    <div class="tag-template">
        <div class="right-panel"><span>{{$getDisplayText()}}</span> <a class="remove-button" ng-click="$removeTag()">&#10006;</a>
        </div>
    </div>        </script>
<script type="text/ng-template" id="autocomplete-template">
    <div class="autocomplete-template">
        <div class="right-panel"><span ng-bind-html="$highlight($getDisplayText())"></span> <span>({{data.type}})</span>
            <span>{{data.label}}</span></div>
    </div>        </script>
<script>            !function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '148627835781002');
    fbq('track', 'Search');
    fbq('track', 'InitiateCheckout');
    fbq('track', 'PageView');        </script>
<noscript><img height="1" width="1" alt="" style="display:none"
               src="https://www.facebook.com/tr?id=148627835781002&ev=PageView&noscript=1"/></noscript>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-75272419-2"></script>
<script>    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'UA-75272419-2');</script>
<script src="https://cdn.jsdelivr.net/ga-lite/latest/ga-lite.min.js" async></script>
<script>    var galite = galite || {};
    galite.UA = "UA-92965152-1";</script>
</body>
</html>