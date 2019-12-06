import { expect } from "chai";

import { evaluate } from "./Evaluate";

describe("Expression evaluator", () => {
    it("evaluate simple value", () => {
        expect(evaluate("33")).to.eql(33);
    });

    it("evaluate simple add", () => {
        expect(evaluate("1+2")).to.eql(3);
        expect(evaluate("2+2")).to.eql(4);
    });

    it("evaluate simple add with spaces", () => {
        expect(evaluate("1 + 2")).to.eql(3);
        expect(evaluate("2 + 2")).to.eql(4);
    });

    it("evaluate simple with diff", () => {
        expect(evaluate("2-1")).to.eql(1);
    });

    it("evaluate complex with diff", () => {
        expect(evaluate("2-1")).to.eql(1);
        expect(evaluate("3+2-1")).to.eql(4);
        expect(evaluate("3+2-1+12")).to.eql(16);
    });

    it("evaluate complex with multiply", () => {
        expect(evaluate("2+2*2")).to.eql(6);
        expect(evaluate("3*2+10*5")).to.eql(56);
    });
});
