"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const handlebars_1 = tslib_1.__importDefault(require("handlebars"));
const ProfilePhoto_hbs_1 = tslib_1.__importDefault(require("./ProfilePhoto.hbs"));
handlebars_1.default.registerPartial('profilePhoto', ProfilePhoto_hbs_1.default);
exports.default = (src) => {
    return (0, ProfilePhoto_hbs_1.default)({ src });
};
//# sourceMappingURL=profile-photo.js.map