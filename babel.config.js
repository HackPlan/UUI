module.exports = (api) => {
  const isTest = api.env('test');
  if (isTest) {
    // special babel config for jest
    return {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current"
            }
          }
        ]
      ],
      plugins: ["transform-es2015-modules-commonjs"]
    };
  }
  return {};
};
