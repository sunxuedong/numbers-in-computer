const patchZero = ({ value = "", place = "end", length = 0 } = {}) => {
    let patchedValue = "";
    const valLen = value.length;

    if (valLen >= length) {
        patchedValue = value.slice(0, length);
        return patchedValue;
    }

    const patchLen = length - valLen;

    for(let i = 0; i < patchLen; i++) {
        patchedValue += "0";
    }

    if (place === "start") {
        patchedValue = patchedValue + value;
    } else if (place === "end") {
        patchedValue = value + patchedValue;
    }

    return patchedValue;
};

export const decimal2Binary = (decNumber: number) => {
    const signBit = decNumber > 0 ? '1' : '0';
    const offset = 1023;
    const binaryStr = decNumber.toString(2);
    const appendPointBS = binaryStr + '.';
    const len = appendPointBS.length;
    let mantissaBits: string = "";
    let ifMeetFirst1: boolean = false;
    let oldPointIdx: number = -1;
    let newPointIdx: number = -1;
    for (let i = 0; i < len; i++) {
        const bitOrPoint = appendPointBS[i];

        if (bitOrPoint !== "." && ifMeetFirst1) {
            mantissaBits += bitOrPoint;
        }

        if (bitOrPoint === "1" && !ifMeetFirst1) {
            ifMeetFirst1 = true;
        }

        if (bitOrPoint === "1" && newPointIdx === -1) {
            newPointIdx = i + 1;
        }

        if (bitOrPoint === '.' && oldPointIdx === -1) {
            oldPointIdx = i;
        }
    }

    const exponentBits = (oldPointIdx - newPointIdx + offset).toString(2);
    const patchedExponentBits = patchZero({ value: exponentBits, length: 11, place: "start" });
    const patchedMantissaBits = patchZero({ value: mantissaBits, length: 52, place: "end" });

    return { signBit, exponentBits: patchedExponentBits, mantissaBits: patchedMantissaBits };
};

let key = 0;

export const getBitsDom = ({ bits = "", className = "" } = {}) => {
    const domList = [];
    
    for (let i = 0; i < bits.length; i++) {
        domList.push(<div className={`bit ${className}`} key={key++}>{bits[i]}</div>)
    }

    return domList;
};
