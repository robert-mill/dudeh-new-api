const { forEach, at } = require("lodash");
module.exports = ({ cv, interests, qualifications, workexperiences }) => {
  return `${`<!doctype html>
    <html>
      <head>
        <meta charset='utf-8'>
        <title>Dennis Udeh</title> 
        
      <style>
      table, tr, td, th{
        border:none;
      }
        table{
          
          border-collapse: collapse;
        }
        .workexperiences-body table tr td{
            border:1px solid rgba(0,0,0,0.8);
            padding:1rem;
          
        }
      </style>
    </head>
    <body>
    <table><tbody>
     
    ${
      cv.length &&
      Array(cv.length)
        .join(0)
        .split(0)
        .map(
          (m, i) =>
            `<tr><td>
            ${cv[i].heading && `<div class="cv-head">${cv[i].heading}</div>`}
            ${cv[i].body && `<div class="cv-body">${cv[i].body}</div>`}
          </td></tr>`
        )
        .join("")
    }
      ${
        workexperiences.length &&
        `<tr><td><h4>Work Experience</h4></td></tr>
        ${Array(workexperiences.length)
          .join(0)
          .split(0)
          .map(
            (m, i) =>
              `<tr key=${workexperiences[i]._id}>
            <td >
              <div class="workexperiences-head">${workexperiences[i].heading}</div>
              <div class="workexperiences-body">${workexperiences[i].body}</div>
            </td>
          </tr>`
          )
          .join("")}`
      }

          ${
            qualifications.length &&
           
            `<tr>
              <td>
                <table style="margin-top:1rem; border-collapse: collapse; width: 100%; border-bottom:1px solid rgba(0,0,0,0.3)"><tbody>
                <tr><td><h4>Qualifications</h4></td></tr>
                  <tr style="border-bottom:1px solid rgba(0,0,0,0.3); color:rgba(100,100,100,0.4); text-align:left;"><th>Title</th><th>Description</th><th>Grade</th><th>Locaton</th></tr>
                    ${Array(qualifications.length)
                      .join(0)
                      .split(0)
                      .map(
                        (m, i) =>
                          qualifications[i] &&
                          `<tr key=${qualifications[i]._id} style=${`background-color:${i %2 === 0 ? "rgba(255,255,255,0)" : "rgba(100,100,100,0.1)" }`}>
                      <td>${qualifications[i].title}</td>
                      <td>${qualifications[i].description}</td>
                      <td>${qualifications[i].grade}</td>
                      <td>${qualifications[i].location}</td>
                    </tr>`
                      )
                      .join("")}
            </tbody></table><td></tr>`
          }


          ${
            interests.length &&


            `<tr><td><h4>Personal Interests</h4></td></tr>
            ${Array(interests.length)
              .join(0)
              .split(0)
              .map(
                (m, i) =>
                  interests[i] &&
                  `<tr key=${interests[i]._id}>
              <td>
                <div class="interests-head">${interests[i].heading}</div>
                <div class="interests-body">${interests[i].body}</div>
              </td>
            </tr>`
              )
              .join("")
          }`}

        
       </tbody></table></body></html>`}`;
};
