import express from 'express';

export type MethodTypes = 'get'|'post'|'put'|'delete'|'options';


export class Server {
  private app: express.Express;

  private port: number;
  private host: string;

  constructor(port?: number, host?: string){
    this.app = express();
    this.port = port || (process.env.PORT as any) || 8080
    this.host = host || (process.env.HOST as any) || '0.0.0.0'
  }

  public start(){
    this.app.listen(this.port, this.host, () => {
      console.log(`Mock JSON Server started at http://${this.host}:${this.port}`);
    });
  }

  public async bootstrap(data: any): Promise<void>{
    const routes: string[] = Object.keys(data);
    for (const routeIndex in routes) {
      if(routes[routeIndex]){
        const route = routes[routeIndex];
        // Route can have different methods
        const methods = Object.keys(data[route]);
        for ( const methodIndex in methods ){
          if (methods[methodIndex]){
            const method = methods[methodIndex] as MethodTypes;
            const jsonData: { data?: any, headers?: any } | any = data[route][method];
            await this.app[method](route, (_REQ, res) => {
              if(!jsonData.data || !jsonData.headers){
                return res.json(jsonData);
              }
              Object.entries(jsonData.headers || {}).forEach(([key, s]) => {
                res.setHeader(key, s as string);
              })
              return res.json(jsonData.data);
            })
          }
        }
      }
    }
  }

  public stop () {
    console.log("Server stopped.")
  }

}