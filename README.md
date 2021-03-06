[Deploy-link](https://gifted-fermat-c9fc3b.netlify.app)

## Preview

![Preview image](https://github.com/KirillZhdanov/slider-webpack/blob/master/preview.png?raw=true)

## Features

- Ready to use slider component with simple animation
- Easy customization
- Swiper works on touch devices and with mouse
- Infinite Loop slider
- Supports any element as children

## How to use

Just import <u>Container</u> component from '.src/components' and wrap any content you need <u>into Slider</u>.

## How to run

To run slider-app you should run

```sh
cd slider
```

then run
```sh
npm i
```
```sh
npm start.
```

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `npm build`

Builds project for deploy
### Config 
```jsx
const settings = {
  width: "100%",//slider width
  height: "100%",//slider height
  infiniteLoop: true,//carousel mode
  slidesPerView: 1,//slides per view
  indicators: true,//indicators panel
};
```
