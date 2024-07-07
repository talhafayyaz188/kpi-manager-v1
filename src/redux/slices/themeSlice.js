import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "en",
  dir: "ltr",
  dataThemeMode: "light",
  dataMenuStyles: "dark",
  dataNavLayout: "vertical",
  dataHeaderStyles: "light",
  dataVerticalStyle: "overlay",
  StylebodyBg: "107 64 64",
  StyleDarkBg: "93 50 50",
  toggled: "",
  dataNavStyle: "",
  horStyle: "",
  dataPageStyle: "regular",
  dataWidth: "fullwidth",
  dataMenuPosition: "fixed",
  dataHeaderPosition: "fixed",
  iconOverlay: "",
  colorPrimaryRgb: "",
  bodyBg1: "",
  bodyBg2: "",
  darkBg: "",
  inputBorder: "",
  bgImg: "",
  iconText: "",
  body: {
    class: "",
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    ThemeChanger: (state, action) => {
      console.log("check", action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { ThemeChanger } = themeSlice.actions;
export default themeSlice.reducer;
