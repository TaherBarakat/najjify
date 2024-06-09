export const print = {
  effect: (message) => {
    console.log(
      `%cuseEffect: ${message}`,
      "font-weight: bold; color:green;font-size: 20px",
    );
  },
  comp: (message) => {
    console.log(
      `%ccompRender: ${message}`,
      "font-weight: bold; color:yellow;font-size: 20px",
    );
  },
};
