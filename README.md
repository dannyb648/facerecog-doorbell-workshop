
# Hacking a Smart Doorbell to do Facial Recognition Workshop Code!

This is the accompanying repository for the talk. There are two branches, **workshop-begin** which shows the outline of the solution to fill in and hack about with, and **workshop-complete** which is a more complete example to copy and expand / rework.

This code has been extracted from the Karen Home Automation System I am building, but isn't publicly available at the moment. 

Some Useful Links: 
**Azure Face API Quickstart:** https://docs.microsoft.com/en-us/azure/cognitive-services/face/quickstarts/client-libraries?tabs=visual-studio&pivots=programming-language-javascript

**Ring Doorbell Integration Library:** https://github.com/dgreif/ring

**Guide to get a valid Ring API Token via the backdoor:** https://github.com/dgreif/ring/wiki/Refresh-Tokens

*If you do end up building anything cool on top of this ring library, please consider sponsoring Dusty - he works really hard to keep the Ring API open and accessible*

## YOU WILL NEED

 - A valid Azure account connected to a credit card (you shouldn't be billed, theres a F0 Free tier for Faces API with limits
 - Ring Video Doorbell - already set up and an online account
 - NodeJS (Version 12+) installed
 - Typescript set up an installed

## SET UP 
To get this example working, you'll need to populate the following environment variables: 
| Name | Value |
|--|--|
| RINGKEY | Refresh token gained from your ring doorbell (see guide linked above |
| FACEAPIENDPOINT | Endpoint for your azure faces API, will be provided in portal https://YOURURLFROMAZURE.cognitiveservices.azure.com/ |
| FACEAPIKEY | API key which you have created on azure portal to access your faces instance | 
| FACEAPIGROUP | ID of the PersonGroup you created in the quickstart and contains the model of faces you want to recognise 

### To Start App:
``` npm i ```
``` npm build```
``` npm start```

**** 
As mentioned in the talk, the example code relies on an existing Face API Model being created in Azure - the Azure Faces quick start linked with guide you through that process far better than I could! 
