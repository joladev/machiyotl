import type { Theme } from "../core/config";

type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
  theme: Theme;
};

export default function Default({ title, eyebrow, description, theme }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 80,
        background: theme.bg,
        color: theme.fg,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {theme.logoUrl && <img src={theme.logoUrl} width={56} height={56} />}
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          {theme.siteName}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {eyebrow && (
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 500,
              color: theme.accent,
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.3,
              opacity: 0.65,
              marginTop: 8,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
