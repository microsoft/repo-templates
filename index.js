//
// Copyright (c) Microsoft.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
//

// Return the path to this file as the only entrypoint for this

const path = require('path');

const definitions = require('./templates/definitions.json');

const distPath = path.join(__dirname, 'templates');

module.exports = {
  directory: distPath,
  definitions,
};
