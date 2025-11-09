let IS_PROD = true;
const server = IS_PROD
  ? "https://zoom-clone-backend-30x4.onrender.com"
  : "http://localhost:8000";

export default server;
