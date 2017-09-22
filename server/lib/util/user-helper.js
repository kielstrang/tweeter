"use strict";

const md5 = require('md5');

module.exports = {

  generateUserAvatars: (handle) => {
    const avatarUrlPrefix = `https://vanillicon.com/${md5(handle)}`;
    return {
      small:   `${avatarUrlPrefix}_50.png`,
      regular: `${avatarUrlPrefix}.png`,
      large:   `${avatarUrlPrefix}_200.png`
    };
  }
};
