import cluster from "node:cluster";
import { cpus } from "node:os";
import doteEnvConfig from "./config/doteEnv";
import app from "./app";
import swaggerDocs from '@src/plugins/swagger/swagger';
doteEnvConfig;

if (cluster.isPrimary) {
  console.log(`Server started primary process: ${process.pid}`);
  
  const CPUS = 3

  for(let i = 0; i < CPUS; i++){
      cluster.fork()
  }
  // CPUS.forEach(function () {
  //   cluster.fork();
  // });

  cluster.on("exit", (worker: any, code: string, signal: string | number) => {
    console.log(
      `Server process dead: ${worker.process.pid} with code: ${code}`
    );
    console.log(`[New process started...... ]`);
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(
      `Server started in port: ${process.env.PORT} on process: ${process.pid}`
    );
  });
}
