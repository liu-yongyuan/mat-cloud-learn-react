/* 
图片的声明文件
找不到模块“./assets/imgs/22kb.png”或其相应的类型声明

tsconfig.json 
 -- "include": ["./src"] 使得该文件被识别
*/
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
