'use strict'

const todos = [];

// タスク追加に関するidの代入
const inputTodo = document.getElementById('input-todo');
const addBtn = document.getElementById('add-btn');

// todoリストに関するidの代入
const id = document.getElementById('id');
const text = document.getElementById('text');
const state = document.getElementById('state')
const del = document.getElementById('del');

// ラジオボタンに関するidの代入
const allStateRadioBtn = document.getElementById('all-state-radio-btn');
const workRadioBtn = document.getElementById('work-radio-btn');
const compRadioBtn = document.getElementById('comp-radio-btn');

// addBtnのclickイベント
addBtn.addEventListener('click', event => {
     const todoComment = inputTodo.value; 
     inputTodo.value = ''; //inputTodoを空にする

     // 作業中/完了ボタン作成, clickイベント→作業中/完了ボタンの切り替え
     const workBtn = document.createElement('button');
     workBtn.textContent = '作業中';
     workBtn.addEventListener('click', (event) => {
               if(workBtn.textContent === '作業中') {
                    workBtn.textContent = '完了';
               } else {
                    workBtn.textContent = '作業中';
               }
          })

     // 連想配列作成
     const todo = new Object();
      todo.value = todoComment;
      todo.state = workBtn;

     if (todo.value && todo.value.match(/\S/g)) { //空のまま追加されないように条件分岐
          todos.push(todo); //todoをtodos[]に追加
          showTodo();
     }
});

// todoリストを表示する関数
const showTodo = () => {
     // 各要素の中身を一度リセット（毎回追加されてしまうため）
     while(id.firstChild, text.firstChild, state.firstChild, del.firstChild) {
          id.removeChild(id.firstChild);
          text.removeChild(text.firstChild);
          state.removeChild(state.firstChild);
          del.removeChild(del.firstChild);
     }

     todos.map((todo, index) => {
          // div'id', div'text'に追加するpを作成
          const idNum = document.createElement('p');
          const comment = document.createElement('p');
          idNum.textContent = index + 1; //htmlに表示するidナンバー
          comment.textContent = todo.value; //htmlに表示するコメント
          const switchBtn = todo.state; //obj'todo'のstateの値を代入

          // 削除ボタン作成
          const delBtn = document.createElement('button');
          delBtn.textContent = '削除';

          // 削除ボタンのclickイベント
          delBtn.addEventListener('click', (event) =>{
               delTodo(index); //引数'index'で、idNumとcommentを紐付け
          })

          // 作成した要素をhtmlに表示
          id.appendChild(idNum);
          text.appendChild(comment);
          state.appendChild(switchBtn);
          del.appendChild(delBtn);

          // / 作業中ラジオボタンの関数
          // ボタンの文字に関わらずすべて表示
          const allDisplay = () => {
                   idNum.style.display = 'block';
                   comment.style.display = 'block';
                   switchBtn.style.display = 'block';
                   delBtn.style.display = 'block';
          }
          allStateRadioBtn.addEventListener('click', (event) => {
               allDisplay();
          })

          // 作業中ラジオボタンの関数
          // ボタンの文字が「作業中」ではないなら非表示
          const workDisplay = () => {
               if (switchBtn.textContent !== '作業中') {
                   idNum.style.display = 'none';
                   comment.style.display = 'none';
                   switchBtn.style.display = 'none';
                   delBtn.style.display = 'none';
               }else {
                   idNum.style.display = 'block';
                   comment.style.display = 'block';
                   switchBtn.style.display = 'block';
                   delBtn.style.display = 'block';
               }
          }
          // 作業中ラジオボタンのclickイベント
          workRadioBtn.addEventListener('click', (event) =>{
               workDisplay();
          })

          // 完了ラジオボタンの関数
          // ボタンの文字が「完了」ではないなら非表示
          const compDisplay = () => {
               if (switchBtn.textContent !== '完了') {
                   idNum.style.display = 'none';
                   comment.style.display = 'none';
                   switchBtn.style.display = 'none';
                   delBtn.style.display = 'none';
               }else {
                    idNum.style.display = 'block';
                    comment.style.display = 'block';
                    switchBtn.style.display = 'block';
                    delBtn.style.display = 'block';
                }
          }

          // / 完了ラジオボタンのclickイベント
          compRadioBtn.addEventListener('click', (event) =>{
               compDisplay();
          })
     });
};
// 削除ボタンの関数
const delTodo = index => {
     todos.splice(index, 1);
     showTodo(); 
}

