import { Hono } from "hono";
import { ImageResponse } from "takumi-js/response";

const app = new Hono();

app.get("/", (c) => c.text("machiyotl"));

app.get("/test", () => {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#111",
        color: "#fff",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 64,
      }}
    >
      hello machiyotl
    </div>,
    { width: 1200, height: 630 },
  );
});

export default app;
