const fs = require('fs');
const https = require('https');
const path = require('path');
const mkdirp = require('mkdirp');
const inliner = require('sass-inline-svg');

// NOTE: build/ dir is used for CRA output too, but is cleared at the beginning of that task.
const LOCAL_PATH = process.env.SASS_TMP_DIR || 'build/resources';

// Sass function to inline a UI Icon svg and change its path color:
// svg-icon("16px/icon-name.svg", (path: (fill: $color)) )
// See: https://github.com/palantir/blueprint/blob/develop/packages/core/scripts/sass-custom-functions.js
const transform = inliner(LOCAL_PATH, {
  // run through SVGO first
  optimize: true,
  // minimal "uri" encoding is smaller than base64
  encodingFormat: 'uri',
});

module.exports = {
  'svg-icon': (path, selectors, done) => {
    const localFile = `${LOCAL_PATH}/${path.getValue()}`;
    const remoteFile = `https://raw.githubusercontent.com/palantir/blueprint/develop/resources/icons/${path.getValue()}`;

    // skip the fetch if file already exists
    if (fs.existsSync(localFile)) {
      return transform(path, selectors);
    }

    // fetch icon from Blueprint GitHub repo (the SVG files don't appear in any published package).
    // save icon file locally so that sass-inline-svg can use that local file.
    console.log('GET', remoteFile);
    mkdirp.sync(path.dirname(localFile));
    const file = fs.createWriteStream(localFile);
    https.get(remoteFile, res => {
      res.pipe(file).on('close', () => {
        done(transform(path, selectors));
      });
    });
  },
};
