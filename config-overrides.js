const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#31A549', //'#038fde',
      '@secondary-color': '#31A549', //'#fa8c16',
      '@text-color': '#545454',
      '@heading-color': '#535353',
      '@nav-dark-bg': '#121212', //'#003366',
      '@header-text-color': '#262626',
      '@layout-header-background': '#fefefe',
      '@layout-footer-background': '#fffffd',
      '@nav-dark-text-color': '#E0E0E0', //'#038fdd',
      '@hor-nav-text-color': '#fffffd',
      '@nav-header-selected-text-color': '#fdbe33',
      '@comment-padding-base': '0',
    },
  })
);
