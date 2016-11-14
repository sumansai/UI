'use strict';

angular.module('propel-analytic-ui')
  .config(function($logProvider) {
    // TODO: find more robust/configurable way to manage this setting
    $logProvider.debugEnabled(false);
  });
