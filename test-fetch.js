const http = require('http');

http.get('http://localhost:4000/api/inventario/reportes/todos', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data));
}).on('error', (err) => {
  console.error("Error: " + err.message);
});
