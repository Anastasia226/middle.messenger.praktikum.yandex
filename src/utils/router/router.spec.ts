import sinon from "sinon"
import { DOMWindow, JSDOM } from "jsdom"
import { expect } from "chai"
import { Router } from "./router"

describe("Test Router", () => {
    let dom: JSDOM
    let router: Router

    beforeEach(() => {
        dom = new JSDOM(`<div id="root"></div>`, {
            url: 'http://localhost:3000'
        });
        (global as any).window = dom.window as DOMWindow;
        (global as any).document = dom.window.document;

        // @ts-expect-error
        Router.__instance = undefined;
        router = new Router('#root');

    })
    describe('.use', () => {
        it("Should return Router instance", () => {
            const result = router.use('/', class {
            } as any)

            expect(result).to.eq(router)
        })
    })

    describe('.start', () => {
        it(".start", () => {
            class TestBlock {
                getContent() {
                    const div = document.createElement("div");
                    div.id = 'test-id';
                    return div
                }

                dispatchComponentDidMount() {
                }
            }

            router.use("/test-page", new TestBlock() as any)
            router.start()
            expect(window.location.pathname).to.be.equal("/")
        })
    })

    describe('.go', () => {
        it("Should render new block", () => {
            class TestBlock {
                getContent() {
                    const div = document.createElement("div");
                    div.id = 'test-id';
                    return div
                }

                dispatchComponentDidMount() {
                }
            }

            router.use("/", new TestBlock() as any)
            router.go("/")
            expect(document.getElementById('test-id')).not.to.be.null
        })
    })

    describe('.back', () => {
        it("Should route back", () => {
            const backSpy = sinon.spy(global.window.history, "back")
            router.back()
            expect(backSpy.callCount).to.be.equal(1)
        })
    })

    describe('.forward', () => {
        it("Should route forward", () => {
            const forwardSpy = sinon.spy(global.window.history, "forward")
            router.forward()
            expect(forwardSpy.callCount).to.be.equal(1)
        })
    })

})


