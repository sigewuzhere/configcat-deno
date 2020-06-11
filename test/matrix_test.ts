import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { readFileStr } from "https://deno.land/std/fs/mod.ts";
import { EOL } from "https://deno.land/std/fs/eol.ts";

import { RolloutEvaluator, User } from "../common/RolloutEvaluator.ts";
import { ProjectConfig } from "../common/ProjectConfig.ts";
import { ConfigCatConsoleLogger } from "../common/ConfigCatLogger.ts";
import { LogLevel, IConfigCatLogger } from "../common/index.ts";

Deno.test("MatrixTests GetValue basic operators", async () => {
  await Helper.RunMatrixTest("test/sample_v4.json", "test/testmatrix.csv");
});

// describe("MatrixTests", () => {

//   it("GetValue basic operators", (done) => {
//     Helper.RunMatrixTest("test/sample_v4.json", "test/testmatrix.csv", done);
//   });

//   it("GetValue numeric operators", (done) => {
//     Helper.RunMatrixTest(
//       "test/sample_number_v4.json",
//       "test/testmatrix_number.csv",
//       done,
//     );
//   });

//   it("GetValue semver operators", (done) => {
//     Helper.RunMatrixTest(
//       "test/sample_semantic_v4.json",
//       "test/testmatrix_semantic.csv",
//       done,
//     );
//   });

//   it("GetValue semver operators", (done) => {
//     Helper.RunMatrixTest(
//       "test/sample_semantic_2_v4.json",
//       "test/testmatrix_semantic_2.csv",
//       done,
//     );
//   });

//   it("GetValue sensitive operators", (done) => {
//     Helper.RunMatrixTest(
//       "test/sample_sensitive_v4.json",
//       "test/testmatrix_sensitive.csv",
//       done,
//     );
//   });

class Helper {
  public static CreateUser(row: string, headers: string[]): User | null {
    let column: string[] = row.split(";");
    const USERNULL: string = "##null##";

    if (column[0] === USERNULL) {
      return null;
    }

    let result: User = new User(column[0]);

    if (column[1] !== USERNULL) {
      result.email = column[1];
    }

    if (column[2] !== USERNULL) {
      result.country = column[2];
    }

    if ( result.custom && column[3] !== USERNULL) {
      result.custom[headers[3]] = column[3];
    }

    return result;
  }

  public static GetTypedValue(
    value: string,
    header: string,
  ): string | boolean | number {
    if (header.substring(0, "bool".length) === "bool") {
      return value.toLowerCase() === "true";
    }

    if (header.substring(0, "double".length) === "double") {
      return +value;
    }

    if (header.substring(0, "integer".length) === "integer") {
      return +value;
    }

    return value;
  }

  public static async RunMatrixTest(
    sampleFilePath: string,
    matrixFilePath: string,
  ) {
    const ENCODING: string = "utf8";
    const SAMPLE: string = await readFileStr(
      sampleFilePath,
      { encoding: ENCODING },
    );
    const CONFIG: ProjectConfig = new ProjectConfig(0, SAMPLE, "");
    let logger: IConfigCatLogger = new ConfigCatConsoleLogger(LogLevel.Off);
    if (!logger) throw "No logger";
    let evaluator: RolloutEvaluator = new RolloutEvaluator(logger);
    if (!evaluator) throw "No evaluator";

    let rowNo: number = 1;

    const MATRIX: string = await readFileStr(
      matrixFilePath,
      { encoding: ENCODING },
    );

    var lines: string[] = MATRIX.toString().split(EOL.CRLF);
    if (!lines || lines.length !== 0) {
        throw "Matrix has no lines";
    }
    let header: string[] = lines.shift().split(";");

    lines.forEach((line: string): void => {
      if (!line) {
        return;
      }

      let user: User | null = Helper.CreateUser(line, header);

      for (let i = 4; i < header.length; i++) {
        let key: string = header[i];
        let actual: any = evaluator.Evaluate(CONFIG, key, null, user).Value;
        let expected: any = Helper.GetTypedValue(line.split(";")[i], key);

        if (actual !== expected) {
          let l = `Matrix test failed in line ${rowNo}. User: ${
            JSON.stringify(user)
          }, Key: ${key}, Actual: ${actual}, Expected: ${expected}`;
          console.log(l);
        }

        assertEquals(actual, expected);
      }
      rowNo++;
    });
  }
}
