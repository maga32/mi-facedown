import fs from "fs";
import path from "path";
import https from "https";
import sharp from "sharp";

const watchListUrl = "https://w-peach.duckdns.org/util/notion?url="+encodeURIComponent("https://maga32.notion.site/d6818f3316f74127be7d5b53948651da")+"&"+Date.now();
const targetDir = path.join("target");
const outputDir = "static";

// 경로 생성
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 썸네일 다운로드
const download = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error("Request Failed: " + res.statusCode));
        return;
      }
      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close(resolve);
      });
    }).on("error", reject);
  });
}

// 리사이징
const resizeImage = async (srcPath, destPath) => {
  return sharp(srcPath)
    .resize({ width: 100, height: 100, fit: "inside"}) // 사이즈 조정
    .webp({ quality: 100 })  // 압축률 조정
    .toFile(destPath);
}

const run = async () => {
  // download
  ensureDir(targetDir);

  // watchList from watchListUrl
  const res = await fetch(watchListUrl);
  if (!res.ok) throw new Error(`watchList fetch failed: ${res.status} ${res.statusText}`);
  const watchList = await res.json();
  //{[prod:`miwear.watch.p65`, link:`imgUrl`},...]

  for (const item of watchList) {
    if (!item.link) {
      console.log(`skip: ${item.prod} (no link)`);
      continue;
    }

    const filepath = path.join(targetDir, `${item.prod}.webp`);
    console.log(`downloading: ${filepath}`);

    try {
      await download(item.link, filepath);
      console.log(`✔ saved ${filepath}`);
    } catch (err) {
      console.log(`✘ failed ${filepath}:`, err.message);
    }
  }

  // resize
  ensureDir(outputDir);

  const files = await fs.readdirSync(targetDir).filter(f => f.endsWith(".webp"));

  for (const file of files) {
    const src = path.join(targetDir, file);
    const dest = path.join(outputDir, file);

    console.log(`resizing: ${file}`);

    try {
      await resizeImage(src, dest);
      console.log(`✔ saved: ${dest}`);
    } catch (err) {
      console.error(`✘ failed: ${file}`, err);
    }
  }
}

run();

