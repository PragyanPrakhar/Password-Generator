import { useCallback, useState, useEffect,useRef } from "react";

function App() {
    const [length, setLength] = useState(8);
    const [numAllowed, setNumAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    //useRef hook
    const passwordRef=useRef(null);

    //use callback to to keepm the function in the cache . It accepts to arguments the first one is function and the second one is array of depenndencies
    //when the dependency change then the function is called again.
    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%&*?/{}x-+=~`^[]";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        setPassword(pass);
    }, [length, numAllowed, charAllowed, setPassword]);

    //The useCallback hook is a built-in hook in React that lets you memoize a callback function by preventing it from being recreated on every render. In simple terms, it means that the callback function is cached and does not get redefined on every render.
    const copyPassword=useCallback(()=>{
      passwordRef.current?.select();

      //to select the specific range from the password
      // passwordRef.current?.setSelectionRange(0,9);
      window.navigator.clipboard.writeText(password)

    },[password])
    useEffect(()=>{passwordGenerator()},[length,numAllowed,charAllowed, passwordGenerator])
    return (
        <div className="w-full max-w-md mx-auto rounded-xl px-4 my-8 text-orange-500 bg-gray-800 ">
            <h1 className="text-white text-center my-3">Password Generator</h1>
            <div className="flex shadow  overflow-hidden mb-2">
                <input
                    type="text"
                    value={password}
                    className="outline-none w-full py-1 px-3 mb-4 rounded-lg"
                    placeholder="password"
                    readOnly
                    ref={passwordRef}
                />
                <button 
                onClick={copyPassword}
                className="outline-none width-sm bg-blue-700 text-white text-center px-3 py-0.5 rounded-lg h-9 shrink-0">
                    copy
                </button>
            </div>
            <div className="flex text-sm gap-x-2">
                <div className="flex items-center gap-x-1">
                    <input
                        type="range"
                        min={6}
                        max={100}
                        value={length}
                        className="cursor-pointer"
                        onChange={(e) => {
                            setLength(e.target.value);
                        }}
                    />
                    <label>Length:{length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                        type="checkbox"
                        defaultChecked={numAllowed}
                        id="numberInput"
                        onChange={() => {
                            setNumAllowed((prev) => !prev);
                        }}
                    />

                    <label htmlFor="numberInput">Numbers</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                        type="checkbox"
                        defaultChecked={charAllowed}
                        id="characterInput"
                        onChange={() => {
                            setCharAllowed((prev) => !prev);
                        }}
                    />
                    <label htmlFor="characterInput">Characters</label>
                </div>
            </div>
        </div>
    );
}

export default App;
