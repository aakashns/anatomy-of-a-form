const html = (strings, ...values) => String.raw({ raw: strings }, ...values);

function renderPage({ values }) {
  return html` <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="/script.js"></script>
        <title>Account Settings</title>
      </head>
      <body>
        <form id="settings-form" method="post" enctype="multipart/form-data" action="/">
          <header>
            <h1>Account Settings</h1>
          </header>

          <fieldset>
            <label>
              <div>Full Name</div>
              <input name="full_name" type="text" placeholder="John" required />
            </label>

            <label>
              <div>Email</div>
              <input name="email" type="email" placeholder="johndoe@example.com" />
            </label>

            <label>
              <div>Avatar</div>
              <input name="avatar_file" type="file" />
            </label>

            <label>
              <div>Bio</div>
              <textarea name="bio" placeholder="Enter your bio here"></textarea>
            </label>
          </fieldset>

          <footer>
            <input type="submit" value="Save Settings" />
          </footer>
        </form>
      </body>
    </html>`;
}

async function handleRequest(request, env, ctx) {
  const page = renderPage({});
  const headers = { "Content-Type": "text/html" };
  return new Response(page, {
    headers: headers,
  });
}

export default {
  fetch: handleRequest,
};
