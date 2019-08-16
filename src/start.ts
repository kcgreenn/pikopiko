import MyServer from "./server";
import { DB, IModels } from "./models/db";

const port: number = process.env.PORT !== undefined ? +process.env.PORT : 5000;

const db: IModels = DB.Models;

if (process.argv[2] !== "test") {
	let server = new MyServer();
	server.start(port);
}

export default db;
