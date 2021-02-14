### Overview

Client-side code for the SaintsXCTF web application.  The Client uses React.js and JSS.  There is some legacy Sass code 
which is slowly phased out as development continues.

### Files

| Filename              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `components`          | React components used on specific pages or shared amongst the entire application.           |
| `containers`          | React components which are parents for a page in the website.                               |
| `datasources`         | Access to sources of data (APIs) for the application.  Uses `axios` to connect to the APIs. |
| `hooks`               | Custom React hooks which help reduce duplicate code.                                        |
| `redux`               | Redux store configuration along with actions & reducers.                                    |
| `styles`              | JSS style modules, mixins, colors and more.                                                 |
| `utils`               | Utility functions used throughout the application.                                          |
| `fonts.scss`          | *DEPRECATED* Mixins for fonts used throughout the application.                              |
| `index.html`          | *DEPRECATED* HTML entry point for the application.                                          |
| `index.js`            | *DEPRECATED* React and React Router bootstrapping.                                          |
| `index.scss`          | *DEPRECATED* Global styles for the entire application.                                      |
| `mixins.scss`         | *DEPRECATED* Global Sass mixins for the entire application.                                 |
| `vars.scss`           | *DEPRECATED* Variables uses in Sass stylesheets throughout the application.                 |

### Resources

1) [Color Palette Generator](https://mycolor.space/?hex=%23990000&sub=1)
2) [Password Form Auto Complete Attribute](https://www.chromium.org/developers/design-documents/create-amazing-password-forms)
3) [Elegant Font Icons](https://www.elegantthemes.com/blog/resources/elegant-icon-font)
4) [CSS Attribute Selector](https://stackoverflow.com/a/38764939)
5) [Autocomplete Styles](https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/)
