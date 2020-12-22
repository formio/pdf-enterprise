// Keep this file as ES5!
var Formio;
var renderForm = function(form, submission, options, evalOptions) {
  // Bail with retry if core library isn't loaded yet
  if (!Formio) {
    return setTimeout(function() {
      renderForm(form, submission, options, evalOptions);
    }, 100);
  }

  var readyFlagRaised = false;

  // Copied from https://gist.github.com/kamilogorek/8819542
  var waitForImages = function(_cb) {
    var imagesLoaded = false;
    var cb = function() {
      if (!imagesLoaded) {
        imagesLoaded = true;
        _cb();
      }
    };
    var allImgsLength = 0;
    var allImgsLoaded = 0;
    var allImgs = [];

    // Add a fallback to render the form even without loading all images.
    setTimeout(cb, 3000);

    var filtered = Array.prototype.filter.call(document.querySelectorAll('img'), function(item) {
      if (item.src === '') {
        return false;
      }

      // Firefox's `complete` property will always be `true` even if the image has not been downloaded.
      // Doing it this way works in Firefox.
      var img = new Image();
      img.src = item.src;
      return !img.complete;
    });

    filtered.forEach(function(item) {
      allImgs.push({
        src: item.src,
        element: item
      });
    });

    allImgsLength = allImgs.length;
    allImgsLoaded = 0;

    // If no images found, don't bother.
    if (allImgsLength === 0) {
      cb();
    }

    allImgs.forEach(function(img) {
      var image = new Image();

      // Handle the image loading and error with the same callback.
      image.addEventListener('load', function() {
        allImgsLoaded++;
        if (allImgsLoaded === allImgsLength) {
          cb();
          return false;
        }
      });

      image.src = img.src;
    });
  };

  var raiseReadyFlag = function(force) {
    // Skip if we've already raised the ready flag and aren't forcing a recheck
    if (readyFlagRaised && force !== true) {
      return;
    }

    // Wait for all images to load first.
    waitForImages(function() {
      // Mark the ready flag as raised
      readyFlagRaised = true;

      // If a timezone loading promise exists, wait on that and then force a retry
      if (!FormioUtils.zonesLoaded() && FormioUtils.moment && FormioUtils.moment.zonesPromise) {
        return FormioUtils.moment.zonesPromise.then(function() {
          raiseReadyFlag(true);
        });
      }

      // Set window status to ready after a final buffer interval for good measure
      setTimeout(function() {
        window.status = 'ready';
      }, evalOptions.renderBuffer);
    });
  };

  // Apply evalOptions and set display mode
  Formio.setBaseUrl(evalOptions.baseUrl);
  Formio.setProjectUrl(evalOptions.baseUrl + '/project/' + evalOptions.project);

  if (evalOptions.token) {
    Formio.setToken(evalOptions.token);
  }

  form.display = 'form';

  // Set the form
  window.setForm(form, submission, options).then(raiseReadyFlag)
    .catch(err => {
      console.log(err);
      raiseReadyFlag();
    });

  // Still generate after 5 seconds if our setForm promise fails to resolve
  setTimeout(raiseReadyFlag, evalOptions.timeout || 5000);
};

module.exports = renderForm;
