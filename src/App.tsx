import { useState, useEffect } from "react";
import { decimal2Binary, getBitsDom } from "./util";
import './App.scss';

function App() {
  const [value, setValue] = useState("0");
  const [signBit, setSignBit] = useState("");
  const [exponentBits, setExponentBits] = useState("");
  const [mantissaBits, setMantissaBits] = useState("");

  useEffect(() => {
    const { signBit, exponentBits, mantissaBits } = decimal2Binary(+value);
    
    setSignBit(signBit);
    setExponentBits(exponentBits);
    setMantissaBits(mantissaBits);
  }, [value]);

  const signBitVdom = getBitsDom({ bits: signBit, className: "sign-bit" });
  const exponentBitsVdom = getBitsDom({ bits: exponentBits, className: "exponent-bit" });
  const mantissaBitsVdom = getBitsDom({ bits: mantissaBits, className: "mantissa-bit" });

  return (
    <div className="numbers-in-computer">
      <div className="bits">
        {signBitVdom}
        {exponentBitsVdom}
        <div className="bit placeholder-bit">1</div>
        {mantissaBitsVdom}
      </div>
      <div className="number-ipt-wrapper">
        <input className="number-ipt" type="number" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
      </div>
    </div>
  );
}

export default App;
