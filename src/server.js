const http = require('http');
const url = require('url');
const query = require('querystring');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dataHandler = require('./responses.js');

// Object that all incoming requests goes through
const urlStruct = {
  GET:
    {
      '/': dataHandler.getIndex,
      '/style.css': dataHandler.getStyle,
      '/success': dataHandler.success,
      '/badRequest': dataHandler.badRequest,
      '/unauthorized': dataHandler.unauthorized,
      '/forbidden': dataHandler.forbidden,
      '/internal': dataHandler.internalError,
      '/notImplemented': dataHandler.notImplemented,
      notFound: dataHandler.notFound,
    },
};

// Directs request to different urls
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const param = query.parse(parsedUrl.query);

  if (urlStruct.GET[parsedUrl.pathname]) {
    urlStruct.GET[parsedUrl.pathname](request, response, param);
  } else {
    urlStruct.GET.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  // console.log(`Listening on Port: 127.0.0.1:${port}`);
});
