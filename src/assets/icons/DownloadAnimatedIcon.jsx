const DownloadAnimatedIcon =
  "data:image/svg+xml;base64," +
  btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64px" height="64px">
      <!-- Background Circle -->
      <circle cx="32" cy="32" r="30" fill="#28a745"/>
      
      <!-- Bouncing Arrow -->
      <path fill="none" stroke="#ffffff" stroke-width="4" d="M32 20 L32 44 M20 32 L32 44 L44 32">
        <animateTransform attributeName="transform" type="translate" values="0,0;0,10;0,0" dur="0.8s" repeatCount="indefinite"/>
      </path>
    </svg>
  `);

export default DownloadAnimatedIcon;
