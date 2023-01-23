
// ラジアンに変換
function radian(val) {
  return (val * Math.PI) / 180;
}

// ランダムな数
function random(min, max) {
  return Math.random() * (max - min) + min;
}

export {radian, random};