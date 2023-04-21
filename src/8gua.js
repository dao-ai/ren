// 定义周易八卦
const yijing = {
  qian: "111111",
  dui: "010010",
  li: "010001",
  zhen: "010011",
  xun: "011010",
  kan: "000010",
  gen: "110000",
  kun: "000111",
};

// 定义周易卦辞
const guaCi = {
  qian: "乾：元，亨，利，贞。",
  dui: "兑：利，亨，无，咎。",
  li: "离：利，建，侯，冀，可，凶，无，吉。",
  zhen: "震：亨，震，则，吉。",
  xun: "巽：小，亨，利，攸，往，利，见，大人。",
  kan: "坎：习，坎，有，丧，无，咎。",
  gen: "艮：艮，其，背，不，获，其，身。",
  kun: "坤：履，涣，中，蒙，吉，利，涉，大川。",
};

// 生成卦象
function generateGua() {
  let lines = "";
  for (let i = 0; i < 6; i++) {
    const rand = Math.floor(Math.random() * 2);
    lines += rand.toString();
  }
  // 第六位需要进行模 2 加法
  const sum = lines.split("").reduce((acc, cur) => acc + parseInt(cur), 0);
  lines += (sum % 2).toString();
  return lines;
}

// 解卦
function jieGua(gua) {
  const guaCiArr = Object.values(guaCi);
  const guaName = Object.keys(yijing).find((key) => yijing[key] === gua);
  const guaIndex = Object.keys(yijing).indexOf(guaName);
  const yao = gua[gua.length - 1];
  const yaoIndex = yao === "1" ? 0 : 1;
  console.log({ gua, guaName, guaIndex, yao, yaoIndex });
  const shangGua = Object.keys(yijing)[guaIndex % 8];
  const xiaGua = Object.keys(yijing)[(guaIndex + yaoIndex) % 8];
  const guaStr = `${shangGua}之${xiaGua}`;
  const guaCiStr = guaCiArr[guaIndex];
  const yaoStr = yao === "1" ? "阳爻" : "阴爻";
  console.log(`卦象为：${guaStr}`);
  console.log(`爻辞为：${guaCiStr}`);
  console.log(`本卦为${yaoStr}`);
}

// 主程序
function main() {
  const gua = generateGua();
  jieGua(gua);
}

export default main;
