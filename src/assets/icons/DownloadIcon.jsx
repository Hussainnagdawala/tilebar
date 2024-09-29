import { styled } from "@mui/material/styles";

const Svg = styled("svg")(({ theme }) => ({
  width: 46,
  height: 46,
  fill: "none",
  transition: "fill 0.3s ease",
  "&:hover": {
    fill: theme.palette.secondary.main,
  },
}));

const SvgComponent = () => {
  return (
    <Svg
      width="46"
      height="45"
      viewBox="0 0 46 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="1"
        width="45"
        height="43"
        rx="21.5"
        stroke="#159283"
        strokeDasharray="4 4"
      />
      <rect
        x="8"
        y="7.5"
        width="30"
        height="30"
        rx="15"
        stroke="#159283"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 15.5C23 15.5 23 22.3297 23 25.6492M23 25.6492L26 22.6492M23 25.6492C21.8284 24.4776 20 22.6492 20 22.6492M16 25.5V27.5C16 28.0304 16.2107 28.5391 16.5858 28.9142C16.9609 29.2893 17.4696 29.5 18 29.5H28C28.5304 29.5 29.0391 29.2893 29.4142 28.9142C29.7893 28.5391 30 28.0304 30 27.5V25.5"
        stroke="#159283"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SvgComponent;
