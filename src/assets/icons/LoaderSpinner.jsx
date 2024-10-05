const SvgComponent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="100px"
      height="100px"
      style={{
        display: "block",
        margin: "auto",
        background: "#fff",
        borderRadius: "10px",
      }}
    >
      <rect
        fill="#413E32"
        stroke="#413E32"
        strokeWidth="15"
        width="30"
        height="30"
        x="25"
        y="50"
      >
        <animate
          attributeName="y"
          calcMode="spline"
          dur="2"
          values="50;120;50;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        />
      </rect>
      <rect
        fill="#413E32"
        stroke="#413E32"
        strokeWidth="15"
        width="30"
        height="30"
        x="85"
        y="50"
      >
        <animate
          attributeName="y"
          calcMode="spline"
          dur="2"
          values="50;120;50;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        />
      </rect>
      <rect
        fill="#413E32"
        stroke="#413E32"
        strokeWidth="15"
        width="30"
        height="30"
        x="145"
        y="50"
      >
        <animate
          attributeName="y"
          calcMode="spline"
          dur="2"
          values="50;120;50;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        />
      </rect>
    </svg>
  );
};

export default SvgComponent;
