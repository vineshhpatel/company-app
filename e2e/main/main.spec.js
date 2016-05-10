'use strict';

var config = browser.params;

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/');
    page = require('./main.po');
  });

  it('should include emp-list container element', function() {
    expect(page.containerEl.id).toBe('emp-list');
    // expect(page.imgEl.getAttribute('src')).toMatch(/yeoman.png$/);
    // expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
  });
});
