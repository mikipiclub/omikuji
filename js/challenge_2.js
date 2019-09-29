const omikuji = document.getElementById('omikuji');
const click = document.getElementById('click');
const num = document.getElementsByClassName('num');
const errorText = document.getElementById('errorText');
const pattern = /^([0-9]|[1-9][0-9]|100)$/
const data = document.getElementById('data');
let pro, pro1, pro2, pro3, pro4, pro5, total;
// 関数外からアクセスするには？

let count_dk = 0; //大吉
let count_ck = 0; //中吉
let count_shk = 0; //小吉
let count_k = 0; // 吉
let count_suk = 0; //末吉
let count_kyo = 0; //凶
let count_dkyo = 0; //大凶
let count = 0; //クリックした総数
let no = 1; //表の始まりの数字

// 正規表現と合うまでおみくじのボタンは押せない
omikuji.disabled = true;

// 入力チェック
click.addEventListener('click', () => {
  // 入力した数字
  pro = [];

  // 1~100の数字なら配列に格納、エラーならfalse
  for (let i = 0; i < num.length; i++) {
    if (num[i].value.match(pattern)) {
      pro[i] = Number(num[i].value);
      console.log(pro[i])
    } else {
      pro[i] = false;
    }
  }
  // 入力した数字の合計値
  total = pro.reduce((a, b) => {
    return a + b;
  });

  // 全てmatchしていて
  if (!pro.includes(false)) {

    // 合計値が100の場合
    if (total === 100) {
      // おみくじボタンを押せるようになる
      omikuji.disabled = false;
      errorText.innerHTML = "";
    } else {
      omikuji.disabled = true;
      errorText.innerHTML = "<span style='color: red;'>エラー</span>";
    }

  } else {
    omikuji.disabled = true;
    errorText.innerHTML = "<span style='color: red;'>エラー</span>";
  }

}, false);

/*----------------入力チェックここまで---------------*/

/* --------------おみくじボタンをおしたら---------- */

omikuji.addEventListener('click', () => {

  // 入力した数字の配列を2つ目まで切りとり、合計する　=> 結果を出す時に使う
  // 中吉
  pro1 = pro.slice(0, 2).reduce((a, b) => {
    return a + b;
  });
  // 小吉
  pro2 = pro.slice(0, 3).reduce((a, b) => {
    return a + b;
  });
  // 吉
  pro3 = pro.slice(0, 4).reduce((a, b) => {
    return a + b;
  });
  // 末吉
  pro4 = pro.slice(0, 5).reduce((a, b) => {
    return a + b;
  });
  // 凶
  pro5 = pro.slice(0, 6).reduce((a, b) => {
    return a + b;
  });

  

  // 引いた数字の範囲が～～なら
  for (let i = 0; i < 100000; i++) {
    let intRandoms = () => {
      return Math.floor(Math.random() * 101);
    }
    let n = intRandoms();

    if (n <= pro[0]) { //0-13
      count_dk++;
    } else if (n <= pro1 && n > pro[0]) { //20% 14-33
      count_ck++;
    } else if (n <= pro2 && n > pro1) {//20% 34-53
      count_shk++;
    } else if (n <= pro3 && n > pro2) { //20% 54-73
      count_k++;
    } else if (n <= pro4 && n > pro3) { //20% 74-94
      count_suk++;
    } else if (n <= pro5 && n > pro4) { //10% 94-99
      count_kyo++;
    } else if (n > pro5) { //99-100
      count_dkyo++;
    }
  }

  // 結果をカウントした配列
  const counts = [count_dk, count_ck, count_shk, count_k, count_suk, count_kyo, count_dkyo];
  console.log(`各カウントの配列${counts}`);

  // 確率の計算した数を入れる配列
  let pronumbers = [];

  // 結果の回数 / クリックした（引いた）回数 * 100を配列に代入
  for (var i = 0; i < counts.length; i++) {
    pronumbers.push((counts[i] / 100000 * 100).toFixed(2));
    let t = $('#resultTable tbody tr').eq(i).children('td').eq(1);
    t.html(pronumbers[i] + '%');
  }

}, false);