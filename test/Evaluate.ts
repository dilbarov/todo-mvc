type Token = string | number;

function tokenize(expression: string): Token[] {
    return expression.split(/([\*+-])/).map(x => {
        if (x === "-" || x === "+" || x === "*") {
            return x;
        }
        return parseInt(x, 10);
    });
}

class TokenStream {
    private readonly tokens: Token[];
    private index = 0;

    public constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    public get current(): Token {
        return this.tokens[this.index];
    }

    public get isEnd(): boolean {
        return this.tokens[this.index] == undefined;
    }

    public next(): void {
        this.index++;
    }
}

export function evaluate(expression: string): number {
    const tokens = tokenize(expression);
    const tokenStream = new TokenStream(tokens);
    return exprLevel1(tokenStream);
}

function exprLevel1(tokenStream: TokenStream): number | undefined {
    let leftResult = exprMul(tokenStream);
    if (leftResult === undefined) {
        return undefined;
    }

    const result = exprLevel1List(tokenStream);
    leftResult += result;

    if (tokenStream.isEnd) {
        return leftResult;
    }
    return undefined;
}

function exprLevel1List(tokenStream: TokenStream): number | undefined {
    let result = 0;
    if (tokenStream.current === "-") {
        tokenStream.next();
        const currentNumber = exprMul(tokenStream);
        if (currentNumber != undefined) {
            result -= currentNumber;
        }
        const nextNumber = exprLevel1List(tokenStream);
        if (nextNumber != undefined) {
            result += nextNumber;
        }
    } else if (tokenStream.current === "+") {
        tokenStream.next();
        const currentNumber = exprMul(tokenStream);
        if (currentNumber != undefined) {
            result += currentNumber;
        }
        const nextNumber = exprLevel1List(tokenStream);
        if (nextNumber != undefined) {
            result += nextNumber;
        }
    }
    return result;
}

function exprMul(tokenStream: TokenStream): number | undefined {
    const firstNumber = tokenStream.current;
    if (typeof firstNumber === "number") {
        tokenStream.next();
        if (tokenStream.current === "*") {
            tokenStream.next();
            return firstNumber * exprMul(tokenStream);
        } else {
            return firstNumber;
        }
    }
    return undefined;
}
