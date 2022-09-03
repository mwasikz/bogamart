const exclusionList = require("metro-config/src/defaults/exclusionList");
module.exports = {
    resolver: {
        blacklistRE: exclusionList([/sanity\/package.json/]),
    },
};