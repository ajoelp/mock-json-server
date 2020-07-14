import chalk from "chalk";

class Log {
  log(...data: any[]) {
    console.log(...data);
  }

  green(...data: any[]) {
    return chalk.green(...data);
  }

  red(...data: any[]) {
    return chalk.red(...data);
  }

  gray(...data: any[]) {
    return chalk.gray(...data);
  }

  blue(...data: any[]) {
    return chalk.blue(...data);
  }
}

export default new Log();
