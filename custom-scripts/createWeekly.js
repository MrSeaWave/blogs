const { execSync } = require('child_process');
const { readFile, writeFile } = require('fs/promises');
const path = require('path');

const RC_FILE_PATH = path.join(__dirname, '../config/rc.json');

async function main() {
  // 读取配置文件
  const data = await readFile(RC_FILE_PATH, 'utf8');
  const opts = JSON.parse(data);
  let num = opts.NoWeekly || 0;
  // 增加编号
  num++;
  let result = { ...opts, NoWeekly: num };
  // 写入配置文件
  await writeFile(RC_FILE_PATH, JSON.stringify(result), 'utf8');
  // 生成新文章
  let no = autoSupplement(String(num));
  try {
    let cmd = `pnpm run new weekly weekly-${no}`;
    console.log('run hexo cmd:', cmd);
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.warn('cmd error', e);
  }
}

/**
 * @desc 数字自动补零
 * @param {String} val
 * @returns
 */
function autoSupplement(val) {
  return val.padStart(2, '0');
}

main();
