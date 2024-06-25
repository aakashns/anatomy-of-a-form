const http = require("node:http");
const fs = require("node:fs");

function escapeHtml(unsafe) {
  return unsafe
    .replace("&", "&amp;")
    .replace("<", "&lt;")
    .replace(">", "&gt;")
    .replace('"', "&quot;")
    .replace("'", "&#039;");
}

function renderFullNameField(value) {
  return `
    <label>
      <div>Full Name</div>
      <input
        name="full_name"
        type="text"
        placeholder="John"
        required
        maxlength="64"
        value="${escapeHtml(value)}"
      />
    </label>
  `;
}

function renderEmailField(value = "") {
  return `
    <label>
      <div>Email</div>
      <input
        name="email"
        type="email"
        value="${escapeHtml(value)}"
        readonly
      />
    </label>
  `;
}

function renderAvatarField(value = "") {
  return `
    <label>
      <div>Avatar</div>
      <img src="${escapeHtml(value)}" class="avatar-preview" height="80">
      <input
        name="avatar_file"
        type="file"
      />
    </label>
  `;
}

function renderBioField(value = "") {
  return `
    <label>
      <div>Bio</div>
      <textarea
        name="bio" 
        placeholder="Enter your bio here"
        rows="3"
      >${escapeHtml(value)}</textarea>
    </label>
  `;
}

function renderForm(req) {
  const initialValues = JSON.parse(fs.readFileSync("./data.json"));
  return `
    <form id="settings-form" method="post" enctype="multipart/form-data" action="/">
      <fieldset>
        ${renderFullNameField(initialValues.fullName)}
        ${renderEmailField(initialValues.email)}
        ${renderAvatarField(initialValues.avatarUrl)}
        ${renderBioField(initialValues.bio)}
      </fieldset>
      <input type="submit" value="Save Settings" />
    </form>
  `;
}

function renderHtmlPage(req) {
  return `
    <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="/script.js"></script>
        <title>Account Settings</title>
      </head>
      <body>
        <div id="container">
          <h1>Account Settings</h1>
          ${renderForm(req)}
        </div>
      </body>
    </html>
  `;
}

function handleRequest(req, res) {
  console.log(req.method, " ", req.url);
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(renderHtmlPage(req));
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    if (fs.existsSync("styles.css")) res.write(fs.readFileSync("styles.css"));
  } else if (req.url === "/script.js") {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    if (fs.existsSync("script.js")) res.write(fs.readFileSync("script.js"));
  } else {
    res.writeHead(404);
    res.write("Not Found");
  }
  res.end();
}

http.createServer(handleRequest).listen(8080);
