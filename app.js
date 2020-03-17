const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
let secretKey = null;
let emailMaster = null
//"6LeEe-AUAAAAAEWTxAlBnbKgzvUmORdyxnRxeYml"
const {
  AccountRepository,
  RecaptchaRepository
} = require("./repositories");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");

});

app.post("/webmail", async (req, res) => {
  console.log("at home page", req.get("host"));
  if (!req.body.captcha) {
    return res.json({
      success: false,
      msg: "Capctha is not checked"
    });
  }
  let hostReq = req.get("host")
  const recaptchaDb = await RecaptchaRepository.getrecaptcha(hostReq)
  if (recaptchaDb && recaptchaDb.length) {
    for (let reca of recaptchaDb) {
      if (reca["recaptcha_website_key"])
        emailMaster
      secretKey = reca["client_email_default"]
    }
  } else {
    return res.status(401).json({
      success: false,
      msg: "website not allower"
    });

  }
  let htmlEmail = `<body>
<div class="email-example">
  <h3 style="font-family: arial; color:#009fc2; text-align:center">Please keep this for your records.</h3>
  <td align="center" valign="top">
    <table border="0" style="font-family: arial; color:#565458;" cellpadding="20" cellspacing="0" width="100%" id="Body">
`

  for (let key in req.body) {
    if (key == "captcha") continue;
    console.log(key, req.body[key]);
    htmlEmail += `  <tr>
    <th align="right" valign="top" style="border-bottom:2px solid #edecec;">
      ${key}
    </th>
    <td style="border-bottom:2px solid #edecec;">
      ${req.body[key]}
    </td>
  </tr>
  `
  }
  htmlEmail += `
  </table>
</div>

</body>`

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

  request(verifyUrl, (err, response, body) => {
    if (err) {
      console.log(err);
    }

    body = JSON.parse(body);

    if (!body.success && body.success === undefined) {
      return res.json({
        success: false,
        msg: "captcha verification failed"
      });
    } else if (body.score < 0.5) {
      return res.json({
        success: false,
        msg: "you might be a bot, sorry!",
        score: body.score
      });
    }

    // return json message or continue with your function. Example: loading new page, ect
    return res.send(htmlEmail)
  });
});

app.listen(8083, () => {
  console.log("server is now up!");
});


function validarEmail(valor) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)) {
    return true
  } else {
    return false
  }
}