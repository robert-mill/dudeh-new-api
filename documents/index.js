const { forEach, at } = require("lodash");
module.exports = ({ cv, interests, qualifications, workexperiences }) => {
  return `${`<!doctype html>
    <html>
      <head>
        <meta charset='utf-8'>
        <title>Dennis Udeh</title> 
        
      <style>
        table{
          border:none;
          border-collapse: collapse;
        }
      </style>
    </head>
    <body><table><tbody>
       ${Object.keys(cv).forEach(function (key) {
         var val = cv[key];
         {
           `<tr><td>${val}</td></tr>`;
         }
       })}
       </tbody></table></body></html>`}`;
};
