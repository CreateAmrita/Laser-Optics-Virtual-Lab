var dataCacheName = 'Vlab_Michelsons_Interferometer_Refractive_Index_of_Glass_Plate';
var cacheName = 'Cache_Michelsons_Interferometer_Refractive_Index_of_Glass_Plate';
var filesToCache = [ 
	'./',	
	'index.html',	
	'css/experiment.css',
	'images/background.png',
	'images/argon_laser_arrow.svg',
	'images/argon_laser.svg',
	'images/equipment1.svg',
	'images/equipment2.svg',
	'images/equipment3.svg',
	'images/equipment4.svg',
	'images/equipment5.svg',
	'images/glass_rotate1.svg',
	'images/glass_rotate2.svg',
	'images/glass_rotate3.svg',
	'images/glass_rotate4.svg',
	'images/glass_rotate5.svg',
	'images/glass_rotate6.svg',
	'images/glass_rotate7.svg',
	'images/he_ne_laser.svg',
	'images/he_ne_laser_arrow.svg',
	'images/krypton_laser.svg',
	'images/krypton_laser_arrow.svg',
	'images/micrometer_front_left.svg',
	'images/micrometer_front_right.svg',
	'images/ruby_laser.svg',
	'images/ruby_laser_arrow.svg',
	'images/scale_horizontal.svg',
	'images/scale_vertical.svg',
	'locale/en-IN/messages.po',
	'locale/hi-IN/messages.po',
	'src/app.js',
	'src/view.js',
	'src/experiment.js',
	'src/user_controller.js',
	'../common/assets/css/bootstrap.min.css',
	'../common/assets/css/fonts.googleapis.css',
	'../common/bower_components/angular/angular.js',
	'../common/bower_components/angular/angular.min.js',
	'../common/bower_components/angular-animate/angular-animate.js',
	'../common/bower_components/angular-aria/angular-aria.js',
	'../common/bower_components/angular-chart/angular-charts.js',
	'../common/bower_components/angular-chart/angular-charts.min.js',
	'../common/bower_components/angular-fullscreen/angular-fullscreen.js',
	'../common/bower_components/angular-material/angular-material.css',
	'../common/bower_components/angular-material/angular-material.js',
	'../common/bower_components/angular-material/angular-material_v1.0.7.css',
	'../common/bower_components/angular-material/angular-material_v1.0.7.js',
	'../common/bower_components/angular-sanitize/angular-sanitize.min.js',
	'../common/bower_components/angular-translate/angular-translate.min.js',
	'../common/bower_components/dialogs/dialogs.min.js',
	'../common/bower_components/ui-bootstrap-tpls/ui-bootstrap-tpls-0.11.2.min.js',
	'../common/js/canvasjs.min.js',	
	'../common/js/easeljs-0.7.0.min.js',
	'../common/js/getlanguage.js',
	'../common/js/Gettext.js',	
	'../common/js/stopwatch.js', 	
	'../common/assets/css/app.css',
	'../common/assets/css/dialogs.css',
	'../common/assets/css/icon.css',
	'../common/assets/icons/Icon1.svg',
	'../common/assets/icons/Icon2.svg',
	'../common/assets/icons/Icon3.svg',
	'../common/assets/svg/avatars.svg',
	'../common/assets/svg/menu.svg',	
	'../common/bower_components/angular/angular.js',
	'../common/bower_components/angular/angular.min.js',
	'../common/bower_components/angular-animate/angular-animate.js',
	'../common/bower_components/angular-aria/angular-aria.js',
	'../common/bower_components/angular-chart/angular-charts.js',
	'../common/bower_components/angular-chart/angular-charts.min.js',
	'../common/bower_components/angular-fullscreen/angular-fullscreen.js',
	'../common/bower_components/angular-material/angular-material.css',
	'../common/bower_components/angular-material/angular-material.js',
	'../common/bower_components/angular-material/angular-material_v1.0.7.css',
	'../common/bower_components/angular-material/angular-material_v1.0.7.js',
	'../common/bower_components/angular-sanitize/angular-sanitize.min.js',
	'../common/bower_components/angular-translate/angular-translate.min.js',
	'../common/bower_components/dialogs/dialogs.min.js',
	'../common/bower_components/ui-bootstrap-tpls/ui-bootstrap-tpls-0.11.2.min.js',
	'../common/fonts/1hZf02POANh32k2VkgEoUBTbgVql8nDJpwnrE27mub0.woff2',
	'../common/fonts/-2n2p-_Y08sg57CNWQfKNvesZW2xOQ-xsNqO47m55DA.woff2',
	'../common/fonts/77FXFjRbGzN4aCrSFhlh3hJtnKITppOI_IvcXXDNrsc.woff2',
	'../common/fonts/97uahxiqZRoncBaCEI3aWxJtnKITppOI_IvcXXDNrsc (1).woff2',
	'../common/fonts/cDKhRaXnQTOVbaoxwdOr9xTbgVql8nDJpwnrE27mub0.woff2',
	'../common/fonts/CWB0XYA8bzo0kSThX0UTuA.woff2',
	'../common/fonts/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2',
	'../common/fonts/donefont.woff2',
	'../common/fonts/ek4gzZ-GeXAPcSbHtCeQI_esZW2xOQ-xsNqO47m55DA (1).woff2',
	'../common/fonts/Fcx7Wwv8OzT71A3E1XOAjvesZW2xOQ-xsNqO47m55DA.woff2',
	'../common/fonts/glyphicons-halflings-regular.eot',
	'../common/fonts/glyphicons-halflings-regular.svg',
	'../common/fonts/glyphicons-halflings-regular.ttf',
	'../common/fonts/glyphicons-halflings-regular.woff',
	'../common/fonts/glyphicons-halflings-regular.woff2',
	'../common/fonts/isZ-wbCXNKAbnjo6_TwHThJtnKITppOI_IvcXXDNrsc.woff2',
	'../common/fonts/jSN2CGVDbcVyCnfJfjSdfBJtnKITppOI_IvcXXDNrsc.woff2',
	'../common/fonts/K23cxWVTrIFD6DJsEVi07RTbgVql8nDJpwnrE27mub0.woff2',
	'../common/fonts/mbmhprMH69Zi6eEPBYVFhRJtnKITppOI_IvcXXDNrsc.woff2',
	'../common/fonts/mErvLBYg_cXG3rLvUsKT_fesZW2xOQ-xsNqO47m55DA.woff2',
	'../common/fonts/mx9Uck6uB63VIKFYnEMXrRJtnKITppOI_IvcXXDNrsc(2).woff2',
	'../common/fonts/mx9Uck6uB63VIKFYnEMXrRJtnKITppOI_IvcXXDNrsc.woff2',
	'../common/fonts/NdF9MtnOpLzo-noMoG0miPesZW2xOQ-xsNqO47m55DA.woff2',
	'../common/fonts/oHi30kwQWvpCWqAhzHcCSBJtnKITppOI_IvcXXDNrsc.woff2',
	'../common/fonts/oOeFwZNlrTefzLYmlVV1UBJtnKITppOI_IvcXXDNrsc.woff2',
	'../common/fonts/OpXUqTo0UgQQhGj_SFdLWBTbgVql8nDJpwnrE27mub0.woff2',
	'../common/fonts/PwZc-YbIL414wB9rB1IAPRJtnKITppOI_IvcXXDNrsc.woff2',
	'../common/fonts/rGvHdJnr2l75qb0YND9NyBJtnKITppOI_IvcXXDNrsc.woff2',
	'../common/fonts/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2',
	'../common/fonts/u0TOpm082MNkS5K0Q4rhqvesZW2xOQ-xsNqO47m55DA.woff2',
	'../common/fonts/UX6i4JxQDm3fVTc1CPuwqhJtnKITppOI_IvcXXDNrsc.woff2',
	'../common/fonts/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA (1).woff2',
	'../common/fonts/vSzulfKSK0LLjjfeaxcREhTbgVql8nDJpwnrE27mub0.woff2',
	'../common/fonts/WxrXJa0C3KdtC7lMafG4dRTbgVql8nDJpwnrE27mub0.woff2',
	'../common/fonts/ZLqKeelYbATG60EpZBSDyxJtnKITppOI_IvcXXDNrsc.woff2',	
	'../common/images/play.svg',
	'../common/images/reset.svg',
	'../common/images/stop.svg',
	'../common/images/stopwatch.svg',
	'../common/images/tick_icon.svg',
	'../common/images/wrong_icon.svg',
	'../common/images/icons/android-chrome-192x192.png',
	'../common/images/icons/android-chrome-512x512.png',
	'../common/images/icons/apple-touch-icon.png',
	'../common/images/icons/AU_logo_16.ico',
	'../common/images/icons/AU_logo_16.png',
	'../common/images/icons/clear.svg',
	'../common/images/icons/done.svg',
	'../common/images/icons/favicon-16x16.png',
	'../common/images/icons/favicon-32x32.png',
	'../common/images/icons/favorite.svg',
	'../common/images/icons/get.svg',
	'../common/images/icons/home_icon.svg',
	'../common/images/icons/icon-128x128.png',
	'../common/images/icons/icon-144x144.png',
	'../common/images/icons/icon-152x152.png',
	'../common/images/icons/icon-192x192.png',
	'../common/images/icons/icon-256x256.png',
	'../common/images/icons/icon-32x32.png',
	'../common/images/icons/loading.svg',
	'../common/images/icons/logo_128.png',
	'../common/images/icons/logo_144.png',
	'../common/images/icons/logo_152.png',
	'../common/images/icons/logo_16.png',
	'../common/images/icons/logo_192.png',
	'../common/images/icons/logo_256.png',
	'../common/images/icons/logo_32.png',
	'../common/images/icons/logo_48.png',
	'../common/images/icons/logo_512.png',
	'../common/images/icons/logo_57.png',
	'../common/images/icons/logo_72.png',
	'../common/images/icons/logo_96.png',
	'../common/images/icons/Logo-48-x-48.png',
	'../common/images/icons/menu.svg',
	'../common/images/icons/more_btn.svg',
	'../common/images/icons/mstile-150x150.png',
	'../common/images/icons/right_arrow.svg',	
	'../common/js/createjs-2013.12.12.min.js',
	'../common/js/createjs-2015.05.21.min.js',
	'../common/js/delaytimer.js',	
	'../common/js/loading.js',	
	'../common/js/tweenjs-0.6.2.min.js'	
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
}); 

// ServiceWorker Active
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        // if (key !== cacheName && key !== dataCacheName) {
        //   console.log('[ServiceWorker] Removing old cache', key);
        //   return caches.delete(key);
        // }
      }));
    })
  );
  return self.clients.claim();
});


// The page has made a request
self.addEventListener("fetch", function (event) {
  var requestURL = new URL(event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {

        // we have a copy of the response in our cache, so return it
        if (response) {
          return response;  //no network request necessary
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(  //
          function (response) {

  var shouldCache = false;

  if (response.type === "basic" && response.status === 200) {
    shouldCache = cacheName;
  } else if (response.type === "opaque") {
    // if response isn't from our origin / doesn't support CORS

    if (requestURL.hostname.indexOf(".wikipedia.org") > -1) {
      shouldCache = cacheNameWikipedia;
    } else if (requestURL.hostname.indexOf(".typekit.net") > -1) {
      shouldCache = cacheNameTypekit;
    } else {
      // just let response pass through, don't cache
    }

  }

  if (shouldCache) {
    var responseToCache = response.clone();

    caches.open(shouldCache)
      .then(function (cache) {
        var cacheRequest = event.request.clone();
        cache.put(cacheRequest, responseToCache);
      });
  }

  return response;
}
        );

      })
  );
});