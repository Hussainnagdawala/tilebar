import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? "22"}
      height={props.height ?? "20"}
      viewBox="0 0 22 20"
      fill="none"
    >
      <path
        d="M13.2318 5.63261V3.54928C13.2318 2.99674 13.0123 2.46684 12.6216 2.07614C12.2309 1.68544 11.701 1.46594 11.1484 1.46594H3.85677C3.30424 1.46594 2.77433 1.68544 2.38363 2.07614C1.99293 2.46684 1.77344 2.99674 1.77344 3.54928V16.0493C1.77344 16.6018 1.99293 17.1317 2.38363 17.5224C2.77433 17.9131 3.30424 18.1326 3.85677 18.1326H11.1484C11.701 18.1326 12.2309 17.9131 12.6216 17.5224C13.0123 17.1317 13.2318 16.6018 13.2318 16.0493V13.9659"
        stroke={props.color ?? "#243641"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.02344 9.79932H20.5234M20.5234 9.79932L17.3984 6.67432M20.5234 9.79932L17.3984 12.9243"
        stroke={props.color ?? "#243641"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgComponent;
