# pencil-stencil-builder
Builder for custom pencil stencil collections. Separate every shape that you want: builder will merge all figures into single file "Definition.xml".
## Note
  Project in active development!
## Installation
  ~~
## Documentation
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

## Todo
  * Readme
  * ~~Build feature~~
  * Packaging for distribution feature
  * Resolve icons path
