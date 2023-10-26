import grpc from "@grpc/grpc-js";
import loader from "@grpc/proto-loader";
import microServices from "./microServices.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROTO_PATH = __dirname + "/crud.proto";
const PORT = 50051;

const packageDefinition = loader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const protoServer = new grpc.Server();

protoServer.addService(protoDescriptor.Products.service, {
    create: microServices.Create,
    read: microServices.Read,
    update: microServices.Update,
    delete: microServices.Delete,
    readAll: microServices.ReadAll,
});

protoServer.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      protoServer.start();
      console.log(`Server running at http://localhost:${PORT}`);
    }
  );

