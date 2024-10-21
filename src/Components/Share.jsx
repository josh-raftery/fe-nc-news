import { useEffect, useRef, useState } from "react";
import Opaque from "./Opaque";

export default function Share({setShare}) {
  const url = window.location.href;
  const urlRef = useRef(null);
  const [hasCopied, setHasCopied] = useState(false)

  function handleHighlight() {
    if (urlRef.current) {
      const range = document.createRange();
      range.selectNodeContents(urlRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  useEffect(() => {
    handleHighlight();
  }, []);

  function handleClick() {
    if (urlRef.current) {
      const text = urlRef.current.textContent;
      window.navigator.clipboard
        .writeText(text)
        .then(() => {
            setHasCopied(true)
        })
    }
  }

  console.log(hasCopied)

  return (
    <>
      <div className="bg-base-100 share-container rounded-xl">
        <button onClick={() => setShare(false)} className="btn btn-sm h-10 w-10 btn-circle btn-ghost close-share">
          <svg
            onClick={() => setShare(false)}
            fill="currentColor"
            viewBox="0 0 10 10"
            width="1em"
            height="1em"
            stroke="currentColor"
            strokeWidth="2"
            className="clear-search opacity-80"
          >
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>

        <div className="copy-text-container flex justify-between gap-2">
          <p
            ref={urlRef}
            className="cursor-pointer border p-2 h-10 rounded-lg  overflow-x-auto text-ellipsis whitespace-nowrap w-full"
            onClick={handleHighlight}
          >
            {url}
          </p>
          <button className={`btn btn-outline btn-sm h-10 ${hasCopied && 'btn-success'}`} onClick={handleClick}>
            {!hasCopied ? "Copy URL" : "Link Copied"}
          </button>
        </div>
      </div>
      <Opaque />
    </>
  );
}
