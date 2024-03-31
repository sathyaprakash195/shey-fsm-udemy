import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const primaryColor = "#35374B";
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primaryColor,
            borderRadius: 0,
          },
          components: {
            Button: {
              controlOutline: "none",
              controlHeight: 45,
              defaultBg : '#D7D7D7',
              defaultHoverBg : '#D7D7D7',
              defaultHoverBorderColor : 'none',
            },
            Input: {
              controlHeight: 45,
              activeShadow: "none",
              controlOutline: "none",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
}

export default ThemeProvider;
