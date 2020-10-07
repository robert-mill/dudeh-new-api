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
        ${cv.foreach(function (index, el, arr) {
          `<tr><td>${el.heading}</td></tr>
          <tr><td>${el.body}</td></tr>`;
        })}
        </tbody></table></body></html>`}`;
};
