import React, { HTMLAttributes } from "react";

const FacebookLogo = (props: HTMLAttributes<SVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M22.5 0h-21C.7 0 0 .7 0 1.5v21c0 .8.7 1.5 1.5 1.5h9.1v-8.7h-2.4v-3.4h2.4v-2.5c0-2.4 1.5-3.7 3.6-3.7 1 0 1.9.1 2.2.1v2.5l-1.5.1c-1.2 0-1.4.6-1.4 1.4v1.8h2.8l-.4 3.4h-2.4v8.7h4.6c.8 0 1.5-.7 1.5-1.5v-21c0-.8-.7-1.5-1.5-1.5z"
        fill="currentColor"
      />
    </svg>
  );
};

export default FacebookLogo;
