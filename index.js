#!/usr/bin/env node
import inquirer from "inquirer";
import fs, { promises as fsp } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync, spawn } from "child_process";
import ora from 'ora';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function mergePackageJson(basePackage, frameworkPackage) {
  const mergedPackage = { ...basePackage };

  for (const [key, value] of Object.entries(frameworkPackage)) {
    if (
      value &&
      !Array.isArray(value) &&
      typeof value === "object" &&
      mergedPackage[key] &&
      !Array.isArray(mergedPackage[key]) &&
      typeof mergedPackage[key] === "object"
    ) {
      mergedPackage[key] = {
        ...mergedPackage[key],
        ...value,
      };
    } else {
      mergedPackage[key] = value;
    }
  }

  return mergedPackage;
}

async function runCommandWithSpinner(command, args, message) {
  const spinner = ora(message).start();
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "ignore",
    });
    child.on("close", (code) => {
      if (code === 0) {
        spinner.succeed("Dependencies installed successfully!");
        resolve();
      } else {
        spinner.fail("Failed to install dependencies");
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });
    child.on("error", (error) => {
      spinner.fail("Failed to install dependencies");
      reject(error);
    });
  });
}

async function createProjectFiles(targetDir, commonDir, templateDir) {
  const spinner = ora("Creating project files...").start();

  try {
    const frameworkCore = path.join(__dirname, "template", templateDir, "src");
    const frameworkBuild = path.join(__dirname, "template", templateDir, "rsbuild.render.ts");
    const frameworkPackage = path.join(__dirname, "template", templateDir, "package.json");
    const commonPackage = path.join(commonDir, "package.json");
    const renderDir = path.join(targetDir, "src", "render");
    const builderDir = path.join(targetDir, "builder", "rsbuild.render.ts");
    const targetPackage = path.join(targetDir, "package.json");
    

    await fsp.mkdir(targetDir);
    await fsp.cp(commonDir, targetDir, { recursive: true });
    await fsp.mkdir(renderDir, { recursive: true });
    await fsp.cp(frameworkCore, renderDir, { recursive: true });
    await fsp.cp(frameworkBuild, builderDir, { recursive: true });

    const commonPackageJson = JSON.parse(await fsp.readFile(commonPackage, "utf8"));
    const frameworkPackageJson = JSON.parse(await fsp.readFile(frameworkPackage, "utf8"));
    const mergedPackageJson = mergePackageJson(commonPackageJson, frameworkPackageJson);

    await fsp.writeFile(targetPackage, `${JSON.stringify(mergedPackageJson, null, 2)}\n`);
    spinner.succeed("Project files created successfully!");
  } catch (err) {
    spinner.fail("Failed to create project files!");
    throw err;
  }
}


async function main() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Please input project name:",
      default: "electron-app",
    },
    {
        type: 'list',
        name: 'template',
        message: 'Please select template:',
        choices: ['react', 'vue'],
        default: 'react'
    },
    {
      type: "list",
      name: "packageManager",
      message: "Please select package manager:",
      choices: ["pnpm", "yarn", "npm"],
      default: "pnpm"
    }
  ]);

  const projectName = answers.projectName.trim();
  const styles = answers.styles;
  const templateDir = answers.template;
  const packageManager = answers.packageManager;
  const targetDir = path.resolve(process.cwd(), projectName);

  // 判断目标目录是否存在
  if (fs.existsSync(targetDir)) {
    console.error(`❌ Project ${projectName} already exists!`);
    process.exit(1);
  }

  const commonDir = path.join(__dirname, "template", "common");
  await createProjectFiles(targetDir, commonDir, templateDir);

  try {
    execSync(`${packageManager} --version`, { stdio: "ignore" });
  } catch (err) {
    console.error(`❌ Command not found: ${packageManager}`); 
    console.error(`👉 Please install ${packageManager} first.`);
    process.exit(1);
  }

  try {
    process.chdir(targetDir);
    await runCommandWithSpinner(
      packageManager,
      ["install"],
      `Installing dependencies with ${packageManager}...`
    );
  } catch (error) {
    console.error('Error:', error.message);
    console.log(`👉 You can manually install dependencies later by running:`);
    console.log(`   cd ${projectName}`);
    console.log(`   ${packageManager} install\n`);
  }

  console.log(`\n✅ Project ${projectName} created successfully!`);
  console.log("👉 Next steps:");
  console.log(`   cd ${projectName}`);
  console.log(`   ${packageManager} run dev\n`);
}

main()
.catch(err => {
  if (err.isTtyError || err.name === "ExitPromptError") {
    process.exit(0); 
  }
  console.error(err);
  process.exit(1);
});