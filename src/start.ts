import MyServer from "./server";

const port: number = process.env.PORT !== undefined ? +process.env.PORT : 5000;

if (process.argv[2] !== "test") {
	let server = new MyServer();
	server.start(port);
}
