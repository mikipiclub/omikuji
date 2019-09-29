let t = document.getElementById('fib');
let k = ['Fi', 'Bu', 'zz', 'zz'];

// 止まるまでの配列
const shuffle = ([...arr]) => {
  // 止まるまでの長さ
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    // 配列の値を入れ替える
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

let result;

// kをシャッフル　,を省く
function resultFib() {
  result = shuffle(k).join('');
  t.innerHTML = result;
}

// 200ミリ秒で表示し続ける
let id = setInterval(function(){
  resultFib();
  if (result === 'FizzBuzz') {
    clearInterval(id);
  }
}, 200);
