import * as net from "net";
import * as fs from "node:fs";
import * as path from "node:path";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    // console.log("recieved the request", data.toString())

    const dataAsString = data.toString();
    // console.log(dataAsString);
    const tempData = dataAsString.split(" ");
    const dynamic_val = tempData[1].split("/")[2];
    if (tempData[1] === "/") {
      const httpResponse: string = `HTTP/1.1 200 OK\r\n\r\n`;
      socket.write(httpResponse);
    } else if (tempData[1] === `/echo/${dynamic_val}`) {
      const httpResponse: string = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${dynamic_val.length}\r\n\r\n${dynamic_val}`;
      socket.write(httpResponse);
    } else if (tempData[1] === "/user-agent") {
      const userAgent = dataAsString.split("\r\n")[2];
      const userAgentFinal = userAgent.split(": ")[1];
      console.log(userAgentFinal);
      console.log(userAgentFinal.length);
      const httpResponse: string = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgentFinal.length}\r\n\r\n${userAgentFinal}`;
      socket.write(httpResponse);
    } else if (tempData[1] === `/files/${dynamic_val}`) {
      const dir = process.argv.slice(3).join("/");
      const filePath = path.join(dir, dynamic_val);
      try{
        const fileContent = fs.readFileSync(filePath);
        const httpResponse: string = `HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${fileContent.length}\r\n\r\n${fileContent}`;
        socket.write(httpResponse);
      }
      catch(err){
        const httpResponse: string = `HTTP/1.1 404 Not Found\r\n\r\n`;
        socket.write(httpResponse);
      }
    } else {
      const httpResponse: string = `HTTP/1.1 404 Not Found\r\n\r\n`;
      socket.write(httpResponse);
    }
    socket.end();
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
