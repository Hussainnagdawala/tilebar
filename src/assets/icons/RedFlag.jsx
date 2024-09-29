import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width ?? "15"}
        height={props.height ?? "18"}
        viewBox="0 0 15 18"
        fill="none"
      >
        <path
          d="M0 17.5V0.5H9L9.4 2.5H15V12.5H8L7.6 10.5H2V17.5H0ZM9.65 10.5H13V4.5H7.75L7.35 2.5H2V8.5H9.25L9.65 10.5Z"
          fill={props.color ?? "#4F5B67"}
        />
      </svg>
    </>
  );
};

export default SvgComponent;
