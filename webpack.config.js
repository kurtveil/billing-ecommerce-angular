const { resolve } = require('path');

module.exports = {
  resolve: {
    alias: {
      '@angular/material': resolve(__dirname, 'node_modules/@angular/material'),
    },
  },
};
