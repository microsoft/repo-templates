//
// Copyright (c) Microsoft.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
//

// This is basically a cheap Makefile. In JavaScript. Because...

const { readdir, stat, mkdir, copyFile, unlink, rmdir, writeFile } = require('fs').promises;
const path = require('path');

const templateSpecificExclusions = require('../projections/common-excludes.json');

const projectionsPath = path.resolve(path.join(__dirname, '..', 'projections'));
const sharedPath = path.resolve(path.join(__dirname, '..', 'shared'));
const templatesPath = path.resolve(path.join(__dirname, '..', 'templates'));

function logWithFooter(msg) {
  console.log(msg);
  console.log('='.repeat(msg.length));
}

const appPackage = require('../package.json');
const publishingPackage = path.resolve('__dirname', '..' ,'publishing-package.json');

async function build() {
  if (await exists(templatesPath)) {
    console.log(`Cleaning up existing templates from ${templatesPath}`);
    await burn(templatesPath);
    await rmdir(templatesPath, { recursive: true });
    console.log();
  }
  await mkdir(templatesPath);

  // Create a packaging version
  appPackage.private = false;
  console.log(`Writing ${publishingPackage}`);
  await writeFile(publishingPackage, JSON.stringify(appPackage, null, 2));
  console.log();

  const sharedFiles = await allFiles(sharedPath);

  logWithFooter(`Shared common files from ${sharedPath}`);
  sharedFiles.map(file => console.log(file));
  console.log();

  const templateNames = await directoryNames(projectionsPath);
  for (const templateName of templateNames) {
    await tryBuildTemplate(projectionsPath, templateName, sharedFiles);
  }

  const definitionsFile = 'definitions.json';
  await copyTo(`- ${definitionsFile}`, path.join(projectionsPath, definitionsFile), path.join(templatesPath, definitionsFile));
}

async function tryBuildTemplate(projectionsPath, templateName, sharedFiles) {
  logWithFooter(templateName);
  const templateSourceRoot = path.join(projectionsPath, templateName);
  const destinationRoot = path.join(templatesPath, templateName);
  if (await exists(destinationRoot)) {
    throw new Error(`Destination root ${destinationRoot} for template ${templateName} already exists...`);
  }
  await mkdir(destinationRoot);

  const specialExclusions = templateSpecificExclusions[templateName];
  if (specialExclusions) {
    console.log('This template excludes some shared, common files, if present:');
    console.dir(specialExclusions);
    console.log();
  }
  for (const file of sharedFiles) {
    if (specialExclusions && specialExclusions.includes(file.toLowerCase())) {
      console.log(`- ${file} (excluded)`);
      continue;
    }
    await copyTo(`+ ${file}`, path.join(sharedPath, file), path.join(destinationRoot, file));
  }

  const customTemplateFiles = await allFiles(templateSourceRoot);
  if (customTemplateFiles.length) {
    console.log();
    console.log(`Placing ${customTemplateFiles.length} template-specific files...`);
    for (const file of customTemplateFiles) {
      await copyTo(`+ ${file}`, path.join(templateSourceRoot, file), path.join(destinationRoot, file));
    }
  }

  console.log();
}

build().then(exit => process.exit(0)).catch(error => {
  console.log(error);
  process.exit(1);
});

async function burn(folder) {
  const files = await allFiles(folder);
  for (let i = 0; i < files.length; i++) {
    const p = path.join(folder, files[i]);
    console.log(`Burning ${p}`)
    await unlink(p);
  }
}

async function copyTo(shortName, source, dest) {
  console.log(shortName);
  const dirname = path.dirname(dest);
  if (!await exists(dirname)) {
    console.log(`Creating destination directory ${dirname}`);
    await mkdir(dirname);
  }
  console.log(`  ${source} -> ${dest}`);
  await copyFile(source, dest);
}

async function directoryNames(dir) {
  const dirs = [];
  for (const file of await readdir(dir)) {
    if ((await stat(path.join(dir, file))).isDirectory()) {
      dirs.push(file);
    }
  }
  return dirs;
}

async function allFiles(rootDirectory, subPath) {
  let files = [];
  subPath = subPath ? `${subPath}/` : '';
  if (!rootDirectory) {
    console.log(rootDirectory);
    console.log(subPath);
    throw new Error('wtf');
  }
  if (rootDirectory) {
    for (const file of await readdir(rootDirectory)) {
      const joined = path.join(rootDirectory, file);
      const statObject = await stat(joined);
      if (statObject.isDirectory()) {
        files = [...files, ...await allFiles(joined, `${subPath}${file}`)];
      } else if (statObject.isFile()) {
        files.push(`${subPath}${file}`);
      }
    }
  }
  return files;
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}