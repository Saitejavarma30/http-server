import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {

  socket.on("data", (data) =>{
    // console.log("recieved the request", data.toString())


    const dataAsString = data.toString();
    // console.log(dataAsString);
    const tempData = dataAsString.split(" ")
    const dynamic_val = tempData[1].split("/")[2]
    if(tempData[1] === "/"){
      const httpResponse: string = `HTTP/1.1 200 OK\r\n\r\n`;
      socket.write(httpResponse);
    }
    else if(tempData[1] === `/echo/${dynamic_val}`){
        const httpResponse: string = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${dynamic_val.length}\r\n\r\n${dynamic_val}`
        socket.write(httpResponse);
      }
    else if(tempData[1] === '/user-agent'){
      const userAgent = dataAsString.split("\n")[1]
      const userAgentFinal = userAgent.split(": ")[1]
      console.log(userAgent)
      console.log(userAgentFinal.length)
      const httpResponse: string = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgentFinal.length}\r\n\r\n${userAgentFinal}`
      socket.write(httpResponse);
    }
      else {
        const httpResponse: string = `HTTP/1.1 404 Not Found\r\n\r\n`;
        socket.write(httpResponse)
    }
   socket.end();


  })

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
