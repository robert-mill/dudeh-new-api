const { forEach, at } = require("lodash");

module.exports = ({ cv, qualifications, workexperience, interests }) => {
  return `
    ${`<!doctype html>
            <html>
              <head>
                <meta charset='utf-8'>
                <title>Colchester Breathe Easy Newsletter date </title> 
                <style>
                  #element{
                    column-count: 3;
                                column-gap: 40px;
                                column-width: 200px;  
                  }
                </style>

            </head>
            <body>
            <div class="newsletter-block" style="max-width: 800px;
            margin: auto;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica',
            color: #555;">
              <table cellpadding="0" cellspacing="0" style="width:100%;
              display:block;">
              <tbody>
                <tr className="pdf-intro" colSpan="2"  style="background-image:url(https://res.cloudinary.com/hdlnpzj2s/image/upload/v1594049073/cbe-banner-2_coiing.jpg);
                background-size: cover;
                background-repeat:no-repeat;
                padding: 0.5rem;
                display: table-row;
                border-bottom: 1px solid #eeeeee;">
                  <td style="padding:1rem;">
                   <h1 style="color:#ffffff; font-size: 30px; line-height:40px;">
                   CV
                  </h1>
                  </td>
                </tr>
                <tr class="newsletter-intro" colSpan="2">
                    <td style="padding:1rem;">
                      <table>
                        <tbody>
                        <tr>
                          <td style="padding:1rem;">${66}
                         </td>
                        </tr>
                        </tbody>
                      </table>
                    </td>
                </tr>
                <tr>
                  <td style="padding:1rem;">
                   
                       stuff
                     
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <script>
                           
              var element = document.getElementById("element");
              element.style."columns: columns: 2 150px";
            </script>
            </body>
          </html>`}
  `;
};
