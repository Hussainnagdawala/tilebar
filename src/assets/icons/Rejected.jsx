import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "20"}
      height={props.height ?? "21"}
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M7.50495 19.5H2.5C1.67158 19.5 1 18.8285 1 18V3C1 2.17158 1.67158 1.5 2.5 1.5H17.5C18.3285 1.5 19 2.17158 19 3V8.0152"
        stroke={props.color ?? "#4F5B67"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 13.0173V19C19 19.2762 18.7762 19.5 18.5 19.5H12.5185"
        stroke={props.color ?? "#4F5B67"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 13.0173H7"
        stroke={props.color ?? "#4F5B67"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 10L6.5 13L9.5 16"
        stroke={props.color ?? "#4F5B67"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgComponent;
