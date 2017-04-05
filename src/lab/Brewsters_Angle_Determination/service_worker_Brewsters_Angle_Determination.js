var dataCacheName = 'Vlab_Brewsters_Angle_Determination';
var cacheName = 'Cache_Brewsters_Angle_Determination';
var filesToCache = [ 
	'./',	
	'index.html',	
	'css/experiment.css',	
	'images/arrow.svg',
	'images/rack.svg',
	'images/glass_plate.svg',
	'images/side_view_bg.svg',
	'images/side_view_bg1.svg',
	'images/side_view_bg2.svg',
	'images/side_view_bg3.svg',
	'images/side_view_bg4.svg',
	'images/current_output_unit.svg',
	'images/detector.svg',
	'images/emitter.svg',
	'images/material_holder.svg',
	'images/polariser.svg',
	'images/dotted_lines.svg',
	'images/table.svg',
	'images/top_measures.svg',
	'images/top_view.png',
	'images/top_view_equipments.svg',
	'images/zoom_measures.svg',
	'locale/en-IN/messages.po',
	'locale/hi-IN/messages.po',
	'locale/ml-IN/messages.po',
	'src/app.js',
	'src/view.js',
	'src/experiment.js',
	'src/user_controller.js',
	'../template/assets/css/bootstrap.min.css',
	'../template/assets/css/fonts.googleapis.css',
	'../template/bower_components/angular/angular.js',
	'../template/bower_components/angular/angular.min.js',
	'../template/bower_components/angular-animate/angular-animate.js',
	'../template/bower_components/angular-aria/angular-aria.js',
	'../template/bower_components/angular-chart/angular-charts.js',
	'../template/bower_components/angular-chart/angular-charts.min.js',
	'../template/bower_components/angular-fullscreen/angular-fullscreen.js',
	'../template/bower_components/angular-material/angular-material.css',
	'../template/bower_components/angular-material/angular-material.js',
	'../template/bower_components/angular-material/angular-material_v1.0.7.css',
	'../template/bower_components/angular-material/angular-material_v1.0.7.js',
	'../template/bower_components/angular-sanitize/angular-sanitize.min.js',
	'../template/bower_components/angular-translate/angular-translate.min.js',
	'../template/bower_components/dialogs/dialogs.min.js',
	'../template/bower_components/ui-bootstrap-tpls/ui-bootstrap-tpls-0.11.2.min.js',
	'../template/js/canvasjs.min.js',	
	'../template/js/easeljs-0.7.0.min.js',
	'../template/js/getlanguage.js',
	'../template/js/Gettext.js',	
	'../template/js/stopwatch.js', 	
	'../template/assets/css/app.css',
	'../template/assets/css/dialogs.css',
	'../template/assets/css/icon.css',
	'../template/assets/icons/Icon1.svg',
	'../template/assets/icons/Icon2.svg',
	'../template/assets/icons/Icon3.svg',
	'../template/assets/svg/avatars.svg',
	'../template/assets/svg/menu.svg',	
	'../template/bower_components/angular/angular.js',
	'../template/bower_components/angular/angular.min.js',
	'../template/bower_components/angular-animate/angular-animate.js',
	'../template/bower_components/angular-aria/angular-aria.js',
	'../template/bower_components/angular-chart/angular-charts.js',
	'../template/bower_components/angular-chart/angular-charts.min.js',
	'../template/bower_components/angular-fullscreen/angular-fullscreen.js',
	'../template/bower_components/angular-material/angular-material.css',
	'../template/bower_components/angular-material/angular-material.js',
	'../template/bower_components/angular-material/angular-material_v1.0.7.css',
	'../template/bower_components/angular-material/angular-material_v1.0.7.js',
	'../template/bower_components/angular-sanitize/angular-sanitize.min.js',
	'../template/bower_components/angular-translate/angular-translate.min.js',
	'../template/bower_components/dialogs/dialogs.min.js',
	'../template/bower_components/ui-bootstrap-tpls/ui-bootstrap-tpls-0.11.2.min.js',
	'../template/fonts/1hZf02POANh32k2VkgEoUBTbgVql8nDJpwnrE27mub0.woff2',
	'../template/fonts/-2n2p-_Y08sg57CNWQfKNvesZW2xOQ-xsNqO47m55DA.woff2',
	'../template/fonts/77FXFjRbGzN4aCrSFhlh3hJtnKITppOI_IvcXXDNrsc.woff2',
	'../template/fonts/97uahxiqZRoncBaCEI3aWxJtnKITppOI_IvcXXDNrsc (1).woff2',
	'../template/fonts/cDKhRaXnQTOVbaoxwdOr9xTbgVql8nDJpwnrE27mub0.woff2',
	'../template/fonts/CWB0XYA8bzo0kSThX0UTuA.woff2',
	'../template/fonts/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2',
	'../template/fonts/donefont.woff2',
	'../template/fonts/ek4gzZ-GeXAPcSbHtCeQI_esZW2xOQ-xsNqO47m55DA (1).woff2',
	'../template/fonts/Fcx7Wwv8OzT71A3E1XOAjvesZW2xOQ-xsNqO47m55DA.woff2',
	'../template/fonts/glyphicons-halflings-regular.eot',
	'../template/fonts/glyphicons-halflings-regular.svg',
	'../template/fonts/glyphicons-halflings-regular.ttf',
	'../template/fonts/glyphicons-halflings-regular.woff',
	'../template/fonts/glyphicons-halflings-regular.woff2',
	'../template/fonts/isZ-wbCXNKAbnjo6_TwHThJtnKITppOI_IvcXXDNrsc.woff2',
	'../template/fonts/jSN2CGVDbcVyCnfJfjSdfBJtnKITppOI_IvcXXDNrsc.woff2',
	'../template/fonts/K23cxWVTrIFD6DJsEVi07RTbgVql8nDJpwnrE27mub0.woff2',
	'../template/fonts/mbmhprMH69Zi6eEPBYVFhRJtnKITppOI_IvcXXDNrsc.woff2',
	'../template/fonts/mErvLBYg_cXG3rLvUsKT_fesZW2xOQ-xsNqO47m55DA.woff2',
	'../template/fonts/mx9Uck6uB63VIKFYnEMXrRJtnKITppOI_IvcXXDNrsc(2).woff2',
	'../template/fonts/mx9Uck6uB63VIKFYnEMXrRJtnKITppOI_IvcXXDNrsc.woff2',
	'../template/fonts/NdF9MtnOpLzo-noMoG0miPesZW2xOQ-xsNqO47m55DA.woff2',
	'../template/fonts/oHi30kwQWvpCWqAhzHcCSBJtnKITppOI_IvcXXDNrsc.woff2',
	'../template/fonts/oOeFwZNlrTefzLYmlVV1UBJtnKITppOI_IvcXXDNrsc.woff2',
	'../template/fonts/OpXUqTo0UgQQhGj_SFdLWBTbgVql8nDJpwnrE27mub0.woff2',
	'../template/fonts/PwZc-YbIL414wB9rB1IAPRJtnKITppOI_IvcXXDNrsc.woff2',
	'../template/fonts/rGvHdJnr2l75qb0YND9NyBJtnKITppOI_IvcXXDNrsc.woff2',
	'../template/fonts/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2',
	'../template/fonts/u0TOpm082MNkS5K0Q4rhqvesZW2xOQ-xsNqO47m55DA.woff2',
	'../template/fonts/UX6i4JxQDm3fVTc1CPuwqhJtnKITppOI_IvcXXDNrsc.woff2',
	'../template/fonts/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA (1).woff2',
	'../template/fonts/vSzulfKSK0LLjjfeaxcREhTbgVql8nDJpwnrE27mub0.woff2',
	'../template/fonts/WxrXJa0C3KdtC7lMafG4dRTbgVql8nDJpwnrE27mub0.woff2',
	'../template/fonts/ZLqKeelYbATG60EpZBSDyxJtnKITppOI_IvcXXDNrsc.woff2',	
	'../template/images/play.svg',
	'../template/images/reset.svg',
	'../template/images/stop.svg',
	'../template/images/stopwatch.svg',
	'../template/images/tick_icon.svg',
	'../template/images/wrong_icon.svg',
	'../template/images/icons/android-chrome-192x192.png',
	'../template/images/icons/android-chrome-512x512.png',
	'../template/images/icons/apple-touch-icon.png',
	'../template/images/icons/AU_logo_16.ico',
	'../template/images/icons/AU_logo_16.png',
	'../template/images/icons/clear.svg',
	'../template/images/icons/done.svg',
	'../template/images/icons/favicon-16x16.png',
	'../template/images/icons/favicon-32x32.png',
	'../template/images/icons/favorite.svg',
	'../template/images/icons/get.svg',
	'../template/images/icons/home_icon.svg',
	'../template/images/icons/icon-128x128.png',
	'../template/images/icons/icon-144x144.png',
	'../template/images/icons/icon-152x152.png',
	'../template/images/icons/icon-192x192.png',
	'../template/images/icons/icon-256x256.png',
	'../template/images/icons/icon-32x32.png',
	'../template/images/icons/loading.svg',
	'../template/images/icons/logo_128.png',
	'../template/images/icons/logo_144.png',
	'../template/images/icons/logo_152.png',
	'../template/images/icons/logo_16.png',
	'../template/images/icons/logo_192.png',
	'../template/images/icons/logo_256.png',
	'../template/images/icons/logo_32.png',
	'../template/images/icons/logo_48.png',
	'../template/images/icons/logo_512.png',
	'../template/images/icons/logo_57.png',
	'../template/images/icons/logo_72.png',
	'../template/images/icons/logo_96.png',
	'../template/images/icons/Logo-48-x-48.png',
	'../template/images/icons/menu.svg',
	'../template/images/icons/more_btn.svg',
	'../template/images/icons/mstile-150x150.png',
	'../template/images/icons/right_arrow.svg',	
	'../template/js/createjs-2013.12.12.min.js',
	'../template/js/createjs-2015.05.21.min.js',
	'../template/js/delaytimer.js',	
	'../template/js/loading.js',	
	'../template/js/tweenjs-0.6.2.min.js'	
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