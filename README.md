##Salesforce Query Builder using Node.Js, AngularJs, Salesforce REST API, OAuth2 and Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Live Demo - https://soqlbuilder.herokuapp.com/



It uses Google's Angularjs MVC Javascript library and REST API provided by Salesforce. For Authentication, it uses OAuth. Node.js is used as a primary language and hosted on Heroku.

We have many tools available online for Query builder, However none of them were satisfying me so though to create my own tool.

This Node.js application is used for building SOQL with following features :

- Toggle between API name and Label Name
- Search Objects or Fileds needs to build SOQL (In my case, it was primitive. I had more than 70 Objects and many of those objects has 300+ fields)
- Checkboxes to select fields (No need to hold control button to select multiple fields)
- Automatic Query Builder at Right side of page
- Shows API count used by application
- Search returned records
- Sorting on Table Headers
- Pagination


Blog Article - http://www.shivasoft.in/blog/salesforce/creating-salesforce-query-builder-in-node-js-and-angularjs-using-salesforce-rest-api-and-oauth2/

[![Youtube Vide](http://img.youtube.com/vi/Y_-MGYDWNuc/0.jpg)](http://www.youtube.com/watch?v=Y_-MGYDWNuc)

##Running locally

Add connected app consumer key and callback url to .env

```
clientId=
redirectURL=
```

Then run foreman start to run application locally

##Running on Heroku

Add connected app consumer key and callback url to heroku config vars

```
heroku config:set clientId=
```
```
heroku config:set redirectURL=
```
