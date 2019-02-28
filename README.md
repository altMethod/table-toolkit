# Browsepedia Angular Table Toolkit
A set of Angular 7 components built with **Angular Material** with the purpose of displaying and filtering tables.
### 1. Installation
The npm Package
``` npm
npm install --save browsepedia-table-toolkit
```

Import an Angular Material theme into your styles.css file (example bellow)
``` css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

Import the Material Icons in index.html
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
Please note that the **browsepedia-table-toolkit** installs the following packets
```json
"@angular/common": "^7.2.0",
"@angular/core": "^7.2.0",
"@angular/animations": "^7.2.5",
"@angular/cdk": "^7.3.2",
"@angular/material": "^7.3.2"
```

### 2. Import the TableToolkitModule
In your app.module.ts (or, if following this pattern, your shared.module.ts - in this case remember to also export it)
```ts
imports: [
	...
    TableToolkitModule
 ]
 ```
 You now have access to all the components that this library exposes
 
 
 Please refer to the [documentation](https://github.com/browsepedia/table-toolkit/wiki/Browsepedia-Table-Toolkit-Wiki) to see how to use the components that this library offers.
