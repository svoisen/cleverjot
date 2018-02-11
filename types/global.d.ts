/** Global definitions for developement **/

// Allows for importing of CSS styles as modules
declare module '*.css' {
  const styles: any;
  export = styles;
}

// Allows for importing of Less styles as modules
declare module '*.less' {
  const styles: any;
  export = styles;
}