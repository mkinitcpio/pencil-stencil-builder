# pencil-stencil-builder
Builder for custom pencil stencil collections. Separate every shape that you want: builder will merge all figures into single file "Definition.xml".
## Note
  Project in active development!
## Installation
  ```
  npm i pencil-stencil-builder
  ```

## Config
  Create config **psb.config.json** into root project folder:
  ```javascript
{
    "rootDir": "path to src dir",
    "buildDir": "path where need to build source",
    "packDir": "path where need to pack build files",
    "stencilMetadata": {
        "id": "",
        "displayName": "",
        "description": "",
        "author":"",
        "url":""
    }
}
```
All fields from config file are optional.
  
## Commands
  Build project in **buildDir** from **psb.config.json**
  ```
  psb build
  ```
  Watch changes and rebuild project in **rootDir** from **psb.config.json**
  ```
  psb watch
  ```

## Todo
  * Readme
  * ~~Build feature~~
  * ~~Watch feature~~
  * Packaging for distribution feature
  * Resolve icons path
