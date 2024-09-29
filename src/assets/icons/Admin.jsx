import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "18"}
      height={props.height ?? "23"}
      viewBox="0 0 18 28"
      fill="none"
    >
      <path
        d="M9 9.5C11.2091 9.5 13 7.70914 13 5.5C13 3.29086 11.2091 1.5 9 1.5C6.79086 1.5 5 3.29086 5 5.5C5 7.70914 6.79086 9.5 9 9.5Z"
        stroke={props.color ?? "#4F5B67"}
        strokeWidth="1.5"
      />
      <path
        d="M17 17C17 19.485 17 21.5 9 21.5C1 21.5 1 19.485 1 17C1 14.515 4.582 12.5 9 12.5C13.418 12.5 17 14.515 17 17Z"
        stroke={props.color ?? "#4F5B67"}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default SvgComponent;
