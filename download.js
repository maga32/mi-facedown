import fs from "fs";
import path from "path";
import https from "https";
import sharp from "sharp";

// 데이터
let test = [
  {model:`miwear.watch.p65`, link:`https://cdn.cnbj1.fds.api.mi-img.com/hlth-operate/static-files/db791d41f0a2dff7e1828c4e2334767d_preview.webp`},
  {model:`miwear.watch.o66tc`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/64b70c6d311cf1b7ff39873010c19436.webp`},
  {model:`miwear.watch.o66nfc`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/bb4ecc4dfbffb9d6f95fbe0c3a317918.webp`},
  {model:`miwear.watch.o66lj`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/4b19693a00c3e5e455002970729f9d6a_preview.webp`},
  {model:`miwear.watch.o66glt`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/709eca7a3f7135ac8b20a2a637240705.webp`},
  {model:`miwear.watch.o66glp`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/4b19693a00c3e5e455002970729f9d6a_preview.webp`},
  {model:`miwear.watch.o66gln`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/e10632c895aae1ec609ac095f4d283e4.webp`},
  {model:`miwear.watch.o66gl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/e10632c895aae1ec609ac095f4d283e4.webp`},
  {model:`miwear.watch.o66cn`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/bb4ecc4dfbffb9d6f95fbe0c3a317918.webp`},
  {model:`miwear.watch.o65w`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/90dfae9fe8535e2c14a4040b015ec2d8_preview.webp`},
  {model:`miwear.watch.o65m`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/90dfae9fe8535e2c14a4040b015ec2d8_preview.webp`},
  {model:`miwear.watch.o65`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/90dfae9fe8535e2c14a4040b015ec2d8_preview.webp`},
  {model:`miwear.watch.o63w`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/33dc9adc6ad3c3fc0b77565d964d85bd.webp`},
  {model:`miwear.watch.o63`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/33dc9adc6ad3c3fc0b77565d964d85bd.webp`},
  {model:`miwear.watch.n69gl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/70e35fcf3bafa6a02f0b200b8c5a400a_preview.webp`},
  {model:`miwear.watch.n69cn`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/70e35fcf3bafa6a02f0b200b8c5a400a_preview.webp`},
  {model:`miwear.watch.n67gl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/98fe00edbf451f936cc1a65cd2960cf3_preview.webp`},
  {model:`miwear.watch.n67cn`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/2ce6c381dfcbb4299023934f9784c30f.webp`},
  {model:`miwear.watch.n66tc`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/n66_taoci_preview.webp`},
  {model:`miwear.watch.n66nfc`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/n66_preview.webp`},
  {model:`miwear.watch.n66gln`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/n66_preview_aboard.webp`},
  {model:`miwear.watch.n66gl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/n66_preview_aboard.webp`},
  {model:`miwear.watch.n66cn`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/n66_preview.webp`},
  {model:`miwear.watch.m66nfc`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/3fcf617a8a8acafea6f2e4db5a60654d_big.webp`},
  {model:`miwear.watch.m66gl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/7816ae801f8f5e3d3671540f2ed0f609_big.webp`},
  {model:`miwear.watch.m66dsn`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/5975de3de8fa4b893b7521629063cbd3_big.webp`},
  {model:`miwear.watch.m66`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/3fcf617a8a8acafea6f2e4db5a60654d_big.webp`},
  {model:`mijia.watch.v1ru`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_340817c9316d5dada1055e2ce7f1d90d.webp`},
  {model:`mijia.watch.v1la`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_340817c9316d5dada1055e2ce7f1d90d.webp`},
  {model:`mijia.watch.v1hktw`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_340817c9316d5dada1055e2ce7f1d90d.webp`},
  {model:`mijia.watch.v1dist`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_340817c9316d5dada1055e2ce7f1d90d.webp`},
  {model:`mijia.watch.v1`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_729cc853dd49acd2fd1dd7c6cbb61a4c.webp`},
  {model:`mijia.watch.o62m`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/2da85f218bb7eed1a957aac6b2b491f5_preview.webp`},
  {model:`mijia.watch.o62lte`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/2a5b0acd435aa499e5f436c97769115f_preview.webp`},
  {model:`mijia.watch.o62gl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/2a5b0acd435aa499e5f436c97769115f_preview.webp`},
  {model:`mijia.watch.o62`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/2a5b0acd435aa499e5f436c97769115f_preview.webp`},
  {model:`mijia.watch.n62w`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/434fbb23ebf32927ff099c9a9e27ccdf_preview.webp`},
  {model:`mijia.watch.n62s`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/n62s_preview.webp`},
  {model:`mijia.watch.n62lte`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/434fbb23ebf32927ff099c9a9e27ccdf_preview.webp`},
  {model:`mijia.watch.n62cg`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/7a4dc32512aebda25623cb79b08ee2d6_big.webp`},
  {model:`mijia.watch.n62car`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/d0817423baad957536dccd756a689535_big.webp`},
  {model:`mijia.watch.n62`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/434fbb23ebf32927ff099c9a9e27ccdf_preview.webp`},
  {model:`mijia.watch.n60e`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/02706d8c6bff78655fbfe5c4edbfeb8a_preview.webp`},
  {model:`mijia.watch.n60`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/02706d8c6bff78655fbfe5c4edbfeb8a_preview.webp`},
  {model:`mijia.watch.m69gl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_98320b892a775515f189a2af41e79ea0_47333079252993.webp`},
  {model:`mijia.watch.m69bgl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/22ff8d0fa0f62bed2889eb5445c66e27_big.webp`},
  {model:`mijia.watch.m69as`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_98320b892a775515f189a2af41e79ea0_47333079252993.webp`},
  {model:`mijia.watch.m69`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_98320b892a775515f189a2af41e79ea0_47333079252993.webp`},
  {model:`mijia.watch.m61wl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/d9f17a6a2fd366589142bd0125db7004_big.webp`},
  {model:`mijia.watch.m61w`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/d9f17a6a2fd366589142bd0125db7004_big.webp`},
  {model:`mijia.watch.m61twl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/d9f17a6a2fd366589142bd0125db7004_big.webp`},
  {model:`mijia.watch.m61c`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/85214e14246388c9a84e7e3456044948_preview.webp`},
  {model:`mijia.watch.l61w`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_6229229abe2c865449e1a159f6999402.webp`},
  {model:`mijia.watch.l61tw`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_6229229abe2c865449e1a159f6999402.webp`},
  {model:`mijia.watch.l61`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_6229229abe2c865449e1a159f6999402.webp`},
  {model:`mijia.watch.band01me`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_94034d38b3decd09f95cc7350a9f2777.webp`},
  {model:`mijia.watch.band01hktw`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_94034d38b3decd09f95cc7350a9f2777.webp`},
  {model:`mijia.watch.band01dist`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_94034d38b3decd09f95cc7350a9f2777.webp`},
  {model:`mijia.watch.band01`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_1335d537572fe52705da95df64182d8b.webp`},
  {model:`midr.watch.sportsa`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_8794f2d01636ba4758951beefa3abf7d.webp`},
  {model:`midr.watch.sports`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_8794f2d01636ba4758951beefa3abf7d.webp`},
  {model:`midr.watch.m62s`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_8b0b19595d2bc5765ee76e1e002d4766.webp`},
  {model:`midr.watch.m62a`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_95bdd1243899134c2e787e6e335e5ccd.webp`},
  {model:`midr.watch.k65w`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_b31276a9c0031edc703938aab9d43d1f.webp`},
  {model:`midr.watch.k65a`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_2bd0031335038d7f5ea74a7b964e8dee.webp`},
  {model:`midr.watch.k65`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_b31276a9c0031edc703938aab9d43d1f.webp`},
  {model:`midr.watch.k63a`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_824cabb9b2373a48ee6bfb4052a7bbd8.webp`},
  {model:`midr.watch.k63`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_824cabb9b2373a48ee6bfb4052a7bbd8.webp`},
  {model:`midr.watch.k62a`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_f2bbe321475704cb38dc866297b68414.webp`},
  {model:`midr.watch.k62`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_f2bbe321475704cb38dc866297b68414.webp`},
  {model:`midr.watch.ds`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_ca130de34954848ed486225533958221.webp`},
  {model:`midr.bracelet.k67`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_e41a0f44a35fdede59ee0055e207b92f.webp`},
  {model:`lchz.watch.n65gl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/2a5c042bf1d558c5774334c1da96370d_big.webp`},
  {model:`lchz.watch.n65bgl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/12a3d4fd4bf698ccebddf3bb4a5fbe36_preview.webp`},
  {model:`lchz.watch.n65agl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/5ed0d19f59fda1fe7864014df19de8af_preview.webp`},
  {model:`lchz.watch.n65`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/53b14210b1d29fc556c5a14ccc8d96fb_big.webp`},
  {model:`lchz.watch.m67ys`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/tws_icon/21377984cb924bff0a6a362280646f83_big.webp`},
  {model:`lchz.watch.m67gl`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/298a229add209f6cc20640d127274796_preview.webp`},
  {model:`lchz.watch.m67`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/ae6160b125cfb855fdcdbb9672056fca_big.webp`},
  {model:`lchz.watch.m65sa`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_4116819277e519d65a7c7b889440dcde.webp`},
  {model:`lchz.watch.m65s`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_4116819277e519d65a7c7b889440dcde.webp`},
  {model:`lchz.watch.m65ac`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/660a4869d35191ae2650c571427cc684_big.webp`},
  {model:`lchz.watch.m65a`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/b6d3a81780e7d73529e323df35b7eea3_big.webp`},
  {model:`hqbd3.watch.l67in`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_da0a3e5108a1709484c0f6e2bc7b51c1.webp`},
  {model:`hqbd3.watch.l67`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_5973eb90265ba29363be19842ddacc78.webp`},
  {model:`hmpace.watch.v7nfc`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_c840490162cd412b9001b4459e4aeca6.webp`},
  {model:`hmpace.watch.v7`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_c840490162cd412b9001b4459e4aeca6.webp`},
  {model:`hmpace.motion.v6nfc`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_86e3edec5694293c862bfcb6ed3e00f6.webp`},
  {model:`hmpace.motion.v6`, link:`https://cdn.alsgp0.fds.api.mi-img.com/static-files/icon/big_86e3edec5694293c862bfcb6ed3e00f6.webp`},
  {model:`hmpace.bracelet.v5h`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_1cb99a55dffa6cd9aa595e5bf44e148e.webp`},
  {model:`hmpace.bracelet.v5`, link:`https://cdn.cnbj1.fds.api.mi-img.com/static-files/icon/big_1cb99a55dffa6cd9aa595e5bf44e148e.webp`}
];

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

  for (const item of test) {
    if (!item.link) {
      console.log(`skip: ${item.model} (no link)`);
      continue;
    }

    const filepath = path.join(targetDir, `${item.model}.webp`);
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

