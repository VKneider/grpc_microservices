import grpc from "@grpc/grpc-js";
import loader from "@grpc/proto-loader";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROTO_PATH = __dirname + "/crud.proto";

const packageDefinition = loader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    });

const crudProto = grpc.loadPackageDefinition(packageDefinition).Products;

const crudClient = new crudProto("localhost:50051", grpc.credentials.createInsecure());

export default crudClient;