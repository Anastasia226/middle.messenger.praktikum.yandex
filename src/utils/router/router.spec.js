"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const jsdom_1 = require("jsdom");
const chai_1 = require("chai");
const router_1 = require("./router");
describe("Test Router", () => {
    let dom;
    let router;
    beforeEach(() => {
        dom = new jsdom_1.JSDOM(`<div id="root"></div>`, {
            url: 'http://localhost:3000'
        });
        global.window = dom.window;
        global.document = dom.window.document;
        // @ts-expect-error
        router_1.Router.__instance = undefined;
        router = new router_1.Router('#root');
    });
    describe('.use', () => {
        it("Should return Router instance", () => {
            const result = router.use('/', class {
            });
            (0, chai_1.expect)(result).to.eq(router);
        });
    });
    describe('.start', () => {
        it(".start", () => {
            class TestBlock {
                getContent() {
                    const div = document.createElement("div");
                    div.id = 'test-id';
                    return div;
                }
                dispatchComponentDidMount() {
                }
            }
            router.use("/test-page", new TestBlock());
            router.start();
            (0, chai_1.expect)(window.location.pathname).to.be.equal("/");
        });
    });
    describe('.go', () => {
        it("Should render new block", () => {
            class TestBlock {
                getContent() {
                    const div = document.createElement("div");
                    div.id = 'test-id';
                    return div;
                }
                dispatchComponentDidMount() {
                }
            }
            router.use("/", new TestBlock());
            router.go("/");
            (0, chai_1.expect)(document.getElementById('test-id')).not.to.be.null;
        });
    });
    describe('.back', () => {
        it("Should route back", () => {
            const backSpy = sinon_1.default.spy(global.window.history, "back");
            router.back();
            (0, chai_1.expect)(backSpy.callCount).to.be.equal(1);
        });
    });
    describe('.forward', () => {
        it("Should route forward", () => {
            const forwardSpy = sinon_1.default.spy(global.window.history, "forward");
            router.forward();
            (0, chai_1.expect)(forwardSpy.callCount).to.be.equal(1);
        });
    });
});
//# sourceMappingURL=router.spec.js.map