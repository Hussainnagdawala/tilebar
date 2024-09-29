import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width ?? "21"}
        height={props.height ?? "20"}
        viewBox="0 0 21 20"
        fill="none"
      >
        <path
          d="M10.5 0C4.989 0 0.5 4.489 0.5 10C0.5 15.511 4.989 20 10.5 20C16.011 20 20.5 15.511 20.5 10C20.5 4.489 16.011 0 10.5 0ZM10.5 2C14.9301 2 18.5 5.56988 18.5 10C18.5 14.4301 14.9301 18 10.5 18C6.06988 18 2.5 14.4301 2.5 10C2.5 5.56988 6.06988 2 10.5 2ZM9.5 5V7H11.5V5H9.5ZM9.5 9V15H11.5V9H9.5Z"
          fill={props.color ?? "#4F5B67"}
        />
      </svg>
    </>
  );
};

export default SvgComponent;
