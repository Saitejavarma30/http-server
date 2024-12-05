import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {

  socket.on("data", (data) =>{
    // console.log("recieved the request", data.toString())


    const dataAsString = data.toString();
    const tempData = dataAsString.split(" ")
    if(tempData[1] === "/"){
      const httpResponse: string = `HTTP/1.1 200 OK\r\n\r\n`;
      socket.write(httpResponse);
    }
    else {
      if(tempData[1].match(/^\/echo\/(.+)$/)){
        // @ts-ignore
        const dynamic_val: string =  tempData[1].match(/^\/echo\/(.+)$/)[1] ;
        console.log(dynamic_val);
        const httpResponse: string = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${dynamic_val.length}\r\n\r\n${dynamic_val}`
        socket.write(httpResponse);
      }
      else {
        const httpResponse: string = `HTTP/1.1 404 Not Found\r\n\r\n`;
        socket.write(httpResponse);
      }
    }
   socket.end();


  })

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
