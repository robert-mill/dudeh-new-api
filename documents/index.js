const { forEach, at } = require("lodash");
module.exports = ({ cv, interests, qualifications, workexperiences }) => {
  return `${`<!doctype html>
    <html>
      <head>
        <meta charset='utf-8'>
        <title>Dennis Udeh</title> 
        
      <style>
      table, tr, td, th{
        border:none!important;
      }
        table{
          
          border-collapse: collapse;
        }
      </style>
    </head>
    <body><table><tbody>
    ${Array(cv.length)
      .join(0)
      .split(0)
      .map(
        (m, i) =>
          cv[i] &&
          `<tr key=${cv[i]._id}>
          <td>
            <div class="cv-head">${cv[i].heading}</div>
            <div class="cv-body">${cv[i].body}</div>
          </td>
        </tr>`
      )
      .join("")}
       </tbody></table></body></html>`}`;
};
