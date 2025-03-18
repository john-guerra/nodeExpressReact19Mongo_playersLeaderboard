import { useRef } from "react";
//react hook

export default function NameCollector() {
  // hooks are supposed to be used on the top level of the function
  const inNameRef = useRef();

  const onClick = (evnt) => {
    console.log("Button clicked", evnt.target);
    const name = inNameRef.current.value;
    console.log("Name=", name);
  };

  return (
    <>
      <label>
        Enter your name:
        <input ref={inNameRef} type="text" />
      </label>

      <button onClick={onClick}>Submit</button>
    </>
  );
}
